import React from "react";
import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import { ActionsBoutonNavigation } from "./reducers.ts";

export class BoutonsNavigation {
  constructor(
    public readonly precedent: React.MouseEventHandler,
    public readonly suivant: React.MouseEventHandler,
  ) {}
}

const prepareGestionBouton = (
  bouton: "precedent" | "suivant",
  nouveauNumeroEtape: number,
  listeEtapes: CollectionInformationsEtapes,
  action: (val: number) => void,
): ActionsBoutonNavigation => {
  const gestionSuivantParDefaut = (e: React.MouseEvent) => {
    e.preventDefault();
    listeEtapes.siExiste(nouveauNumeroEtape, (val) => action(val));
  };

  return {
    bouton: bouton,
    newHandler: gestionSuivantParDefaut,
  };
};

export const prepareGestionBoutonSuivant = (
  listeEtapes: CollectionInformationsEtapes,
  numeroEtape: number,
  action: (val: number) => void,
): ActionsBoutonNavigation =>
  prepareGestionBouton("suivant", numeroEtape + 1, listeEtapes, action);

export const prepareGestionBoutonPrecedent = (
  listeEtapes: CollectionInformationsEtapes,
  numeroEtape: number,
  action: (val: number) => void,
): ActionsBoutonNavigation =>
  prepareGestionBouton("precedent", numeroEtape - 1, listeEtapes, action);
