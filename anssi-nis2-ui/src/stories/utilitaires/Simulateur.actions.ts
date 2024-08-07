import { ValeurChampSimulateur } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { NomsChampsSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { CanvasObject } from "./Canvas.d.tsx";
import { userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { libellesSimulateur } from "../../References/Libelles.ts";

const libellesValeurDeChamp = <NomChamp extends ValeurChampSimulateur>(
  champ: NomsChampsSimulateur,
  valeur: NomChamp,
) => (libellesSimulateur[champ] as Record<NomChamp, string>)[valeur];

const verifieEtatBoutonSuivant = (
  suivantActiveApres: number,
  boutonSuivant: HTMLElement,
) => suivantActiveApres !== 0 || expect(boutonSuivant).not.toBeEnabled();

export const passeEtapeEnCochant = async <
  NomChamp extends ValeurChampSimulateur,
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
    verifieEtatBoutonSuivant(suivantActiveApres, boutonSuivant);
    const champACliquer = await canvas.findByLabelText(
      libellesValeurDeChamp(champ, valeur),
    );
    await userEvent.click(champACliquer);
  }
  expect(boutonSuivant).toBeEnabled();
  return await userEvent.click(boutonSuivant);
};

export const cocheEtPasseEtape =
  (suivantActiveApres: number = 0) =>
  (canvas: CanvasObject) =>
  async <NomChamp extends ValeurChampSimulateur>(
    champsACliquer: [NomsChampsSimulateur, NomChamp][],
  ) =>
    passeEtapeEnCochant(canvas, champsACliquer, suivantActiveApres);
export const cocheAuMoinsUnEtPasseEtape = cocheEtPasseEtape();

export const cliqueSurDebuterLeTest = async (canvas: CanvasObject) =>
  await userEvent.click(
    await canvas.findByRole("button", {
      name: "Débuter le test",
    }),
  );
