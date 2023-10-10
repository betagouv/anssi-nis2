import React, { Reducer } from "react";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { SimulateurDonneesFormulaireActions } from "./Props/donneesFormulaire";
import { fieldHandlers } from "./gestionnaires.ts";
import {
  fabriqueSecteurContientLeSousSecteur,
  LibellesSousSecteurs,
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../Domaine/Simulateur/SousSecteurs.ts";
import { transformateurSousSecteurActivite } from "./Transformateurs.ts";
import { entreesLibellesSousSecteurs } from "../../Domaine/References/LibellesSousSecteursActivite.ts";
import { OptionsChampSimulateur } from "./Props/optionChampSimulateur";
import { BoutonsNavigation } from "./Props/boutonsNavigation.ts";

const generateNewStateFrom = (
  state: DonneesFormulaireSimulateur,
  fieldName: NomsChampsSimulateur,
  newFieldValue: string[],
) => new DonneesFormulaireSimulateur({ ...state, [fieldName]: newFieldValue });
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
  [sousSecteur, libelle]: [SousSecteurActivite, string],
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
      SecteursAvecSousSecteurs,
      OptionsChampSimulateur,
    ][],
    secteur: SecteursAvecSousSecteurs,
  ): [SecteursAvecSousSecteurs, OptionsChampSimulateur][] => {
    const sousSecteurActivite = transformateurSousSecteurActivite(
      entreesLibellesSousSecteurs
        .filter(fabriqueSecteurContientLeSousSecteur(secteur))
        .reduce(reducteurCleValeurVersObjet, {}),
      gereChangement,
      donneesFormulaire,
    );
    return [...secteursAvecOptionsSousSecteurs, [secteur, sousSecteurActivite]];
  };
