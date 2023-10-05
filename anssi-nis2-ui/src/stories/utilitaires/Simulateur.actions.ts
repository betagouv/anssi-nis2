import { CanvasFindByRole, CanvasObject } from "./Canvas.d.tsx";
import { userEvent, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

export const passeEtapeEnCliquantSur = async (
  libelles: string[],
  canvas: CanvasObject,
) => {
  const boutonSuivant = await canvas.findByRole("button", {
    name: "Suivant",
  });
  expect(boutonSuivant).not.toBeEnabled();
  libelles.map(
    async (libelle) => await userEvent.click(await canvas.findByText(libelle)),
  );
  await waitFor(() => expect(boutonSuivant).toBeEnabled());
  await userEvent.click(boutonSuivant);
};
export const cliqueSurSuivant = async (canvas: CanvasFindByRole) => {
  const element = await canvas.findByRole("button", { name: "Suivant" });
  await userEvent.click(element as HTMLElement);
};
