import { PredicatDonneesSimulateurDefinitions } from "./PredicatDonneesSimulateur.definitions";
import { DonneesFormulaireSimulateur } from "./services/DonneesFormulaire/DonneesFormulaire.definitions";
import { ValidationReponses } from "./services/ChampSimulateur/champs.domaine";

const typeEtapes = [
  "designationOperateurServicesEssentiels",
  "appartenanceUnionEuropeenne",
  "typeStructure",
  "tailleEntitePublique",
  "tailleEntitePrivee",
  "secteursActivite",
  "sousSecteursActivite",
  "activites",
  "localisationFournitureServicesNumeriques",
  "localisationEtablissementPrincipal",
  "prealable",
  "resultat",
  "inexistante",
  "variante",
] as const;
export type TypeEtape = (typeof typeEtapes)[number];

export type InformationsEtape = {
  readonly longueurComptabilisee: 0 | 1;
  readonly existe: boolean;
  readonly titre: string;
  readonly type: TypeEtape;
};

export type CapaciteEtape = {
  readonly remplitContitionSousEtape: PredicatDonneesSimulateurDefinitions;
  readonly validationReponses: ValidationReponses;
  readonly estIgnoree: (donnees: DonneesFormulaireSimulateur) => boolean;
  readonly varianteAffichee: (donnees: DonneesFormulaireSimulateur) => number;
};

export type EtapeExistante = InformationsEtape & CapaciteEtape;


export type OptionsInformationEtapeForm = {
  readonly sousEtapeConditionnelle?: SousEtapeConditionnelle;
  readonly ignoreSi: (
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) => boolean;
};

export type SousEtapeConditionnelle = {
  readonly condition: PredicatDonneesSimulateurDefinitions;
  readonly sousEtape:
    | InformationEtapeForm
    | InformationsEtapesVariantes<InformationEtapeForm>;
};

export type CapacitesEtapeFormulaire = {
  readonly fabriqueValidationReponses: (
    donnees: DonneesFormulaireSimulateur,
  ) => ValidationReponses;
};
export type InformationEtapeForm = EtapeExistante &
  CapacitesEtapeFormulaire & {
    readonly options: OptionsInformationEtapeForm;
  };

export type InformationsEtapesVariantes<
  TypeEtape extends InformationEtapeForm,
> = EtapeExistante &
  CapacitesEtapeFormulaire & {
    readonly variantes: TypeEtape[];
  };
