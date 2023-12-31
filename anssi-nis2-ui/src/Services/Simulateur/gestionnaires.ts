import React from "react";
import { ValeurChampSimulateur } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import {
  IDonneesBrutesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.ts";

import { SimulateurDonneesFormulaireActions } from "./Props/donneesFormulaire";
import { GestionValeursFormulaire } from "./Props/gestionValeursFormulaire";

export const gestionValeursSimples = (value: ValeurChampSimulateur) => [value];

export const genereGestionValeursMultiples = (name: NomsChampsSimulateur) => {
  function gestionValeursMultiples(
    value: ValeurChampSimulateur,
    donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
  ) {
    const valeursChampFormulaire: ValeurChampSimulateur[] =
      donneesFormulaire[name];
    if (valeursChampFormulaire.indexOf(value) === -1) {
      return [...valeursChampFormulaire, value];
    }
    return valeursChampFormulaire.filter((content) => content !== value);
  }

  return gestionValeursMultiples;
};

export const gestionnairesDeChamp: Record<
  NomsChampsSimulateur,
  GestionValeursFormulaire
> = {
  designeOperateurServicesEssentiels: gestionValeursSimples,
  etatMembre: gestionValeursSimples,
  secteurActivite: genereGestionValeursMultiples("secteurActivite"),
  sousSecteurActivite: genereGestionValeursMultiples("sousSecteurActivite"),
  activites: genereGestionValeursMultiples("activites"),
  trancheCA: gestionValeursSimples,
  trancheNombreEmployes: gestionValeursSimples,
  typeStructure: gestionValeursSimples,
  typeEntitePublique: gestionValeursSimples,
  fournitServicesUnionEuropeenne: gestionValeursSimples,
  localisationRepresentant: gestionValeursSimples,
};

export const gestionnairesPourChamps = (
  name: NomsChampsSimulateur,
): GestionValeursFormulaire => gestionnairesDeChamp[name];

export const fabriqueGestionChangementSimple =
  (
    propageActionSimulateur: React.Dispatch<SimulateurDonneesFormulaireActions>,
  ) =>
  (evt: React.ChangeEvent<HTMLInputElement>) => {
    propageActionSimulateur({
      type: "checkSingle",
      name: evt.target.name as NomsChampsSimulateur,
      newValue: evt.target.value as ValeurChampSimulateur,
    });
  };
