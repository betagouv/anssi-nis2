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
  fabriqueSousEtapeConditionnelle,
  InformationEtapeForm,
  InformationEtapeResultat,
} from "../../../Services/Simulateur/InformationsEtape.ts";
import {
  validateurSecteurAutreUniquement,
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationUneReponses,
} from "../../../Domaine/Simulateur/services/Validateurs.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../Domaine/Simulateur/operations/operationsSecteurs.ts";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { fabriqueEtatEtape } from "../../../Domaine/Simulateur/fabriques/fabriqueEtatEtape.ts";

const contientDesSecteursAvecSousSecteurs = ({
  secteurActivite,
}: DonneesFormulaireSimulateur) => {
  return secteurActivite.some(estUnSecteurAvecDesSousSecteurs);
};

const sousEtapeSousSecteur = fabriqueSousEtapeConditionnelle(
  contientDesSecteursAvecSousSecteurs,
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
      {
        ignoreSi: validateurSecteurAutreUniquement,
      },
    ),
    new InformationEtapeResultat("Resultat"),
  );
export const etatEtapesInitial = fabriqueEtatEtape(etapesQuestionnaire, 0);
