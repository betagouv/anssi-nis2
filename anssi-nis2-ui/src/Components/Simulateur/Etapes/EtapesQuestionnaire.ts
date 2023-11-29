import { CollectionInformationsEtapes } from "anssi-nis2-domain/src/Simulateur/CollectionInformationsEtapes.ts";
import {
  contientSousSecteurAutresUniquement,
  ou,
} from "anssi-nis2-domain/src/Simulateur/services/ChampsSimulateur/champs.predicats.ts";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { fabriqueEtatEtape } from "anssi-nis2-domain/src/Simulateur/fabriques/EtatEtape.fabrique.ts";
import { fabriquesInformationsEtapes } from "../../../Services/Simulateur/InformationsEtape.fabrique.ts";
import {
  fabriqueValidationUneReponses,
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationReponsesTypeStructure,
} from "anssi-nis2-domain/src/Simulateur/services/ChampsSimulateur/ValidationReponses.ts";
import {
  contientAutreSecteurActiviteUniquement,
  estUnSecteurAvecDesSousSecteurs,
} from "anssi-nis2-domain/src/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "../../../Services/Simulateur/Props/component";

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
      "sousSecteursActivite",
    ),
  );
const etapeTailleStructurePrivee = fabriquesInformationsEtapes.form(
  "Taille de l’organisation",
  validationReponsesTaille,
  "tailleEntitePrivee",
);
const etapeTailleStructurePublique = fabriquesInformationsEtapes.form(
  "Taille de l’organisation",
  fabriqueValidationUneReponses("trancheNombreEmployes"),
  "tailleEntitePublique",
);
const etapeSecteurActivite = fabriquesInformationsEtapes.form(
  "Secteurs d’activité",
  validationReponsesSecteurs,
  "secteursActivite",
  {
    sousEtapeConditionnelle: sousEtapeSousSecteur,
  },
);
export const etapesQuestionnaire: CollectionInformationsEtapes<
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeNodeComponent
> = new CollectionInformationsEtapes(
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

  // fabriquesInformationsEtapes.variantes([
  //   { etape: etapeSecteurActivite, conditions: {} },
  // ]),
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
