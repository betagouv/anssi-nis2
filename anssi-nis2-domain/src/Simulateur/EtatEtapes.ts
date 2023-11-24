import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes";
import {
  CapaciteEtape,
  InformationEtapeForm,
  InformationsEtape,
} from "./InformationsEtape";
import { IDonneesBrutesFormulaireSimulateur } from "./DonneesFormulaire";
import {
  toujourNegatif,
  toujoursFaux,
  toujoursVrai,
} from "anssi-nis2-ui/src/Services/Simulateur/InformationsEtape.fabrique.ts";
import { validationToutesLesReponses } from "./services/ChampsSimulateur/ValidationReponses.ts";

export type EtatEtapes<TypeConteneur> = {
  // Données générales
  readonly collectionEtapes: CollectionInformationsEtapes<TypeConteneur>;

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
  readonly contenuEtapeCourante: InformationEtapeForm<TypeConteneur>;

  // Capacités
  readonly ignoreEtapeSuivante: (
    etat: EtatEtapes<TypeConteneur>,
    donnees: IDonneesBrutesFormulaireSimulateur,
  ) => boolean;
};

export const ConstantesEtatEtape = {
  indiceEtapeInitial: 0,
  indiceSousEtapeInitial: 0,
} as const;
export const EtapeVide: InformationsEtape<() => void> & CapaciteEtape = {
  longueurComptabilisee: 0,
  existe: false,
  titre: "Hors de portee",
  conteneurElementRendu: () => {},
  remplitContitionSousEtape: toujoursFaux,
  estIgnoree: toujoursVrai,
  validationReponses: validationToutesLesReponses,
  varianteAffichee: toujourNegatif,
} as const;
