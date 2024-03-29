import { waitFor, within, expect } from "@storybook/test";

export const attendTexteCharge = async (
  canvasElement: HTMLElement,
  textCherche: string,
) =>
  await waitFor(() =>
    expect(within(canvasElement).getByText(textCherche)).toBeInTheDocument(),
  );
