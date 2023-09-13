import { createContext, Reducer } from "react";

import { SimulateurFormData } from "./Services/Simulateur/FormData.ts";
import {
  BoutonsNavigation,
  SimulateurDonneesFormulaireActions,
} from "./Components/Simulateur/simulateurProps.ts";
import { ActionsBoutonNavigation } from "./Components/Simulateur/reducers.ts";

export type SendFormData = (formData: SimulateurFormData) => Promise<string>;
export type Context = {
  sendFormData: SendFormData;
  simulateur: {
    reducerFormData: Reducer<
      SimulateurFormData,
      SimulateurDonneesFormulaireActions
    >;
    reducerBoutons: Reducer<BoutonsNavigation, ActionsBoutonNavigation>;
  };
};

export const AppContext = createContext<Context>({} as Context);
