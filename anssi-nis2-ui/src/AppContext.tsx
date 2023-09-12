import { createContext } from "react";

import { SimulateurFormData } from "./Services/Simulateur/FormData.ts";

export type SendFormData = (formData: SimulateurFormData) => Promise<string>;
export type Context = {
  sendFormData: SendFormData;
};

export const AppContext = createContext<Context>({} as Context);
