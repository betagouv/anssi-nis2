import {
  CapaciteEtape,
  EtapePrealable,
  EtapeResultat,
  InformationEtapeForm,
  InformationsEtape,
  InformationsEtapesVariantes,
  OptionsInformationEtapeForm,
  SousEtapeConditionnelle,
  VariantesEtape,
} from "anssi-nis2-domain/src/Simulateur/InformationsEtape.ts";
import { PredicatDonneesSimulateur } from "anssi-nis2-domain/src/Simulateur/PredicatDonneesSimulateur.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "anssi-nis2-ui/src/Services/Simulateur/Props/component";
import { ValidationReponses } from "../services/ChampsSimulateur/champs.domaine.ts";
import { elementVide } from "anssi-nis2-ui/src/Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import { SimulateurEtapeForm } from "anssi-nis2-ui/src/Components/Simulateur/SimulateurEtapeForm.tsx";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { SimulateurEtapePrealable } from "anssi-nis2-ui/src/Components/Simulateur/SimulateurEtapePrealable.tsx";
import { SimulateurEtapeResult } from "anssi-nis2-ui/src/Components/Simulateur/SimulateurEtapeResult.tsx";
import { validationToutesLesReponses } from "../services/ChampsSimulateur/ValidationReponses.ts";
import { match } from "ts-pattern";

export const toujoursFaux = () => false;
export const toujoursVrai = () => true;
export const toujourNegatif = () => -1;

const fabriqueInformationsEtapeResultat: (
  titre: string
) => EtapeResultat<SimulateurEtapeRenderedComponent> = (titre) => ({
  titre: titre,
  longueurComptabilisee: 0,
  existe: true,
  conteneurElementRendu: SimulateurEtapeResult,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursFaux,
  validationReponses: validationToutesLesReponses,
  varianteAffichee: toujourNegatif,
});

const fabriqueInformationsEtapeForm = (
  titre: string,
  validationReponses: ValidationReponses,
  composant: SimulateurEtapeNodeComponent,
  options: Partial<
    OptionsInformationEtapeForm<SimulateurEtapeRenderedComponent>
  > = optionsInformationEtapeFormParDefaut
): InformationEtapeForm<SimulateurEtapeRenderedComponent> => {
  const optionsCompletes = {
    ...optionsInformationEtapeFormParDefaut,
    ...options,
  };
  return {
    titre: titre,
    validationReponses: validationReponses,
    composant: composant,
    fabriqueComposant: () => composant,
    options: optionsCompletes,
    longueurComptabilisee: 1,
    existe: true,
    conteneurElementRendu: SimulateurEtapeForm,
    remplitContitionSousEtape: (donnees: IDonneesBrutesFormulaireSimulateur) =>
      options.sousEtapeConditionnelle?.condition(donnees) || false,
    estIgnoree: optionsCompletes.ignoreSi,
    varianteAffichee: toujourNegatif,
    fabriqueValidationReponses: () => validationReponses,
  };
};

const fabriqueInformationEtapePrealable: (
  titre: string
) => EtapePrealable<SimulateurEtapeRenderedComponent> = (titre: string) => ({
  existe: true,
  longueurComptabilisee: 0,
  conteneurElementRendu: SimulateurEtapePrealable,
  titre: titre,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursFaux,
  validationReponses: validationToutesLesReponses,
  varianteAffichee: toujourNegatif,
});

const fabriqueFonctionEtapeAffichee =
  <TypeEtape extends InformationEtapeForm<SimulateurEtapeRenderedComponent>>(
    variantesEtapes: VariantesEtape<
      SimulateurEtapeRenderedComponent,
      TypeEtape
    >[]
  ) =>
  (donnees: IDonneesBrutesFormulaireSimulateur) =>
    variantesEtapes
      .reduce(
        (acc, variante, indice) => acc.with(variante.conditions, () => indice),
        match<IDonneesBrutesFormulaireSimulateur, number>(donnees)
      )
      .otherwise(() => 0);

const fabriqueInformationsEtapesVariantes = <
  TypeEtape extends InformationEtapeForm<SimulateurEtapeRenderedComponent>
>(
  variantesEtapes: VariantesEtape<SimulateurEtapeRenderedComponent, TypeEtape>[]
): InformationsEtapesVariantes<SimulateurEtapeRenderedComponent, TypeEtape> => {
  const variantes = variantesEtapes.map((variante) => variante.etape);
  const varianteAffichee = fabriqueFonctionEtapeAffichee(variantesEtapes);
  return {
    variantes: variantes,
    varianteAffichee: varianteAffichee,
    longueurComptabilisee: 1,
    fabriqueComposant: (donnees: IDonneesBrutesFormulaireSimulateur) =>
      variantes[varianteAffichee(donnees)].composant,
    existe: true,
    titre: variantesEtapes[0]?.etape.titre,
    estIgnoree: toujoursFaux,
    conteneurElementRendu: SimulateurEtapeForm,
    remplitContitionSousEtape: toujoursFaux,
    validationReponses: variantesEtapes[0]?.etape.validationReponses,
    fabriqueValidationReponses: (donnees: IDonneesBrutesFormulaireSimulateur) =>
      variantes[varianteAffichee(donnees)].validationReponses,
  };
};

const fabriqueSousEtapeConditionnelle: (
  condition: PredicatDonneesSimulateur,
  sousEtape: InformationEtapeForm<SimulateurEtapeRenderedComponent>
) => SousEtapeConditionnelle<SimulateurEtapeRenderedComponent> = (
  condition,
  sousEtape
) => ({
  condition: condition,
  sousEtape: sousEtape,
});

export const fabriquesInformationsEtapes = {
  sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle,
  resultat: fabriqueInformationsEtapeResultat,
  form: fabriqueInformationsEtapeForm,
  prealable: fabriqueInformationEtapePrealable,
  variantes: fabriqueInformationsEtapesVariantes,
} as const;

export const EtapeInexistante: InformationsEtape<SimulateurEtapeRenderedComponent> &
  CapaciteEtape = {
  longueurComptabilisee: 0,
  existe: false,
  titre: "Hors de portee",
  conteneurElementRendu: elementVide,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursVrai,
  validationReponses: validationToutesLesReponses,
  varianteAffichee: toujourNegatif,
} as const;

export const optionsInformationEtapeFormParDefaut: OptionsInformationEtapeForm<SimulateurEtapeRenderedComponent> =
  {
    ignoreSi: toujoursFaux,
    sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle(
      toujoursFaux,
      EtapeInexistante as InformationEtapeForm<SimulateurEtapeRenderedComponent>
    ),
  } as const;
