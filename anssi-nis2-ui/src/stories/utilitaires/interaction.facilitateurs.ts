import { expect } from "@storybook/jest";
import { waitFor, within } from "@storybook/testing-library";

export const attendTexteCharge = async (
  canvasElement: HTMLElement,
  textCherche: string,
) =>
  await waitFor(() =>
    expect(within(canvasElement).getByText(textCherche)).toBeInTheDocument(),
  );
