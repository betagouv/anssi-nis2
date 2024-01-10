import {
  toujourNegatif,
  toujoursFaux,
  toujoursVrai,
} from "../Commun/Commun.predicats";
import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes";
import {
  CapaciteEtape,
  InformationEtapeForm,
  InformationsEtape,
  TypeEtape,
} from "./InformationsEtape";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.definitions";
import { validationToutesLesReponses } from "./services/ChampSimulateur/ValidationReponses";

/** Situation dans la collection */
export type SituationEtape = {
  readonly collectionEtapes: CollectionInformationsEtapes;

  readonly indiceCourant: number;
  readonly indiceSousEtape: number;
  readonly varianteEtape: number;
  readonly numero: number;
};

/** Informations sur l'enchainement d'étapes */
export type PredicatsEtape = {
  readonly etapeSuivantExiste: boolean;
  readonly estSurSousEtape: boolean;
  readonly estSurEtapeInitiale: boolean;
};

/** Informations sur le composant */
export type RepresentationEtape = {
  // TODO: Se passer du titre suivant
  readonly titreSuivant?: string;
  readonly donneesFormulaire: DonneesFormulaireSimulateur;
  readonly typeEtapeCourante: TypeEtape;
  readonly contenuEtapeCourante: InformationEtapeForm;
};

export type CapacitesEtapes = {
  readonly ignoreEtapeSuivante: (
    etat: EtatEtapes,
    donnees: DonneesFormulaireSimulateur,
  ) => boolean;
};

export type EtatEtapes = SituationEtape &
  PredicatsEtape &
  RepresentationEtape &
  CapacitesEtapes;

export const InformationsEtapeVide: InformationsEtape & CapaciteEtape = {
  type: "inexistante",
  longueurComptabilisee: 0,
  existe: false,
  titre: "Hors de portee",
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursVrai,
  validationReponses: validationToutesLesReponses,
  varianteAffichee: toujourNegatif,
} as const;
