import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import { InformationEtapeForm } from "./InformationsEtape.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

export type EtatEtapes = {
  // Données générales
  readonly collectionEtapes: CollectionInformationsEtapes;

  // Situation dans la collection
  readonly indiceCourant: number;
  readonly indiceSousEtape: number;
  readonly numero: number;

  // Informations sur l'enchainement d'étapes
  readonly etapeSuivantExiste: boolean;
  readonly estSurSousEtape: boolean;
  readonly estSurEtapeInitiale: boolean;

  // Informations sur le composant
  readonly titreSuivant?: string;
  readonly donneesFormulaire: IDonneesBrutesFormulaireSimulateur;
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
