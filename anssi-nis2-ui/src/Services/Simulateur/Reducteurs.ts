import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.definitions.ts";
import {
  LibellesSousSecteurs,
  SousSecteurActivite,
} from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import React, { Reducer } from "react";
import { ValeurChampSimulateur } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { fabriqueDonneesFormulaire } from "../../../../commun/core/src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique.ts";
import { SecteursAvecSousSecteurs } from "../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { fabriqueSecteurContientLeSousSecteur } from "../../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.operations.ts";

import { entreesLibellesSousSecteurs } from "../../References/LibellesSousSecteursActivite.ts";
import { gestionnairesPourChamps } from "./gestionnaires.ts";
import { BoutonsNavigation } from "./Props/boutonsNavigation";

import {
  SimulateurDonneesFormulaireActions,
  SimulateurDonneesFormulaireActionType,
} from "./Props/donneesFormulaire";
import { OptionsChampSimulateur } from "./Props/optionChampSimulateur";
import { transformateurSousSecteurActivite } from "./Transformateurs/TransformateurSousSecteurActivite.ts";

const fabriqueDonneesFormulaireSimulateurSimple = (
  state: DonneesFormulaireSimulateur,
  name: NomsChampsSimulateur,
  newValue: ValeurChampSimulateur,
) =>
  fabriqueDonneesFormulaire({
    ...state,
    [name]: [newValue],
  });

const fabriqueDonneesFormulaireSimulateurMulti = (
  state: DonneesFormulaireSimulateur,
  name: NomsChampsSimulateur,
  newValue: ValeurChampSimulateur,
) =>
  fabriqueDonneesFormulaire({
    ...state,
    [name]: gestionnairesPourChamps(name)(newValue, state),
  });

const actionsFabriqueDonneesFormulaire: Record<
  SimulateurDonneesFormulaireActionType,
  (
    state: DonneesFormulaireSimulateur,
    name: NomsChampsSimulateur,
    newValue: ValeurChampSimulateur,
  ) => DonneesFormulaireSimulateur
> = {
  checkMulti: fabriqueDonneesFormulaireSimulateurMulti,
  checkSingle: fabriqueDonneesFormulaireSimulateurSimple,
};

export const reduitDonneesFormulaire: Reducer<
  DonneesFormulaireSimulateur,
  SimulateurDonneesFormulaireActions
> = (state, { name, newValue, type }) =>
  actionsFabriqueDonneesFormulaire[type](state, name, newValue);

export type ActionsBoutonNavigation = {
  readonly bouton: "precedent" | "suivant";
  readonly newHandler: React.MouseEventHandler;
};

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
