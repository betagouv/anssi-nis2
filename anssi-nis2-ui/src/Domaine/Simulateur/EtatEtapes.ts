import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes";
import {
  CapaciteEtape,
  InformationEtapeForm,
  InformationsEtape,
  TypeEtape,
} from "./InformationsEtape";
import { IDonneesBrutesFormulaireSimulateur } from "./DonneesFormulaire";
import {
  toujourNegatif,
  toujoursFaux,
  toujoursVrai,
} from "../Commun/Commun.predicats";
import { validationToutesLesReponses } from "./services/ChampSimulateur/ValidationReponses";

export type EtatEtapes = {
  // Données générales
  readonly collectionEtapes: CollectionInformationsEtapes;

  // Situation dans la collection
  readonly indiceCourant: number;
  readonly indiceSousEtape: number;
  readonly varianteEtape: number;
  readonly numero: number;

  // Informations sur l'enchainement d'étapes
  readonly etapeSuivantExiste: boolean;
  readonly estSurSousEtape: boolean;
  readonly estSurEtapeInitiale: boolean;

  // Informations sur le composant
  readonly titreSuivant?: string;
  readonly donneesFormulaire: IDonneesBrutesFormulaireSimulateur;
  readonly typeEtapeCourante: TypeEtape;
  readonly contenuEtapeCourante: InformationEtapeForm;

  // Capacités
  readonly ignoreEtapeSuivante: (
    etat: EtatEtapes,
    donnees: IDonneesBrutesFormulaireSimulateur,
  ) => boolean;
};

export const ConstantesEtatEtape = {
  indiceEtapeInitial: 0,
  indiceSousEtapeInitial: 0,
} as const;

export const EtapeVide: InformationsEtape & CapaciteEtape = {
  type: "inexistante",
  longueurComptabilisee: 0,
  existe: false,
  titre: "Hors de portee",
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursVrai,
  validationReponses: validationToutesLesReponses,
  varianteAffichee: toujourNegatif,
} as const;
