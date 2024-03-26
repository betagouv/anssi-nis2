import { types } from "sass";
import { match, P } from "ts-pattern";
import { UnionDe } from "../../../../utils/types/UnionDe";
import { PredicatDonneesSimulateurDefinitions } from "./PredicatDonneesSimulateur.definitions";
import { ValidationReponses } from "./services/ChampSimulateur/champs.domaine";
import { DonneesFormulaireSimulateur } from "./services/DonneesFormulaire/DonneesFormulaire.definitions";
import {
  estEntitePrivee,
  predicatDonneesFormulaire,
} from "./services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  estSecteurAutre,
  estUnSecteurAvecDesSousSecteurs,
} from "./services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurAutre } from "./services/SousSecteurActivite/SousSecteurActivite.predicats";
import Error = types.Error;

const typeEtapeQuestion = [
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
] as const;

const typeEtape = [...typeEtapeQuestion, "inexistante", "variante"] as const;

export type TypeEtape = UnionDe<typeof typeEtape>;
const typeEtapeQuestionExhaustif = [
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
] as const;

type TypeEtapeExhaustif = UnionDe<typeof typeEtapeQuestionExhaustif>;

export const etapeSuivantePour: Record<
  TypeEtapeExhaustif,
  (d: DonneesFormulaireSimulateur) => TypeEtapeExhaustif
> = {
  prealable: (): TypeEtapeExhaustif => "designationOperateurServicesEssentiels",
  designationOperateurServicesEssentiels: (): TypeEtapeExhaustif =>
    "appartenanceUnionEuropeenne",
  appartenanceUnionEuropeenne: (): TypeEtapeExhaustif => "typeStructure",
  typeStructure: (d: DonneesFormulaireSimulateur): TypeEtapeExhaustif =>
    estEntitePrivee(d) ? "tailleEntitePrivee" : "tailleEntitePublique",

  tailleEntitePublique: (): TypeEtapeExhaustif => {
    throw new Error("Function not implemented.");
  },

  tailleEntitePrivee: (): TypeEtapeExhaustif => "secteursActivite",

  secteursActivite: (d: DonneesFormulaireSimulateur) =>
    d.secteurActivite.every(estSecteurAutre)
      ? "resultat"
      : d.secteurActivite.some(estUnSecteurAvecDesSousSecteurs)
        ? "sousSecteursActivite"
        : "activites",
  sousSecteursActivite: (d: DonneesFormulaireSimulateur) =>
    d.secteurActivite.every(estSecteurAutre) &&
    d.sousSecteurActivite.every(estSousSecteurAutre)
      ? "resultat"
      : "activites",
  activites: (d: DonneesFormulaireSimulateur): TypeEtapeExhaustif =>
    match(d)
      .when(
        predicatDonneesFormulaire.secteurActivite.contientUnParmi(
          "gestionServicesTic",
          "fournisseursNumeriques",
        ),
        (): TypeEtapeExhaustif => "localisationEtablissementPrincipal",
      )
      .when(
        predicatDonneesFormulaire.activites.contientUnParmi(
          "registresNomsDomainesPremierNiveau",
          "fournisseurServicesDNS",
          "fournisseurServicesInformatiqueNuage",
          "fournisseurServiceCentresDonnees",
          "fournisseurReseauxDiffusionContenu",
        ),
        (): TypeEtapeExhaustif => "localisationEtablissementPrincipal",
      )
      .when(
        predicatDonneesFormulaire.activites.contientUnParmi(
          "fournisseurReseauxCommunicationElectroniquesPublics",
          "fournisseurServiceCommunicationElectroniquesPublics",
        ),
        (): TypeEtapeExhaustif => "localisationFournitureServicesNumeriques",
      )
      .otherwise(() => "resultat"),
  localisationEtablissementPrincipal: (
    d: DonneesFormulaireSimulateur,
  ): TypeEtapeExhaustif =>
    match(d)
      .when(
        predicatDonneesFormulaire.activites.contientUnParmi(
          "fournisseurReseauxCommunicationElectroniquesPublics",
          "fournisseurServiceCommunicationElectroniquesPublics",
        ),
        (): TypeEtapeExhaustif => "localisationFournitureServicesNumeriques",
      )
      .otherwise(() => "resultat"),
  localisationFournitureServicesNumeriques: (
    d: DonneesFormulaireSimulateur,
  ): TypeEtapeExhaustif =>
    match(d)
      .when(
        predicatDonneesFormulaire.secteurActivite.contientUnParmi(
          "gestionServicesTic",
          "fournisseursNumeriques",
        ),
        (): TypeEtapeExhaustif => "localisationEtablissementPrincipal",
      )
      .when(
        predicatDonneesFormulaire.activites.contientUnParmi(
          "registresNomsDomainesPremierNiveau",
          "fournisseurServicesDNS",
          "fournisseurServicesInformatiqueNuage",
          "fournisseurServiceCentresDonnees",
          "fournisseurReseauxDiffusionContenu",
        ),
        (): TypeEtapeExhaustif => "localisationEtablissementPrincipal",
      )
      .otherwise(() => "resultat"),
  resultat: (): TypeEtapeExhaustif => "resultat",
};

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
