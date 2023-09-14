import React from "react";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Services/Simulateur/donneesFormulaire.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";

import { CollectionInformationsEtapes } from "./collectionInformationsEtapes.ts";

export type GenerateurSoumissionEtape = (
  limiteConditions: (i: number) => boolean,
  nouvelleEtape: (etape: number) => number,
) => React.MouseEventHandler;

export type GestionValeursFormulaire = (
  value: string,
  donneesFormulaire: DonneesFormulaireSimulateur,
) => string[];

export const gestionValeursSimples = (value: string) => [value];

export const genereGestionValeursMultiples =
  (name: NomsChampsSimulateur) =>
  (value: string, donneesFormulaire: DonneesFormulaireSimulateur) => {
    if (donneesFormulaire[name].indexOf(value) === -1) {
      return [...donneesFormulaire[name], value];
    }
    return donneesFormulaire[name].filter((content) => content !== value);
  };

export const fieldHandlers: Record<
  NomsChampsSimulateur,
  GestionValeursFormulaire
> = {
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

const genereGestionSauvePuisEtapeSuivante: (
  suivantHandler: React.MouseEventHandler,
  sauveHandler: Promise<string>,
) => React.MouseEventHandler =
  (suivantHandler: React.MouseEventHandler, sauveHandler: Promise<string>) =>
  (e) => {
    sauveHandler.then(() => suivantHandler(e));
  };

export const genereGestionEtapeSuivanteSiExiste = (
  numeroEtapeCourante: number,
  collectionEtapes: CollectionInformationsEtapes,
  suivantHandler: React.MouseEventHandler,
  sauveHandler: () => Promise<string>,
) => {
  return collectionEtapes.estAvantDerniereEtape(numeroEtapeCourante)
    ? genereGestionSauvePuisEtapeSuivante(suivantHandler, sauveHandler())
    : suivantHandler;
};
