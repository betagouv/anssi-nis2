import React, { Reducer } from "react";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { SimulateurDonneesFormulaireActions } from "./props.ts";
import { fieldHandlers } from "./gestionnaires.ts";
import { BoutonsNavigation } from "./boutonsNavigation.ts";
import {
  fabriqueSecteurContientLeSousSecteur,
  LibellesSousSecteurs,
  TValeursSecteursAvecSousSecteurs,
} from "../../Domaine/Simulateur/SousSecteurs.ts";
import { TValeursSousSecteursActivites } from "../../Domaine/Simulateur/ValeursCles.ts";
import { SelectOptions } from "./simulateurFrontServices.ts";
import { transformateurSousSecteurActivite } from "./Transformateurs.ts";
import { entreesLibellesSousSecteurs } from "../../Domaine/References/LibellesSousSecteursActivite.ts";

const generateNewStateFrom = (
  state: DonneesFormulaireSimulateur,
  fieldName: NomsChampsSimulateur,
  newFieldValue: string[],
) => ({ ...state, [fieldName]: newFieldValue });
export const reducerFormData: Reducer<
  DonneesFormulaireSimulateur,
  SimulateurDonneesFormulaireActions
> = (state, { name, newValue, type }) => {
  switch (type) {
    case "checkSingle":
      return generateNewStateFrom(state, name, [newValue]);
    case "checkMulti":
      return generateNewStateFrom(
        state,
        name,
        fieldHandlers[name](newValue, state),
      );
    default:
      throw Error(`Unknown action: ${type}`);
  }
};

export class ActionsBoutonNavigation {
  constructor(
    public readonly bouton: "precedent" | "suivant",
    public readonly newHandler: React.MouseEventHandler,
  ) {}
}

export const reducerBoutons: Reducer<
  BoutonsNavigation,
  ActionsBoutonNavigation
> = (state, { bouton, newHandler }) => {
  if (newHandler === undefined) {
    return state;
  }
  return { ...state, [bouton]: newHandler };
};
export const changeInfobulleOuverte: Reducer<
  {
    id: string;
  },
  string
> = ({ id }, nouvelId) => {
  if (id === nouvelId) return { id: "" };
  return { id: nouvelId };
};
const reducteurCleValeurVersObjet = (
  libellesSousSecteurDuSecteur: LibellesSousSecteurs,
  [sousSecteur, libelle]: [TValeursSousSecteursActivites, string],
) => ({
  ...libellesSousSecteurDuSecteur,
  [sousSecteur]: libelle,
});
export const reducteurSecteursVersOptions =
  (
    gereChangement: (event: React.ChangeEvent<HTMLInputElement>) => void,
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) =>
  (
    secteursAvecOptionsSousSecteurs: [
      TValeursSecteursAvecSousSecteurs,
      SelectOptions,
    ][],
    secteur: TValeursSecteursAvecSousSecteurs,
  ): [TValeursSecteursAvecSousSecteurs, SelectOptions][] => {
    const sousSecteurActivite = transformateurSousSecteurActivite(
      entreesLibellesSousSecteurs
        .filter(fabriqueSecteurContientLeSousSecteur(secteur))
        .reduce(reducteurCleValeurVersObjet, {}),
      gereChangement,
      donneesFormulaire,
    );
    return [...secteursAvecOptionsSousSecteurs, [secteur, sousSecteurActivite]];
  };
