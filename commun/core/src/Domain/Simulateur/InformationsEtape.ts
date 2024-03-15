import { PredicatDonneesSimulateurDefinitions } from "anssi-nis2-ui/src/Services/Simulateur/PredicatDonneesSimulateur.definitions";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.definitions";
import { P } from "ts-pattern";
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
  "localisationActiviteSpecifique",
  "localisationFournitureServicesNumeriques",
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

export type EtapePrealable = EtapeExistante;

export type EtapeResultat = EtapeExistante;

export type OptionsInformationEtapeForm = {
  readonly sousEtapeConditionnelle?: SousEtapeConditionnelle;
  readonly ignoreSi: (
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) => boolean;
};

export type SousEtapeConditionnelle = {
  readonly condition: PredicatDonneesSimulateurDefinitions;
  readonly sousEtape: InformationEtapeForm;
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

export type VariantesEtape<TypeEtape extends InformationEtapeForm> = {
  conditions: P.Pattern<DonneesFormulaireSimulateur>;
  etape: TypeEtape;
};

export type InformationsEtapesVariantes<
  TypeEtape extends InformationEtapeForm,
> = EtapeExistante &
  CapacitesEtapeFormulaire & {
    readonly variantes: TypeEtape[];
  };
