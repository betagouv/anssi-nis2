import {
  EtapeActivites,
  EtapeLocalisation,
  EtapeOSE,
  EtapeSecteursActivite,
  EtapeSousSecteursActivite,
  EtapeTaille,
  EtapeTypeStructure,
} from "./index.ts";
import { CollectionInformationsEtapes } from "../../../Services/Simulateur/CollectionInformationsEtapes.ts";
import {
  EtapePrealable,
  InformationEtapeForm,
  InformationEtapeResult,
  SousEtapeConditionnelle,
} from "../../../Services/Simulateur/informationsEtape.ts";
import { EtatEtapes } from "../../../Services/Simulateur/EtatEtapes.ts";
import {
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationUneReponses,
} from "../../../Domaine/Simulateur/Services/Validateurs.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../Domaine/Simulateur/Operations/operationsSecteurs.ts";

const etapePrealable = new EtapePrealable("Pour bien débuter");

const informationEtapeDesignationOSE = new InformationEtapeForm(
  "Désignation éventuelle",
  validationUneReponses("designeOperateurServicesEssentiels"),
  EtapeOSE,
);
const informationEtapeLocalisation = new InformationEtapeForm(
  "Localisation de l’activité",
  validationUneReponses("etatMembre"),
  EtapeLocalisation,
);
const informationEtapeTypeStructure = new InformationEtapeForm(
  "Type de structure",
  validationUneReponses("typeStructure"),
  EtapeTypeStructure,
);
const informationEtapeTaille = new InformationEtapeForm(
  "Taille de l’organisation",
  validationReponsesTaille,
  EtapeTaille,
);
const informationEtapeSousSecteurs = new InformationEtapeForm(
  "Sous-secteur d'activité",
  validationReponsesSousActivites,
  EtapeSousSecteursActivite,
);
const informationEtapeSecteurs = new InformationEtapeForm(
  "Secteurs d’activité",
  validationReponsesSecteurs,
  EtapeSecteursActivite,
  new SousEtapeConditionnelle(
    ({ secteurActivite }) =>
      secteurActivite.some(estUnSecteurAvecDesSousSecteurs),
    informationEtapeSousSecteurs,
  ),
);
const informationEtapeActivites = new InformationEtapeForm(
  "Activités pratiquées",
  validationReponsesActivites,
  EtapeActivites,
);
export const etapesQuestionnaire: CollectionInformationsEtapes =
  new CollectionInformationsEtapes(
    etapePrealable,
    informationEtapeDesignationOSE,
    informationEtapeLocalisation,
    informationEtapeTypeStructure,
    informationEtapeTaille,
    informationEtapeSecteurs,
    informationEtapeActivites,
    new InformationEtapeResult("Resultat"),
  );
export const etatEtapesInitial = new EtatEtapes(etapesQuestionnaire, 1);
