import { Meta, StoryObj } from "@storybook/react";
import { ChargeurEtape } from "../../../Components/Simulateur/ChargeurEtape.tsx";
import { etapesQuestionnaire } from "../../../Components/Simulateur/EtapesQuestionnaire.ts";
import { AppContext, Context } from "../../../AppContext.tsx";
import { defaultContext } from "../../../.storybook/PageDecorator.tsx";
import {
  reducerBoutons,
  reducerFormData,
} from "../../../Components/Simulateur/reducers.ts";
import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof ChargeurEtape> = {
  component: ChargeurEtape,
  args: {
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

type CanvasFindByRole = {
  findByRole: (
    role: string,
    options: {
      name: string;
    },
  ) => Promise<HTMLElement>;
};
const cliqueSurSuivant = async (canvas: CanvasFindByRole) => {
  const element = await canvas.findByRole("button", { name: "Suivant" });
  await userEvent.click(element as HTMLElement);
};

export const EtapeSousActiviteConditionnelle: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await cliqueSurSuivant(canvas);
    await cliqueSurSuivant(canvas);
    await cliqueSurSuivant(canvas);

    await userEvent.click(await canvas.findByText("Énergie"));

    await cliqueSurSuivant(canvas);

    await canvas.findByText(
      "Quel type de structure qualifie votre organisation ?",
    );
  },
};
