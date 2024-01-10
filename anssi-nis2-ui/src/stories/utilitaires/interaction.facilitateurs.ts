import { expect } from "@storybook/jest";
import { waitFor, within } from "@storybook/testing-library";
import { VVV } from "../../../../commun/core/src/Domain/utilitaires/debug.ts";

export const attendTexteCharge = async (
  canvasElement: HTMLElement,
  textCherche: string,
) =>
  await waitFor(
    () =>
      expect(within(canvasElement).getByText(textCherche)).toBeInTheDocument(),
    {
      onTimeout: (e) => {
        VVV("Hey, j'ai trop attendu", e);
        return e;
      },
    },
  );
