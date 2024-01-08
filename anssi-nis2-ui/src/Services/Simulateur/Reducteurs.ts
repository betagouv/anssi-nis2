import {
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "anssi-nis2-core/src/Domain/Simulateur/DonneesFormulaire.ts";
import {
  LibellesSousSecteurs,
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import React, { Reducer } from "react";
import { fabriqueDonneesFormulaire } from "../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";
import { fabriqueSecteurContientLeSousSecteur } from "../../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.operations.ts";

import { entreesLibellesSousSecteurs } from "../../References/LibellesSousSecteursActivite.ts";
import { gestionnairesPourChamps } from "./gestionnaires.ts";
import { BoutonsNavigation } from "./Props/boutonsNavigation";

import { SimulateurDonneesFormulaireActions } from "./Props/donneesFormulaire";
import { OptionsChampSimulateur } from "./Props/optionChampSimulateur";
import { transformateurSousSecteurActivite } from "./Transformateurs/TransformateurSousSecteurActivite.ts";

const generateNewStateFrom: (
  state: IDonneesBrutesFormulaireSimulateur,
  fieldName: NomsChampsSimulateur,
  newFieldValue: string[],
) => IDonneesBrutesFormulaireSimulateur = (
  state: IDonneesBrutesFormulaireSimulateur,
  fieldName: NomsChampsSimulateur,
  newFieldValue: string[],
) =>
  fabriqueDonneesFormulaire({
    ...state,
    [fieldName]: newFieldValue,
  });

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
        gestionnairesPourChamps(name)(newValue, state),
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
    donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
  ) =>
  (
    secteursAvecOptionsSousSecteurs: [
      SecteursAvecSousSecteurs,
      OptionsChampSimulateur,
    ][],
    secteur: SecteursAvecSousSecteurs,
  ): [SecteursAvecSousSecteurs, OptionsChampSimulateur][] => {
    const valeursAssocieesLibelles = entreesLibellesSousSecteurs
      .filter(fabriqueSecteurContientLeSousSecteur(secteur))
      .reduce(reducteurCleValeurVersObjet, {}) as Record<
      SousSecteurActivite,
      string
    >;
    const sousSecteurActivite = transformateurSousSecteurActivite(
      valeursAssocieesLibelles,
      gereChangement,
      donneesFormulaire,
    );
    return [...secteursAvecOptionsSousSecteurs, [secteur, sousSecteurActivite]];
  };
