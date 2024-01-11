import { NomsChampsSimulateur } from "../../../Domaine/Simulateur/DonneesFormulaire.definitions.ts";

import { ValeurChampSimulateur } from "../../../Domaine/Simulateur/ChampsSimulateur.valeurs.ts";

type SimulateurDonneesFormulaireActionType = "checkSingle" | "checkMulti";
export type SimulateurDonneesFormulaireActions = {
  type: SimulateurDonneesFormulaireActionType;
  name: NomsChampsSimulateur;
  newValue: ValeurChampSimulateur;
};
