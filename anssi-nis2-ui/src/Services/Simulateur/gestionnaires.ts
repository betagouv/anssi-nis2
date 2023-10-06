import React from "react";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";

import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import { SimulateurDonneesFormulaireActions } from "./props.ts";

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
  designeOSE: gestionValeursSimples,
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
  sauveHandler: () => Promise<string>,
) => React.MouseEventHandler =
  (
    suivantHandler: React.MouseEventHandler,
    sauveHandler: () => Promise<string>,
  ) =>
  (e) => {
    sauveHandler().then(() => suivantHandler(e));
  };

export const genereGestionEtapeSuivanteSiExiste = (
  numeroEtapeCourante: number,
  collectionEtapes: CollectionInformationsEtapes,
  suivantHandler: React.MouseEventHandler,
  sauveHandler: () => Promise<string>,
) => {
  return collectionEtapes.estDerniereEtape(numeroEtapeCourante)
    ? genereGestionSauvePuisEtapeSuivante(suivantHandler, sauveHandler)
    : suivantHandler;
};
export const fabriqueGestionChangementSimple =
  (
    propageActionSimulateur: React.Dispatch<SimulateurDonneesFormulaireActions>,
  ) =>
  (evt: React.ChangeEvent<HTMLInputElement>) => {
    propageActionSimulateur({
      type: "checkSingle",
      name: evt.target.name as NomsChampsSimulateur,
      newValue: evt.target.value,
    });
  };
