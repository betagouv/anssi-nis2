import { BoundFunctions } from "@testing-library/dom/types/get-queries-for-element";
import * as queries from "@testing-library/dom/types/queries";

export type CanvasObject = BoundFunctions<typeof queries>;
