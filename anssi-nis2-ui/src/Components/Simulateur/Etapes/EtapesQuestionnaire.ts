import { CollectionInformationsEtapes } from "../../../Domaine/Simulateur/CollectionInformationsEtapes.ts";
import {
  contientSousSecteurAutresUniquement,
  ou,
} from "../../../Domaine/Simulateur/services/ChampSimulateur/champs.predicats.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { fabriqueEtatEtape } from "../../../Domaine/Simulateur/fabriques/EtatEtape.fabrique.ts";
import { fabriquesInformationsEtapes } from "../../../Domaine/Simulateur/fabriques/InformationsEtape.fabrique.ts";
import {
  fabriqueValidationUneReponses,
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationReponsesTypeStructure,
} from "../../../Domaine/Simulateur/services/ChampSimulateur/ValidationReponses.ts";
import {
  contientAutreSecteurActiviteUniquement,
  estUnSecteurAvecDesSousSecteurs,
} from "../../../Domaine/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";

const contientDesSecteursAvecSousSecteurs = ({
  secteurActivite,
}: IDonneesBrutesFormulaireSimulateur) => secteurActivite.some(estUnSecteurAvecDesSousSecteurs);

const sousEtapeSousSecteur =
  fabriquesInformationsEtapes.sousEtapeConditionnelle(
    contientDesSecteursAvecSousSecteurs,
    fabriquesInformationsEtapes.form(
      "Sous-secteur d'activité",
      validationReponsesSousActivites,
      "sousSecteursActivite",
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
      fabriqueValidationUneReponses("designeOperateurServicesEssentiels"),
      "designeOperateurServicesEssentiels",
    ),
    fabriquesInformationsEtapes.form(
      "Localisation de l’activité",
      fabriqueValidationUneReponses("etatMembre"),
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
      },
    ),
    fabriquesInformationsEtapes.resultat("Resultat"),
  );
export const etatEtapesInitial = fabriqueEtatEtape(etapesQuestionnaire, 0);
