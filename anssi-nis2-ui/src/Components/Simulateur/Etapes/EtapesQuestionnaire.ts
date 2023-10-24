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
} from "../../../Services/Simulateur/InformationsEtape.ts";
import { EtatEtapes } from "../../../Services/Simulateur/EtatEtapes.ts";
import {
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationUneReponses,
} from "../../../Domaine/Simulateur/Services/Validateurs.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../Domaine/Simulateur/Operations/operationsSecteurs.ts";

const sousEtapeSousSecteur = new SousEtapeConditionnelle(
  ({ secteurActivite }) =>
    secteurActivite.some(estUnSecteurAvecDesSousSecteurs),
  new InformationEtapeForm(
    "Sous-secteur d'activité",
    validationReponsesSousActivites,
    EtapeSousSecteursActivite,
  ),
);
export const etapesQuestionnaire: CollectionInformationsEtapes =
  new CollectionInformationsEtapes(
    new EtapePrealable("Pour bien débuter"),
    new InformationEtapeForm(
      "Désignation éventuelle",
      validationUneReponses("designeOperateurServicesEssentiels"),
      EtapeOSE,
    ),
    new InformationEtapeForm(
      "Localisation de l’activité",
      validationUneReponses("etatMembre"),
      EtapeLocalisation,
    ),
    new InformationEtapeForm(
      "Type de structure",
      validationUneReponses("typeStructure"),
      EtapeTypeStructure,
    ),
    new InformationEtapeForm(
      "Taille de l’organisation",
      validationReponsesTaille,
      EtapeTaille,
    ),
    new InformationEtapeForm(
      "Secteurs d’activité",
      validationReponsesSecteurs,
      EtapeSecteursActivite,
      {
        sousEtapeConditionnelle: sousEtapeSousSecteur,
      },
    ),
    new InformationEtapeForm(
      "Activités pratiquées",
      validationReponsesActivites,
      EtapeActivites,
    ),
    new InformationEtapeResult("Resultat"),
  );
export const etatEtapesInitial = new EtatEtapes(etapesQuestionnaire, 0);
