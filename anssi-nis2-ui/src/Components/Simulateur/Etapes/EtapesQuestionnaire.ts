import {
  EtapeActivites,
  EtapeLocalisation,
  EtapeOSE,
  EtapeSecteursActivite,
  EtapeSousSecteursActivite,
  EtapeTaille,
  EtapeTypeStructure,
} from "./index.ts";
import { CollectionInformationsEtapes } from "../../../../../anssi-nis2-domain/src/Simulateur/CollectionInformationsEtapes.ts";
import {
  contientSousSecteurAutresUniquement,
  ou,
} from "../../../../../anssi-nis2-domain/src/Simulateur/services/ChampsSimulateur/champs.predicats.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { fabriqueEtatEtape } from "../../../../../anssi-nis2-domain/src/Simulateur/fabriques/EtatEtape.fabrique.ts";
import { fabriquesInformationsEtapes } from "../../../Services/Simulateur/InformationsEtape.fabrique.ts";
import {
  fabriqueValidationUneReponses,
  validationReponsesActivites,
  validationReponsesSecteurs,
  validationReponsesSousActivites,
  validationReponsesTaille,
  validationReponsesTypeStructure,
} from "../../../../../anssi-nis2-domain/src/Simulateur/services/ChampsSimulateur/ValidationReponses.ts";
import {
  contientAutreSecteurActiviteUniquement,
  estUnSecteurAvecDesSousSecteurs,
} from "../../../../../anssi-nis2-domain/src/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import EtapeTaillePublique from "./EtapeTaillePublique.tsx";
import { SimulateurEtapeRenderedComponent } from "../../../Services/Simulateur/Props/component";

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
const etapeTailleStructurePrivee = fabriquesInformationsEtapes.form(
  "Taille de l’organisation",
  validationReponsesTaille,
  EtapeTaille,
);
const etapeTailleStructurePublique = fabriquesInformationsEtapes.form(
  "Taille de l’organisation",
  fabriqueValidationUneReponses("trancheNombreEmployes"),
  EtapeTaillePublique,
);
const etapeSecteurActivite = fabriquesInformationsEtapes.form(
  "Secteurs d’activité",
  validationReponsesSecteurs,
  EtapeSecteursActivite,
  {
    sousEtapeConditionnelle: sousEtapeSousSecteur,
  },
);
export const etapesQuestionnaire: CollectionInformationsEtapes<SimulateurEtapeRenderedComponent> =
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
