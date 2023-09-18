import { createContext, Reducer } from "react";

import { DonneesFormulaireSimulateur } from "./Services/Simulateur/donneesFormulaire.ts";
import { SimulateurDonneesFormulaireActions } from "./Services/Simulateur/props.ts";
import { ActionsBoutonNavigation } from "./Services/Simulateur/reducers.ts";
import { BoutonsNavigation } from "./Services/Simulateur/boutonsNavigation.ts";

export type SendFormData = (
  formData: DonneesFormulaireSimulateur,
) => Promise<string>;
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

export const AppContext = createContext<Context>({} as Context);
