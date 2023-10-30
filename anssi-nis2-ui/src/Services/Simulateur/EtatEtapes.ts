import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import {
  InformationEtapeForm,
  InformationsEtape,
} from "./InformationsEtape.ts";
import { IDonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

import { SimulateurEtapeRenderedComponent } from "./Props/component";

export type EtatEtapes = {
  readonly collectionEtapes: CollectionInformationsEtapes;
  readonly indiceCourant: number;
  readonly indiceSousEtape: number;
  readonly donneesFormulaire: IDonneesFormulaireSimulateur;
  readonly indice: number;
  readonly numero: number;
  readonly contenuEtapeCourante: InformationsEtape;
  readonly titre: string;
  readonly titreSuivant?: string;
  readonly conteneurElement: SimulateurEtapeRenderedComponent;
  readonly etapeSuivantExiste: boolean;
  readonly sousEtapeNonActivee: boolean;
  readonly surEtapeInitiale: boolean;
  readonly rempliContitionSousEtape: (
    donnees: IDonneesFormulaireSimulateur,
  ) => boolean;
  readonly informationEtapeForm: InformationEtapeForm;
};

export const ConstantesEtatEtape = {
  indiceEtapeInitial: 0,
  indiceSousEtapeInitial: 0,
} as const;
