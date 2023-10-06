import { CanvasFindByRole, CanvasObject } from "./Canvas.d.tsx";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { libellesSimulateur as libelles } from "../../Domaine/References/Libelles.ts";
import { NomsChampsSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  TValeursActivites,
  TValeursReponsesDesigneOSE,
  TValeursSecteursActivites,
  TValeursSousSecteursActivites,
  ValeursClePaysUnionEuropeenne,
  ValeursTrancheCA,
  ValeursTrancheNombreEmployes,
  ValeursTypeStructure,
} from "../../Domaine/Simulateur/ValeursCles.ts";

export const passeEtapeEnCochant = async <
  T extends
    | TValeursReponsesDesigneOSE
    | TValeursActivites
    | ValeursClePaysUnionEuropeenne
    | TValeursSecteursActivites
    | TValeursSousSecteursActivites
    | ValeursTrancheCA
    | ValeursTrancheNombreEmployes
    | ValeursTypeStructure,
>(
  canvas: CanvasObject,
  champsACliquer: [NomsChampsSimulateur, T][],
  suivantActiveApres: number = 0,
) => {
  const boutonSuivant = await canvas.findByRole("button", {
    name: "Suivant",
  });
  for (let i = 0; i < champsACliquer.length; i++) {
    const [champ, valeur] = champsACliquer[i];
    if (i === 0 || i < suivantActiveApres) {
      expect(boutonSuivant).not.toBeEnabled();
    }
    await userEvent.click(
      await canvas.findByText((libelles[champ] as Record<T, string>)[valeur]),
    );
  }
  expect(boutonSuivant).toBeEnabled();
  return await userEvent.click(boutonSuivant);
};

export const cliqueSurSuivant = async (canvas: CanvasFindByRole) => {
  const element = await canvas.findByRole("button", { name: "Suivant" });
  await userEvent.click(element as HTMLElement);
};
