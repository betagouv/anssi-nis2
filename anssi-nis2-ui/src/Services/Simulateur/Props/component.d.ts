import { DefaultComponentExtensible } from "../../Props.ts";

import {
  SimulateurContenuEtapeProps,
  SimulateurEtapeRenderedProps,
} from "./simulateurEtapeProps";

export type SimulateurEtapeNodeComponent =
  DefaultComponentExtensible<SimulateurContenuEtapeProps>;
export type SimulateurEtapeRenderedComponent =
  DefaultComponentExtensible<SimulateurEtapeRenderedProps>;
