import { CollectionInformationsEtapes } from "../../../../../commun/core/src/Domain/Simulateur/CollectionInformationsEtapes.ts";
import { DonneesFormulaireSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.definitions.ts";
import { fabriqueEtatEtape } from "../../../../../commun/core/src/Domain/Simulateur/fabriques/EtatEtape.fabrique.ts";
import { fabriquesInformationsEtapes } from "../../../../../commun/core/src/Domain/Simulateur/fabriques/InformationsEtape.fabrique.ts";
import {
  contientSousSecteurAutresUniquement,
  ou,
} from "../../../../../commun/core/src/Domain/Simulateur/services/ChampSimulateur/champs.predicats.ts";
import {
  fabriqueValidationUneReponses,
  validationReponsesActivites,
  validationReponsesLocalisationActiviteSpecifique,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationReponsesTypeStructure,
} from "../../../../../commun/core/src/Domain/Simulateur/services/ChampSimulateur/ValidationReponses.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import { auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement } from "../../../../../commun/core/src/Domain/Simulateur/services/Activite/Activite.predicats.ts";
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

const sousEtapeLocalisationActiviteSpecifique =
  fabriquesInformationsEtapes.sousEtapeConditionnelle(
    ou(
      P.activites.satisfait(
        auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
      ),
      P.secteurActivite.contient("fournisseursNumeriques"),
      P.secteurActivite.contient("gestionServicesTic"),
    ),
    fabriquesInformationsEtapes.form(
      "Localisation de votre activité",
      validationReponsesLocalisationActiviteSpecifique,
      "localisationActiviteSpecifique",
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
        sousEtapeConditionnelle: sousEtapeLocalisationActiviteSpecifique,
      },
    ),
    fabriquesInformationsEtapes.resultat("Resultat"),
  );
export const etatEtapesInitial = fabriqueEtatEtape(etapesQuestionnaire, 0);
