import { SendFormData } from "./Simulateur/Workflow/appelsApi";
import { DonneesFormulaireSimulateur } from "../Domaine/Simulateur/DonneesFormulaire.ts";
import { SimulateurDonneesFormulaireActions } from "./Simulateur/Props/donneesFormulaire";
import { BoutonsNavigation } from "./Simulateur/Props/boutonsNavigation.ts";
import { ActionsBoutonNavigation } from "./Simulateur/Reducteurs.ts";

export type Context = {
  sendFormData: SendFormData;
  simulateur: {
    reducerFormData: Reducer<
      DonneesFormulaireSimulateur,
      SimulateurDonneesFormulaireActions
    >;
    reducerBoutons: Reducer<BoutonsNavigation, ActionsBoutonNavigation>;
  };
};