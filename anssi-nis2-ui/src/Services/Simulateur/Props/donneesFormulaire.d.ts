import { NomsChampsSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";

import { ValeurChampSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/ChampsSimulateur.valeurs.ts";

type SimulateurDonneesFormulaireActionType = "checkSingle" | "checkMulti";
export type SimulateurDonneesFormulaireActions = {
  type: SimulateurDonneesFormulaireActionType;
  name: NomsChampsSimulateur;
  newValue: ValeurChampSimulateur;
};
