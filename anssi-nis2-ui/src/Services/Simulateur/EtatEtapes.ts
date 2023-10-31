import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import {
  InformationEtapeForm,
  InformationsEtape,
} from "./InformationsEtape.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

import { SimulateurEtapeRenderedComponent } from "./Props/component";

export type EtatEtapes = {
  readonly collectionEtapes: CollectionInformationsEtapes;
  readonly indiceCourant: number;
  readonly indiceSousEtape: number;
  readonly donneesFormulaire: IDonneesBrutesFormulaireSimulateur;
  readonly indice: number;
  readonly numero: number;
  readonly contenuEtapeCourante: InformationsEtape;
  readonly titre: string;
  readonly titreSuivant?: string;
  readonly conteneurElement: SimulateurEtapeRenderedComponent;
  readonly etapeSuivantExiste: boolean;
  readonly estSurSousEtape: boolean;
  readonly estSurEtapeInitiale: boolean;
  readonly informationEtapeForm: InformationEtapeForm;
  readonly ignoreEtapeSuivante: (
    etat: EtatEtapes,
    donnees: IDonneesBrutesFormulaireSimulateur,
  ) => boolean;
  readonly remplitContitionSousEtape: (
    donnees: IDonneesBrutesFormulaireSimulateur,
  ) => boolean;
};

export const ConstantesEtatEtape = {
  indiceEtapeInitial: 0,
  indiceSousEtapeInitial: 0,
} as const;
