import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes";
import {
  CapaciteEtape,
  InformationEtapeForm,
  InformationsEtape,
} from "./InformationsEtape";
import { IDonneesBrutesFormulaireSimulateur } from "./DonneesFormulaire";
import { validationToutesLesReponses } from "./services/ChampsSimulateur/ValidationReponses";

export const toujoursFaux = () => false;
export const toujoursVrai = () => true;
export const toujourNegatif = () => -1;
export type EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent> = {
  // Données générales
  readonly collectionEtapes: CollectionInformationsEtapes<
    TypeConteneur,
    TypeSimulateurEtapeNodeComponent
  >;

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
  readonly contenuEtapeCourante: InformationEtapeForm<
    TypeConteneur,
    TypeSimulateurEtapeNodeComponent
  >;

  // Capacités
  readonly ignoreEtapeSuivante: (
    etat: EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent>,
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
