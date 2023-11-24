import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes";
import { InformationEtapeForm } from "./InformationsEtape";
import { IDonneesBrutesFormulaireSimulateur } from "./DonneesFormulaire";

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
