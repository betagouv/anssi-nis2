import {
  ValeursPrecisionsResultatIncertain,
  ValeursPrecisionsResultatNonRegule,
  ValeursPrecisionsResultatRegule,
} from "./Resultat.valeurs";

export type PrecisionResultatRegule =
  (typeof ValeursPrecisionsResultatRegule)[number];

export type PrecisionResultatNonRegule =
  (typeof ValeursPrecisionsResultatNonRegule)[number];

export type PrecisionResultatIncertain =
  (typeof ValeursPrecisionsResultatIncertain)[number];

export type PrecisionResultat =
  | PrecisionResultatIncertain
  | PrecisionResultatNonRegule
  | PrecisionResultatRegule;
