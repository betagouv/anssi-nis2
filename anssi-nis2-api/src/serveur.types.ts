import { AdaptateurPersistance } from "./adaptateurs/adaptateurPersistance";
import { AdaptateurJournal } from "./adaptateurs/adaptateurJournal";
import { AdaptateurCrm } from "./adaptateurs/adaptateurCrm";
import { AdaptateurGestionErreur } from "./adaptateurs/adaptateurGestionErreur";
import { AdaptateurProtection } from "./adaptateurs/adaptateurProtection";
import { AdaptateurEligibilite } from "./adaptateurs/adaptateurEligibilite";

export type ServeurMonEspaceNIS2 = {
  ecoute: (callbackSucces?: () => void) => void;
  arrete: () => void;
};

export type DependanceServeur = {
  adaptateurCrm: AdaptateurCrm;
  adaptateurGestionErreur: AdaptateurGestionErreur;
  adaptateurJournal: AdaptateurJournal;
  adaptateurPersistance: AdaptateurPersistance;
  adaptateurProtection: AdaptateurProtection;
  adaptateurEligibilite: AdaptateurEligibilite;
};
