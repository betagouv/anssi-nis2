import { DefaultComponentExtensible } from "../Props.ts";
import {
  SimulateurContenuEtapeProps,
  SimulateurEtapeRenderedProps,
} from "./props.ts";

export type SimulateurEtapeNodeComponent =
  DefaultComponentExtensible<SimulateurContenuEtapeProps>;
export type SimulateurEtapeRenderedComponent =
  DefaultComponentExtensible<SimulateurEtapeRenderedProps>;
