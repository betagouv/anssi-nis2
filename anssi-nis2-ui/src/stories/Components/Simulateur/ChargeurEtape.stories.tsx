import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { etapesQuestionnaire } from "../../../Components/Simulateur/EtapesQuestionnaire.ts";
import { AppContext, Context } from "../../../AppContext.tsx";
import { defaultContext } from "../../../.storybook/PageDecorator.tsx";
import {
  ActionsBoutonNavigation,
  reducerBoutons,
  reducerFormData,
} from "../../../Components/Simulateur/reducers.ts";
import { Reducer } from "react";
import { BoutonsNavigation } from "../../../Components/Simulateur/props.ts";
import { userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { jest } from "@storybook/jest";
import { noRefClick } from "../../../Components/Echaffaudages/AssistantsEchaffaudages.ts";

const initialButtonsState = {
  suivant: () => {},
  precedent: () => {},
};
const mockBoutonsReducer = jest.fn(
  (() => initialButtonsState) as Reducer<
    BoutonsNavigation,
    ActionsBoutonNavigation
  >,
);

const meta: Meta<typeof ChargeurEtape> = {
  component: ChargeurEtape,
  argTypes: {
    soumissionEtape: { action: true },
  },
  args: {
    etapeCourante: 0,
    listeEtapes: etapesQuestionnaire,
  },
  decorators: [
    (Story) => {
      const simulateurContext: Context = {
        ...defaultContext,
        simulateur: {
          reducerBoutons: reducerBoutons,
          reducerFormData: reducerFormData,
        },
      };
      return (
        <AppContext.Provider value={simulateurContext}>
          <Story />
        </AppContext.Provider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof ChargeurEtape>;

export const AfficheEtape: Story = {
  argTypes: {
    etapeCourante: { control: { type: "range", min: 0, max: 5 } },
  },
};

export const MiseEnPlaceReducerSurNavigation: Story = {
  args: {
    etapeCourante: 3,
  },
  decorators: [
    (Story) => {
      const simulateurContext: Context = {
        ...defaultContext,
        simulateur: {
          reducerBoutons: mockBoutonsReducer,
          reducerFormData: reducerFormData,
        },
      };
      return (
        <AppContext.Provider value={simulateurContext}>
          <Story />
        </AppContext.Provider>
      );
    },
  ],

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const { etapeCourante } = args;
    await expect(etapeCourante).toBe(3);
    await userEvent.click(await canvas.findByText("Énergie"));
    await expect(mockBoutonsReducer).toHaveBeenCalledWith(
      {
        suivant: noRefClick,
        precedent: noRefClick,
      },
      {
        bouton: "suivant",
        newHandler: undefined,
      },
    );
    await userEvent.click(
      await canvas.findByRole("button", { name: "Suivant" }),
    );
  },
};

export const EtapeSousActiviteConditionnelle: Story = {
  args: {
    etapeCourante: 3,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByText("Énergie"));
    await userEvent.click(
      await canvas.findByRole("button", { name: "Suivant" }),
    );
    await canvas.findByText(
      "Quel type de structure qualifie votre organisation ?",
    );
  },
};
