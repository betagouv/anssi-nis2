import { AdaptateurPersistance } from "./adaptateurs/adaptateurPersistance";
import { AdaptateurJournal } from "./adaptateurs/adaptateurJournal";

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
  adaptateurJournal: AdaptateurJournal;
};
