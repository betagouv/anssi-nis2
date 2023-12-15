import { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import {
  AppartenancePaysUnionEuropeenne,
  FournitServicesUnionEuropeenne,
} from '../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts'
import EtapeLocalisationActiviteSpecifique from '../../../Components/Simulateur/Etapes/EtapeLocalisationActiviteSpecifique.tsx'
import {
  libellesFournitServicesUnionEuropeenne,
  libellesPaysUnionEuropeenneLocalisation,
} from '../../../References/Libelles.ts'
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from '../../../Domaine/Simulateur/DonneesFormulaire.ts'

const meta: Meta<typeof EtapeLocalisationActiviteSpecifique> = {
  title:
    'Composants/Simulateur/Etapes/6 bis - Localisation Activité Spécifique',
  component: EtapeLocalisationActiviteSpecifique,
  argTypes: {
    propageActionSimulateur: { action: true },
  },
}

export default meta
type Story = StoryObj<typeof EtapeLocalisationActiviteSpecifique>

const creeActionPropagationFormulaireFournitServicesUnionEuropeenne = (
  newValue: FournitServicesUnionEuropeenne,
) => {
  const actionTypique = {
    type: 'checkSingle',
    name: 'fournitServicesUnionEuropeenne',
  }
  return { ...actionTypique, newValue: newValue }
}

const creeActionPropagationFormulaireLocalisationRepresentant = (
  newValue: AppartenancePaysUnionEuropeenne,
) => {
  const actionTypique = {
    type: 'checkSingle',
    name: 'localisationRepresentant',
  }
  return { ...actionTypique, newValue: newValue }
}

export const FournitServicesUnionEuropeenneSeul: Story = {
  name: 'Fournit services UnionEuropeenne seul',
  args: {
    donneesFormulaire: donneesFormulaireSimulateurVide,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    const { propageActionSimulateur } = args

    step('Localisation UE', async () => {
      const optionsATester: { libelle: string; newValue: 'oui' | 'non' }[] = [
        {
          libelle: libellesFournitServicesUnionEuropeenne['oui'],
          newValue: 'oui',
        },
        {
          libelle: libellesFournitServicesUnionEuropeenne['non'],
          newValue: 'non',
        },
      ]
      for (const { libelle, newValue } of optionsATester) {
        const actionPropagee =
          creeActionPropagationFormulaireFournitServicesUnionEuropeenne(
            newValue,
          )
        await step(
          `Clique sur '${libelle}' déclanche le dispatch d'action '${actionPropagee.type}' sur le champs '${actionPropagee.name}' pour une valeur '${newValue}'`,
          async () => {
            await userEvent.click(await canvas.findByText(libelle))
            await expect(propageActionSimulateur).toHaveBeenCalledWith(
              actionPropagee,
            )
          },
        )
      }
    })
  },
}

export const LocalisationDuRepresentant: Story = {
  name: 'Localisation du représentant',
  args: {
    donneesFormulaire: new DonneesFormulaireSimulateur(
      donneesFormulaireSimulateurVide,
    ).avec({ fournitServicesUnionEuropeenne: ['oui'] }),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement)
    const { propageActionSimulateur } = args

    step('Localisation représentant', async () => {
      const optionsATester: {
        libelle: string
        newValue: AppartenancePaysUnionEuropeenne
      }[] = [
        {
          libelle: libellesPaysUnionEuropeenneLocalisation['france'],
          newValue: 'france',
        },
        {
          libelle: libellesPaysUnionEuropeenneLocalisation['autre'],
          newValue: 'autre',
        },
        {
          libelle: libellesPaysUnionEuropeenneLocalisation['horsue'],
          newValue: 'horsue',
        },
      ]
      for (const { libelle, newValue } of optionsATester) {
        const actionPropagee =
          creeActionPropagationFormulaireLocalisationRepresentant(newValue)
        await step(
          `Clique sur '${libelle}' déclanche le dispatch d'action '${actionPropagee.type}' sur le champs '${actionPropagee.name}' pour une valeur '${newValue}'`,
          async () => {
            await userEvent.click(await canvas.findByText(libelle))
            await expect(propageActionSimulateur).toHaveBeenCalledWith(
              actionPropagee,
            )
          },
        )
      }
    })
  },
}
