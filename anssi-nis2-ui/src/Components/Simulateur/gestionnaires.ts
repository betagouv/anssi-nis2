import { FormValueHandler } from "../../Props.ts";
import {
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/Simulateur/FormData.ts";
import React from "react";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";

import { CollectionInformationsEtapes } from "./props.ts";

export const handleSingleValue = (value: string) => [value];
export const generateHandlerMultipleValues =
  (name: SimulateurFieldNames) =>
  (value: string, donneesFormulaire: SimulateurFormData) => {
    if (donneesFormulaire[name].indexOf(value) === -1) {
      return [...donneesFormulaire[name], value];
    }
    return donneesFormulaire[name].filter((content) => content !== value);
  };

export const fieldHandlers: Record<SimulateurFieldNames, FormValueHandler> = {
  etatMembre: generateHandlerMultipleValues("etatMembre"),
  secteurActivite: generateHandlerMultipleValues("secteurActivite"),
  sousSecteurActivite: generateHandlerMultipleValues("sousSecteurActivite"),
  activites: generateHandlerMultipleValues("activites"),
  trancheCA: handleSingleValue,
  trancheNombreEmployes: handleSingleValue,
  typeStructure: handleSingleValue,
};
export const genereGestionEtapePrecedenteSiExiste = (
  precedentHandler: React.MouseEventHandler,
  numeroEtapeCourante: number,
) => (numeroEtapeCourante == 0 ? noRefClick : precedentHandler);
const genereGestionSauvePuisEtapeSuivante =
  (suivantHandler: React.MouseEventHandler, sauveHandler: Promise<string>) =>
  (e: React.MouseEvent<Element, MouseEvent>) => {
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
