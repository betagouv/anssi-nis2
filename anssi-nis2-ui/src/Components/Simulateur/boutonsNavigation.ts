import React from "react";
import { CollectionInformationsEtapes } from "./collectionInformationsEtapes.ts";
import { ActionsBoutonNavigation } from "./reducers.ts";

export class BoutonsNavigation {
  constructor(
    public readonly precedent: React.MouseEventHandler,
    public readonly suivant: React.MouseEventHandler,
  ) {}
}

export const prepareGestionBoutonsNavigation = (
  listeEtapes: CollectionInformationsEtapes,
  numeroEtape: number,
  action: (val: number) => void,
  propageHandlerClickBouton: React.Dispatch<ActionsBoutonNavigation>,
) => {
  const gestionSuivantParDefaut = (e: React.MouseEvent) => {
    e.preventDefault();
    listeEtapes.siExiste(numeroEtape + 1, (val) => action(val));
  };

  const gestionPrecedentParDefaut = (e: React.MouseEvent) => {
    e.preventDefault();
    listeEtapes.siExiste(numeroEtape - 1, (val) => action(val));
  };
  propageHandlerClickBouton({
    bouton: "suivant",
    newHandler: gestionSuivantParDefaut,
  });
  propageHandlerClickBouton({
    bouton: "precedent",
    newHandler: gestionPrecedentParDefaut,
  });
};
