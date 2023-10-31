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
  validateurSecteurAutreUniquement,
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationUneReponses,
} from "../../../Domaine/Simulateur/services/Validateurs.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../Domaine/Simulateur/operations/operationsSecteurs.ts";
import { DonneesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { fabriqueEtatEtape } from "../../../Domaine/Simulateur/fabriques/EtatEtape.fabrique.ts";
import { fabriqueInformationsEtapes } from "../../../Domaine/Simulateur/fabriques/InformationsEtape.fabrique.ts";

const contientDesSecteursAvecSousSecteurs = ({
  secteurActivite,
}: DonneesFormulaireSimulateur) => {
  return secteurActivite.some(estUnSecteurAvecDesSousSecteurs);
};

const sousEtapeSousSecteur = fabriqueInformationsEtapes.sousEtapeConditionnelle(
  contientDesSecteursAvecSousSecteurs,
  fabriqueInformationsEtapes.form(
    "Sous-secteur d'activité",
    validationReponsesSousActivites,
    EtapeSousSecteursActivite,
  ),
);
export const etapesQuestionnaire: CollectionInformationsEtapes =
  new CollectionInformationsEtapes(
    fabriqueInformationsEtapes.prealable("Pour bien débuter"),
    fabriqueInformationsEtapes.form(
      "Désignation éventuelle",
      validationUneReponses("designeOperateurServicesEssentiels"),
      EtapeOSE,
    ),
    fabriqueInformationsEtapes.form(
      "Localisation de l’activité",
      validationUneReponses("etatMembre"),
      EtapeLocalisation,
    ),
    fabriqueInformationsEtapes.form(
      "Type de structure",
      validationUneReponses("typeStructure"),
      EtapeTypeStructure,
    ),
    fabriqueInformationsEtapes.form(
      "Taille de l’organisation",
      validationReponsesTaille,
      EtapeTaille,
    ),
    fabriqueInformationsEtapes.form(
      "Secteurs d’activité",
      validationReponsesSecteurs,
      EtapeSecteursActivite,
      {
        sousEtapeConditionnelle: sousEtapeSousSecteur,
      },
    ),
    fabriqueInformationsEtapes.form(
      "Activités pratiquées",
      validationReponsesActivites,
      EtapeActivites,
      {
        ignoreSi: validateurSecteurAutreUniquement,
      },
    ),
    fabriqueInformationsEtapes.resultat("Resultat"),
  );
export const etatEtapesInitial = fabriqueEtatEtape(etapesQuestionnaire, 0);
