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
} from "../../../Services/Simulateur/InformationsEtape.ts";
import { PredicatDonneesSimulateur } from "../../../Services/Simulateur/PredicatDonneesSimulateur.ts";
import { SimulateurEtapeNodeComponent } from "../../../Services/Simulateur/Props/component";
import { ValidationReponses } from "../services/ChampSimulateur/champs.domaine.ts";
import { elementVide } from "../../../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import { SimulateurEtapeForm } from "../../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { IDonneesBrutesFormulaireSimulateur } from "../DonneesFormulaire.ts";
import { SimulateurEtapePrealable } from "../../../Components/Simulateur/SimulateurEtapePrealable.tsx";
import { SimulateurEtapeResult } from "../../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { validationToutesLesReponses } from "../services/ChampSimulateur/ValidationReponses.ts";
import { match } from "ts-pattern";

export const toujoursFaux = () => false;
export const toujoursVrai = () => true;

const fabriqueInformationsEtapeResultat: (titre: string) => EtapeResultat = (
  titre,
) => ({
  titre: titre,
  longueurComptabilisee: 0,
  existe: true,
  conteneurElementRendu: SimulateurEtapeResult,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursFaux,
  validationReponses: validationToutesLesReponses,
});

const fabriqueInformationsEtapeForm = (
  titre: string,
  validationReponses: ValidationReponses,
  composant: SimulateurEtapeNodeComponent,
  options: Partial<OptionsInformationEtapeForm> = optionsInformationEtapeFormParDefaut,
): InformationEtapeForm => {
  const optionsCompletes = {
    ...optionsInformationEtapeFormParDefaut,
    ...options,
  };
  return {
    titre: titre,
    validationReponses: validationReponses,
    composant: composant,
    options: optionsCompletes,
    longueurComptabilisee: 1,
    existe: true,
    conteneurElementRendu: SimulateurEtapeForm,
    remplitContitionSousEtape: (donnees: IDonneesBrutesFormulaireSimulateur) =>
      options.sousEtapeConditionnelle?.condition(donnees) || false,
    estIgnoree: optionsCompletes.ignoreSi,
  };
};

const fabriqueInformationEtapePrealable: (titre: string) => EtapePrealable = (
  titre: string,
) => ({
  existe: true,
  longueurComptabilisee: 0,
  conteneurElementRendu: SimulateurEtapePrealable,
  titre: titre,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursFaux,
  validationReponses: validationToutesLesReponses,
});

const fabriqueFonctionEtapeAffichee =
  <TypeEtape extends InformationEtapeForm>(
    variantesEtapes: VariantesEtape<TypeEtape>[],
  ) =>
  (donnees: IDonneesBrutesFormulaireSimulateur) =>
    variantesEtapes
      .reduce(
        (acc, variante, indice) => acc.with(variante.conditions, () => indice),
        match<IDonneesBrutesFormulaireSimulateur, number>(donnees),
      )
      .otherwise(() => 0);

const fabriqueInformationsEtapesVariantes = <
  TypeEtape extends InformationEtapeForm,
>(
  variantesEtapes: VariantesEtape<TypeEtape>[],
): InformationsEtapesVariantes<TypeEtape> => ({
  variantes: variantesEtapes.map((variante) => variante.etape),
  etapeAffichee: fabriqueFonctionEtapeAffichee(variantesEtapes),
  longueurComptabilisee: 1,
  existe: true,
  titre: variantesEtapes[0]?.etape.titre,
  estIgnoree: toujoursFaux,
  conteneurElementRendu: SimulateurEtapeForm,
  remplitContitionSousEtape: toujoursFaux,
  validationReponses: variantesEtapes[0]?.etape.validationReponses,
});

const fabriqueSousEtapeConditionnelle: (
  condition: PredicatDonneesSimulateur,
  sousEtape: InformationEtapeForm,
) => SousEtapeConditionnelle = (condition, sousEtape) => ({
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

export const EtapeInexistante: InformationsEtape & CapaciteEtape = {
  longueurComptabilisee: 0,
  existe: false,
  titre: "Hors de portee",
  conteneurElementRendu: elementVide,
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursVrai,
  validationReponses: validationToutesLesReponses,
} as const;

export const optionsInformationEtapeFormParDefaut: OptionsInformationEtapeForm =
  {
    ignoreSi: toujoursFaux,
    sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle(
      toujoursFaux,
      EtapeInexistante as InformationEtapeForm,
    ),
  } as const;
