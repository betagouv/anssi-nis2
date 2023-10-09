import { CanvasObject } from "./Canvas.d.tsx";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { libellesSimulateur as libelles } from "../../Domaine/References/Libelles.ts";
import { NomsChampsSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  Activites,
  DesignationOperateurServicesEssentiels,
  AppartenancePaysUnionEuropeenne,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "../../Domaine/Simulateur/ValeursCles.ts";
import { SecteursActivites } from "../../Domaine/Simulateur/SecteursActivite";

import { SousSecteursActivites } from "../../Domaine/Simulateur/SousSecteurs.ts";

export const passeEtapeEnCochant = async <
  T extends
    | DesignationOperateurServicesEssentiels
    | Activites
    | AppartenancePaysUnionEuropeenne
    | SecteursActivites
    | SousSecteursActivites
    | TrancheChiffreAffaire
    | TrancheNombreEmployes
    | TypeStructure,
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
    if (suivantActiveApres === 0) {
      expect(boutonSuivant).not.toBeEnabled();
    }
    await userEvent.click(
      await canvas.findByText((libelles[champ] as Record<T, string>)[valeur]),
    );
  }
  expect(boutonSuivant).toBeEnabled();
  return await userEvent.click(boutonSuivant);
};
