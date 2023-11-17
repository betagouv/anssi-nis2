import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import RestezInformes from "../../../Components/RestezInformes.tsx";
import { genereDecorateurPourContexte } from "../../utilitaires/generateursDecorateurs.tsx";
import { defaultContext } from "../../utilitaires/PageDecorator.tsx";
import { Contexte } from "../../../Services/contexte";
import { mockEnregistreInformationsEmail } from "../../utilitaires/mocks.ts";
import { userEvent, within } from "@storybook/testing-library";
import { CanvasObject } from "../../utilitaires/Canvas.d.tsx";
import { InformationsEmail } from "../../../Domaine/Contact/InformationsEmail.definitions.ts";

const enregistreEmailContexte: Contexte = {
  ...defaultContext,
  enregistreInformationsEmail: mockEnregistreInformationsEmail,
};

const meta: Meta<typeof RestezInformes> = {
  title: "Composants/Transverses/Restez informés",
  component: RestezInformes,
  decorators: [genereDecorateurPourContexte(enregistreEmailContexte)],
  parameters: {
    actions: {
      handles: ["enregistreInformationsEmail"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof RestezInformes>;

export const RestezInformesSimple: Story = {};

const remplieChamp = async (
  canvas: CanvasObject,
  libelleChamp: string,
  contenu: string,
) => {
  await userEvent.click(await canvas.findByLabelText(libelleChamp));
  await userEvent.keyboard(contenu);
};

const cliqueValidationForm = async (canvas: CanvasObject) =>
  userEvent.click(
    await canvas.findByRole("button", {
      name: "S'inscrire",
    }),
  );

export const RestezInformesRemplieEtEnvoieInfo: Story = {
  play: async ({ canvasElement }) => {
    mockEnregistreInformationsEmail.mockClear();
    const informationsEmail: InformationsEmail = {
      accepteInfolettreNis2: true,
      accepteInfolettreServicesDedies: true,
      email: "rssi@toto.com",
      nomOrganisation: "Toto Corp",
    };
    const canvas = within(canvasElement);
    await remplieChamp(
      canvas,
      "Nom de votre organisation",
      informationsEmail.nomOrganisation ?? "",
    );
    await remplieChamp(canvas, "Adresse électronique", informationsEmail.email);
    userEvent.click(
      await canvas.findByLabelText(
        "J’accepte de recevoir des informations concernant la directive NIS2",
      ),
    );
    userEvent.click(
      await canvas.findByLabelText(
        "Je souhaite m’enregistrer auprès de l’ANSSI afin de bénéficier des futurs services dédiés aux organisations concernées",
      ),
    );
    await cliqueValidationForm(canvas);
    await canvas.findByText(
      "Nous avons pris en compte votre demande. Vous recevrez bientôt des nouvelles à propos de NIS 2.",
    );
    await expect(mockEnregistreInformationsEmail).toHaveBeenCalledTimes(1);
    await expect(mockEnregistreInformationsEmail).toHaveBeenCalledWith(
      informationsEmail,
    );
  },
};

export const ValidationDesChamps: Story = {
  play: async ({ canvasElement }) => {
    mockEnregistreInformationsEmail.mockClear();
    const canvas = within(canvasElement);
    const informationsEmail: InformationsEmail = {
      accepteInfolettreNis2: false,
      accepteInfolettreServicesDedies: false,
      email: "toto@coco.com",
      nomOrganisation: "",
    };
    await cliqueValidationForm(canvas);
    await canvas.findByText("L'adresse électronique doit être renseignée");
    await remplieChamp(canvas, "Adresse électronique", "toto");
    await canvas.findByText("L'adresse électronique doit être valide");
    await remplieChamp(canvas, "Adresse électronique", "@coco.com");
    await cliqueValidationForm(canvas);
    await canvas.findByText(
      "Nous avons pris en compte votre demande. Vous recevrez bientôt des nouvelles à propos de NIS 2.",
    );
    await expect(mockEnregistreInformationsEmail).toHaveBeenCalledTimes(1);
    await expect(mockEnregistreInformationsEmail).toHaveBeenCalledWith(
      informationsEmail,
    );
  },
};
