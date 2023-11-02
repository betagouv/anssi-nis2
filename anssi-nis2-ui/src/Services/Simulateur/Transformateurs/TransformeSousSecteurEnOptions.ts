import { SimulateurContenuEtapeProps } from "../Props/simulateurEtapeProps";
import { SecteursAvecSousSecteurs } from "../../../Domaine/Simulateur/SousSecteurActivite.definition.ts";
import { OptionsChampSimulateur } from "../Props/optionChampSimulateur";
import { reducteurSecteursVersOptions } from "../Reducteurs.ts";

export const transformeSousSecteurEnOptions = (
  donneesFormulaire: SimulateurContenuEtapeProps["donneesFormulaire"],
  gereChangement: (event: React.ChangeEvent<HTMLInputElement>) => void,
): [SecteursAvecSousSecteurs, OptionsChampSimulateur][] => {
  return (
    donneesFormulaire.secteurActivite as SecteursAvecSousSecteurs[]
  ).reduce(reducteurSecteursVersOptions(gereChangement, donneesFormulaire), []);
};
