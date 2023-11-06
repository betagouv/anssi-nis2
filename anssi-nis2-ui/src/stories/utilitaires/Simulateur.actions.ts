import { CanvasObject } from "./Canvas.d.tsx";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { libellesSimulateur } from "../../References/Libelles.ts";
import { NomsChampsSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { SecteurActivite } from "../../Domaine/Simulateur/SecteurActivite.definitions.ts";

import { SousSecteurActivite } from "../../Domaine/Simulateur/SousSecteurActivite.definitions.ts";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { ValeursActivites } from "../../Domaine/Simulateur/Activite.definitions.ts";

export const passeEtapeEnCochant = async <
  NomChamp extends
    | DesignationOperateurServicesEssentiels
    | ValeursActivites
    | AppartenancePaysUnionEuropeenne
    | SecteurActivite
    | SousSecteurActivite
    | TrancheChiffreAffaire
    | TrancheNombreEmployes
    | TypeStructure,
>(
  canvas: CanvasObject,
  champsACliquer: [NomsChampsSimulateur, NomChamp][],
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
      await canvas.findByText(
        (libellesSimulateur[champ] as Record<NomChamp, string>)[valeur],
      ),
    );
  }
  expect(boutonSuivant).toBeEnabled();
  return await userEvent.click(boutonSuivant);
};
