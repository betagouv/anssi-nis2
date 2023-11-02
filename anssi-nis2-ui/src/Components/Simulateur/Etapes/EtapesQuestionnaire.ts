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
  contientSousSecteurAutresUniquement,
  ou,
} from "../../../Domaine/Simulateur/services/ChampSimulateur/champs.predicats.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.ts";
import { fabriqueEtatEtape } from "../../../Domaine/Simulateur/fabriques/EtatEtape.fabrique.ts";
import { fabriqueInformationsEtapes } from "../../../Domaine/Simulateur/fabriques/InformationsEtape.fabrique.ts";
import {
  fabriqueValidationUneReponses,
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
} from "../../../Domaine/Simulateur/services/ChampSimulateur/ValidationReponses.ts";
import {
  contientAutreSecteurActiviteUniquement,
  estUnSecteurAvecDesSousSecteurs,
} from "../../../Domaine/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";

const contientDesSecteursAvecSousSecteurs = ({
  secteurActivite,
}: IDonneesBrutesFormulaireSimulateur) => {
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
      fabriqueValidationUneReponses("designeOperateurServicesEssentiels"),
      EtapeOSE,
    ),
    fabriqueInformationsEtapes.form(
      "Localisation de l’activité",
      fabriqueValidationUneReponses("etatMembre"),
      EtapeLocalisation,
    ),
    fabriqueInformationsEtapes.form(
      "Type de structure",
      fabriqueValidationUneReponses("typeStructure"),
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
        ignoreSi: ou(
          contientAutreSecteurActiviteUniquement,
          contientSousSecteurAutresUniquement,
        ),
      },
    ),
    fabriqueInformationsEtapes.resultat("Resultat"),
  );
export const etatEtapesInitial = fabriqueEtatEtape(etapesQuestionnaire, 0);
