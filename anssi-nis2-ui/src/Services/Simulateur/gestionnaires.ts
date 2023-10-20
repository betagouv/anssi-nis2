import React from "react";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";

import { SimulateurDonneesFormulaireActions } from "./Props/donneesFormulaire";
import { GestionValeursFormulaire } from "./Props/gestionValeursFormulaire";
import { ValeurChampSimulateur } from "../../Domaine/Simulateur/ChampsSimulateur";

export const gestionValeursSimples = (value: ValeurChampSimulateur) => [value];

export const genereGestionValeursMultiples = (name: NomsChampsSimulateur) => {
  function gestionValeursMultiples(
    value: ValeurChampSimulateur,
    donneesFormulaire: DonneesFormulaireSimulateur,
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

export const fieldHandlers: Record<
  NomsChampsSimulateur,
  GestionValeursFormulaire
> = {
  designeOperateurServicesEssentiels: gestionValeursSimples,
  etatMembre: genereGestionValeursMultiples("etatMembre"),
  secteurActivite: genereGestionValeursMultiples("secteurActivite"),
  sousSecteurActivite: genereGestionValeursMultiples("sousSecteurActivite"),
  activites: genereGestionValeursMultiples("activites"),
  trancheCA: gestionValeursSimples,
  trancheNombreEmployes: gestionValeursSimples,
  typeStructure: gestionValeursSimples,
};

export const genereGestionEtapePrecedenteSiExiste = (
  precedentHandler: React.MouseEventHandler,
  numeroEtapeCourante: number,
) => (numeroEtapeCourante == 0 ? noRefClick : precedentHandler);

export const genereGestionSauvePuisEtapeSuivante: (
  suivantHandler: React.MouseEventHandler,
  sauveHandler: () => Promise<string>,
) => React.MouseEventHandler =
  (
    suivantHandler: React.MouseEventHandler,
    sauveHandler: () => Promise<string>,
  ) =>
  (e) => {
    sauveHandler().then(() => suivantHandler(e));
  };

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
