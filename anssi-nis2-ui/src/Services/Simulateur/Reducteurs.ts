import React, { Reducer } from "react";
import {
  DonneesFormulaireSimulateur,
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { SimulateurDonneesFormulaireActions } from "./Props/donneesFormulaire";
import { fieldHandlers } from "./gestionnaires.ts";
import {
  LibellesSousSecteurs,
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../Domaine/Simulateur/SousSecteurs";
import { entreesLibellesSousSecteurs } from "../../References/LibellesSousSecteursActivite.ts";
import { OptionsChampSimulateur } from "./Props/optionChampSimulateur";
import { BoutonsNavigation } from "./Props/boutonsNavigation";
import { fabriqueSecteurContientLeSousSecteur } from "../../Domaine/Simulateur/operations/operationsSecteurs.ts";
import { transformateurSousSecteurActivite } from "./Transformateurs/TransformateurSousSecteurActivite.ts";

const generateNewStateFrom: (
  state: IDonneesBrutesFormulaireSimulateur,
  fieldName: NomsChampsSimulateur,
  newFieldValue: string[],
) => IDonneesBrutesFormulaireSimulateur = (
  state: IDonneesBrutesFormulaireSimulateur,
  fieldName: NomsChampsSimulateur,
  newFieldValue: string[],
) => new DonneesFormulaireSimulateur({ ...state, [fieldName]: newFieldValue });

export const reducerFormData: Reducer<
  IDonneesBrutesFormulaireSimulateur,
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
> = (state, { bouton, newHandler }: ActionsBoutonNavigation) => {
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
