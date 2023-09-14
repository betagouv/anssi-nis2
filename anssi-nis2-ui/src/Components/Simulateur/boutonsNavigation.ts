import React from "react";
import { CollectionInformationsEtapes } from "./collectionInformationsEtapes.ts";
import { ActionsBoutonNavigation } from "./reducers.ts";

export class BoutonsNavigation {
  constructor(
    public readonly precedent: React.MouseEventHandler,
    public readonly suivant: React.MouseEventHandler,
  ) {}
}

export const prepareGestionBoutonSuivant = (
  listeEtapes: CollectionInformationsEtapes,
  numeroEtape: number,
  action: (val: number) => void,
): ActionsBoutonNavigation => {
  const gestionSuivantParDefaut = (e: React.MouseEvent) => {
    e.preventDefault();
    listeEtapes.siExiste(numeroEtape + 1, (val) => action(val));
  };

  return {
    bouton: "suivant",
    newHandler: gestionSuivantParDefaut,
  };
};

export const prepareGestionBoutonPrecedent = (
  listeEtapes: CollectionInformationsEtapes,
  numeroEtape: number,
  action: (val: number) => void,
): ActionsBoutonNavigation => {
  const gestionPrecedentParDefaut = (e: React.MouseEvent) => {
    e.preventDefault();
    listeEtapes.siExiste(numeroEtape - 1, (val) => action(val));
  };
  return {
    bouton: "precedent",
    newHandler: gestionPrecedentParDefaut,
  };
};
