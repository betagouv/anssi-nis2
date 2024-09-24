import { AdaptateurPersistance } from "./adaptateurs/adaptateurPersistance";

export type ServeurMonEspaceNIS2 = {
  ecoute: (callbackSucces?: () => void) => void;
  arrete: () => void;
};

export enum ImplementationDuServeur {
  Nest,
  Express,
}

export type DependanceServeur = {
  adaptateurPersistance: AdaptateurPersistance;
};
