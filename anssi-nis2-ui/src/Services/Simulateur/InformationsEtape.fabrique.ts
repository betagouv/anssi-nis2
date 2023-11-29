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
} from "anssi-nis2-domain/src/Simulateur/InformationsEtape";
import { PredicatDonneesSimulateur } from "anssi-nis2-domain/src/Simulateur/PredicatDonneesSimulateur";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "./Props/component";
import { ValidationReponses } from "anssi-nis2-domain/src/Simulateur/services/ChampsSimulateur/champs.domaine";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { validationToutesLesReponses } from "anssi-nis2-domain/src/Simulateur/services/ChampsSimulateur/ValidationReponses";
import { match } from "ts-pattern";

// TODO : Enlever ces dépendances au Front
import { elementVide } from "../Echaffaudages/AssistantsEchaffaudages.tsx";
import { SimulateurEtapeForm } from "../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { SimulateurEtapePrealable } from "../../Components/Simulateur/SimulateurEtapePrealable.tsx";
import { SimulateurEtapeResult } from "../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { DefaultComponentExtensible, DefaultProps } from "../Props";

export const toujoursFaux = () => false;
export const toujoursVrai = () => true;
export const toujourNegatif = () => -1;

const fabriqueInformationsEtapeResultat: (
  titre: string,
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
    OptionsInformationEtapeForm<
      SimulateurEtapeRenderedComponent,
      SimulateurEtapeNodeComponent
    >
  > = optionsInformationEtapeFormParDefaut,
): InformationEtapeForm<
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeNodeComponent
> => {
  const optionsCompletes = {
    ...optionsInformationEtapeFormParDefaut,
    ...options,
  };
  return {
    titre: titre,
    validationReponses: validationReponses,
    composant: composant,
    fabriqueComposant: <T extends DefaultComponentExtensible<DefaultProps>>() =>
      composant as T,
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
  titre: string,
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
  <
    TypeEtape extends InformationEtapeForm<
      SimulateurEtapeRenderedComponent,
      SimulateurEtapeNodeComponent
    >,
  >(
    variantesEtapes: VariantesEtape<
      SimulateurEtapeRenderedComponent,
      SimulateurEtapeNodeComponent,
      TypeEtape
    >[],
  ) =>
  (donnees: IDonneesBrutesFormulaireSimulateur) =>
    variantesEtapes
      .reduce(
        (acc, variante, indice) => acc.with(variante.conditions, () => indice),
        match<IDonneesBrutesFormulaireSimulateur, number>(donnees),
      )
      .otherwise(() => 0);

const fabriqueInformationsEtapesVariantes = <
  TypeEtape extends InformationEtapeForm<
    SimulateurEtapeRenderedComponent,
    SimulateurEtapeNodeComponent
  >,
>(
  variantesEtapes: VariantesEtape<
    SimulateurEtapeRenderedComponent,
    SimulateurEtapeNodeComponent,
    TypeEtape
  >[],
): InformationsEtapesVariantes<
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeNodeComponent,
  TypeEtape
> => {
  const variantes = variantesEtapes.map((variante) => variante.etape);
  const varianteAffichee = fabriqueFonctionEtapeAffichee(variantesEtapes);
  return {
    variantes: variantes,
    varianteAffichee: varianteAffichee,
    longueurComptabilisee: 1,
    fabriqueComposant: <T extends DefaultComponentExtensible<DefaultProps>>(
      donnees: IDonneesBrutesFormulaireSimulateur,
    ) => variantes[varianteAffichee(donnees)].composant as T,
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
  sousEtape: InformationEtapeForm<
    SimulateurEtapeRenderedComponent,
    SimulateurEtapeNodeComponent
  >,
) => SousEtapeConditionnelle<
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeNodeComponent
> = (condition, sousEtape) => ({
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

export const optionsInformationEtapeFormParDefaut: OptionsInformationEtapeForm<
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeNodeComponent
> = {
  ignoreSi: toujoursFaux,
  sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle(
    toujoursFaux,
    EtapeInexistante as InformationEtapeForm<
      SimulateurEtapeRenderedComponent,
      SimulateurEtapeNodeComponent
    >,
  ),
} as const;
