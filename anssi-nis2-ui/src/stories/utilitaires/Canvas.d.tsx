import { ByRoleOptions } from "@testing-library/dom/types/queries";
import { BoundFunctions } from "@testing-library/dom/types/get-queries-for-element";
import * as queries from "@testing-library/dom/types/queries";

export type CanvasFindByRole = {
  findByRole: (role: string, options: ByRoleOptions) => Promise<HTMLElement>;
};
export type CanvasObject = BoundFunctions<typeof queries>;
