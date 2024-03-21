import {
  toujourNegatif,
  toujoursFaux,
  toujoursVrai,
} from "../../../../utils/services/commun.predicats";
import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.definitions";
import {
  CapaciteEtape,
  InformationEtapeForm,
  InformationsEtape,
  InformationsEtapesVariantes,
  TypeEtape,
} from "./InformationsEtape";
import { DonneesFormulaireSimulateur } from "./services/DonneesFormulaire/DonneesFormulaire.definitions";
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
  readonly contenuEtapeCourante:
    | InformationEtapeForm
    | InformationsEtapesVariantes<InformationEtapeForm>;
};

export type CapacitesEtapes = {};

export type EtatEtape = SituationEtape &
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
