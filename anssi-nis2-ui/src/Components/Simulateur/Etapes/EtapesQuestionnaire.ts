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
import EtapeTaillePublique from "./EtapeTaillePublique.tsx";

const contientDesSecteursAvecSousSecteurs = ({
  secteurActivite,
}: IDonneesBrutesFormulaireSimulateur) => {
  return secteurActivite.some(estUnSecteurAvecDesSousSecteurs);
};

const sousEtapeSousSecteur =
  fabriquesInformationsEtapes.sousEtapeConditionnelle(
    contientDesSecteursAvecSousSecteurs,
    fabriquesInformationsEtapes.form(
      "Sous-secteur d'activité",
      validationReponsesSousActivites,
      EtapeSousSecteursActivite,
    ),
  );
export const etapesQuestionnaire: CollectionInformationsEtapes =
  new CollectionInformationsEtapes(
    fabriquesInformationsEtapes.prealable("Pour bien débuter"),
    fabriquesInformationsEtapes.form(
      "Désignation éventuelle",
      fabriqueValidationUneReponses("designeOperateurServicesEssentiels"),
      EtapeOSE,
    ),
    fabriquesInformationsEtapes.form(
      "Localisation de l’activité",
      fabriqueValidationUneReponses("etatMembre"),
      EtapeLocalisation,
    ),
    fabriquesInformationsEtapes.form(
      "Type de structure",
      validationReponsesTypeStructure,
      EtapeTypeStructure,
    ),
    fabriquesInformationsEtapes.variantes([
      {
        etape: fabriquesInformationsEtapes.form(
          "Taille de l’organisation",
          validationReponsesTaille,
          EtapeTaille,
        ),
        conditions: { typeStructure: ["privee"] },
      },
      {
        etape: fabriquesInformationsEtapes.form(
          "Taille de l’organisation",
          fabriqueValidationUneReponses("trancheNombreEmployes"),
          EtapeTaillePublique,
        ),
        conditions: { typeStructure: ["publique"] },
      },
    ]),

    fabriquesInformationsEtapes.form(
      "Secteurs d’activité",
      validationReponsesSecteurs,
      EtapeSecteursActivite,
      {
        sousEtapeConditionnelle: sousEtapeSousSecteur,
      },
    ),
    fabriquesInformationsEtapes.form(
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
    fabriquesInformationsEtapes.resultat("Resultat"),
  );
export const etatEtapesInitial = fabriqueEtatEtape(etapesQuestionnaire, 0);
