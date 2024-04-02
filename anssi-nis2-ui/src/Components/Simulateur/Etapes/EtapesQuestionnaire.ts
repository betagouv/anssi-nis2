import { Pattern } from "ts-pattern";
import { CollectionInformationsEtapes } from "../../../../../commun/core/src/Domain/Simulateur/CollectionInformationsEtapes.definitions.ts";
import { fabriqueEtatEtape } from "../../../../../commun/core/src/Domain/Simulateur/EtatEtape.fabrique.ts";
import { fabriquesInformationsEtapes } from "../../../../../commun/core/src/Domain/Simulateur/InformationsEtape.fabrique.ts";
import { contientSousSecteurAutresUniquement } from "../../../../../commun/core/src/Domain/Simulateur/services/ChampSimulateur/champs.predicats.ts";
import {
  fabriqueValidationUneReponses,
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationReponsesTypeStructure,
} from "../../../../../commun/core/src/Domain/Simulateur/services/ChampSimulateur/ValidationReponses.ts";
import { DonneesFormulaireSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import {
  contientAutreSecteurActiviteUniquement,
  contientInfraNumLocalisationEtablissement,
  predicatDonneesFormulaire as P,
} from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import {
  estNonVide,
  et,
  ou,
} from "../../../../../commun/utils/services/commun.predicats.ts";

const contientDesSecteursAvecSousSecteurs = ({
  secteurActivite,
}: DonneesFormulaireSimulateur) =>
  secteurActivite.some(estUnSecteurAvecDesSousSecteurs);
const contientUniquementDesSecteursAvecSousSecteurs = ({
  secteurActivite,
}: DonneesFormulaireSimulateur) =>
  secteurActivite.every(estUnSecteurAvecDesSousSecteurs);

const sousEtapeSousSecteur =
  fabriquesInformationsEtapes.sousEtapeConditionnelle(
    contientDesSecteursAvecSousSecteurs,
    fabriquesInformationsEtapes.form(
      "Sous-secteur d'activité",
      validationReponsesSousActivites,
      "sousSecteursActivite",
    ),
  );

const etapeLocalisationActiviteServices = fabriquesInformationsEtapes.form(
  "Localisation de votre activité",
  {
    message: "Sélectionnez au moins une réponse",
    validateur:
      P.localisationFournitureServicesNumeriques.satisfait(estNonVide),
  },
  "localisationFournitureServicesNumeriques",
);
const etapeLocalisationEtablissementPrincipal =
  fabriquesInformationsEtapes.form(
    "Localisation de votre activité",
    {
      message: "Sélectionnez au moins une réponse",
      validateur: ou(
        P.paysDecisionsCyber.contientUnParmi("france", "autre"),
        et(
          P.paysDecisionsCyber.est(["horsue"]),
          P.paysOperationsCyber.contientUnParmi("france", "autre"),
        ),
        et(
          P.paysDecisionsCyber.est(["horsue"]),
          P.paysOperationsCyber.est(["horsue"]),
          P.paysPlusGrandNombreSalaries.satisfait(estNonVide),
        ),
      ),
    },
    "localisationEtablissementPrincipal",
  );

const sousEtapeLocalisationVariantes =
  fabriquesInformationsEtapes.sousEtapeConditionnelle(
    contientInfraNumLocalisationEtablissement,
    fabriquesInformationsEtapes.variantes([
      {
        etape: etapeLocalisationEtablissementPrincipal,
        conditions: Pattern.when(
          P.activites.contientUnParmi(
            "registresNomsDomainesPremierNiveau",
            "fournisseurServicesDNS",
            "fournisseurServicesInformatiqueNuage",
            "fournisseurServiceCentresDonnees",
            "fournisseurReseauxDiffusionContenu",
          ),
        ),
      },
      {
        etape: etapeLocalisationEtablissementPrincipal,
        conditions: Pattern.when(
          P.secteurActivite.contientUnParmi(
            "gestionServicesTic",
            "fournisseursNumeriques",
          ),
        ),
      },
      {
        etape: etapeLocalisationActiviteServices,
        conditions: Pattern.when(
          P.activites.contientUnParmi(
            "fournisseurReseauxCommunicationElectroniquesPublics",
            "fournisseurServiceCommunicationElectroniquesPublics",
          ),
        ),
      },
    ]),
  );

const etapeTailleStructurePrivee = fabriquesInformationsEtapes.form(
  "Taille de l'organisation",
  validationReponsesTaille,
  "tailleEntitePrivee",
);
const etapeTailleStructurePublique = fabriquesInformationsEtapes.form(
  "Taille de l'organisation",
  fabriqueValidationUneReponses("trancheNombreEmployes"),
  "tailleEntitePublique",
);
const etapeSecteurActivite = fabriquesInformationsEtapes.form(
  "Secteurs d'activité",
  validationReponsesSecteurs,
  "secteursActivite",
  {
    sousEtapeConditionnelle: sousEtapeSousSecteur,
  },
);
export const etapesQuestionnaire: CollectionInformationsEtapes =
  new CollectionInformationsEtapes(
    fabriquesInformationsEtapes.prealable("Pour bien débuter"),
    fabriquesInformationsEtapes.form(
      "Désignation éventuelle",
      fabriqueValidationUneReponses("designationOperateurServicesEssentiels"),
      "designationOperateurServicesEssentiels",
    ),
    fabriquesInformationsEtapes.form(
      "Localisation de l'activité",
      fabriqueValidationUneReponses("appartenancePaysUnionEuropeenne"),
      "appartenanceUnionEuropeenne",
    ),
    fabriquesInformationsEtapes.form(
      "Type de structure",
      validationReponsesTypeStructure,
      "typeStructure",
    ),
    fabriquesInformationsEtapes.variantes([
      {
        etape: etapeTailleStructurePrivee,
        conditions: { typeStructure: ["privee"] },
      },
      {
        etape: etapeTailleStructurePublique,
        conditions: { typeStructure: ["publique"] },
      },
    ]),
    etapeSecteurActivite,

    fabriquesInformationsEtapes.form(
      "Activités pratiquées",
      validationReponsesActivites,
      "activites",
      {
        ignoreSi: ou(
          contientAutreSecteurActiviteUniquement,
          et(
            contientUniquementDesSecteursAvecSousSecteurs,
            contientSousSecteurAutresUniquement,
          ),
        ),
        sousEtapeConditionnelle: sousEtapeLocalisationVariantes,
      },
    ),
    fabriquesInformationsEtapes.resultat("Resultat"),
  );

export const etatEtapesInitial = fabriqueEtatEtape(etapesQuestionnaire, 0);
