import { createContext, Reducer } from "react";

import { DonneesFormulaireSimulateur } from "./Services/Simulateur/donneesFormulaire.ts";
import {
  BoutonsNavigation,
  SimulateurDonneesFormulaireActions,
} from "./Components/Simulateur/props.ts";
import { ActionsBoutonNavigation } from "./Components/Simulateur/reducers.ts";

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
