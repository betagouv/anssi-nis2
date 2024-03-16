import {
  estNonVide,
  et,
} from "../../../../../commun/utils/services/commun.predicats.ts";
import { CollectionInformationsEtapes } from "../../../../../commun/core/src/Domain/Simulateur/CollectionInformationsEtapes.definitions.ts";
import { DonneesFormulaireSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { fabriqueEtatEtape } from "../../../../../commun/core/src/Domain/Simulateur/fabriques/EtatEtape.fabrique.ts";
import { fabriquesInformationsEtapes } from "../../../../../commun/core/src/Domain/Simulateur/fabriques/InformationsEtape.fabrique.ts";
import {
  contientSousSecteurAutresUniquement,
  ou,
} from "../../../../../commun/core/src/Domain/Simulateur/services/ChampSimulateur/champs.predicats.ts";
import {
  fabriqueValidationUneReponses,
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationReponsesTypeStructure,
} from "../../../../../commun/core/src/Domain/Simulateur/services/ChampSimulateur/ValidationReponses.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import {
  contientAutreSecteurActiviteUniquement,
  predicatDonneesFormulaire as P,
} from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats.ts";

const contientDesSecteursAvecSousSecteurs = ({
  secteurActivite,
}: DonneesFormulaireSimulateur) =>
  secteurActivite.some(estUnSecteurAvecDesSousSecteurs);

const sousEtapeSousSecteur =
  fabriquesInformationsEtapes.sousEtapeConditionnelle(
    contientDesSecteursAvecSousSecteurs,
    fabriquesInformationsEtapes.form(
      "Sous-secteur d'activité",
      validationReponsesSousActivites,
      "sousSecteursActivite",
    ),
  );

const sousEtapeLocalisationService =
  fabriquesInformationsEtapes.sousEtapeConditionnelle(
    et(
      P.secteurActivite.contient("infrastructureNumerique"),
      ou(
        P.activites.contientUnParmi(
          "fournisseurReseauxCommunicationElectroniquesPublics",
          "fournisseurServiceCommunicationElectroniquesPublics",
        ),
      ),
    ),
    fabriquesInformationsEtapes.form(
      "Localisation de votre activité",
      {
        message: "Sélectionnez au moins une réponse",
        validateur:
          P.localisationFournitureServicesNumeriques.satisfait(estNonVide),
      },
      "localisationFournitureServicesNumeriques",
    ),
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
          contientSousSecteurAutresUniquement,
        ),
        sousEtapeConditionnelle: sousEtapeLocalisationService,
      },
    ),
    fabriquesInformationsEtapes.resultat("Resultat"),
  );
export const etatEtapesInitial = fabriqueEtatEtape(etapesQuestionnaire, 0);
