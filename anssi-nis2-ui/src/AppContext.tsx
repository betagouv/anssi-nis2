import { createContext } from "react";

import { Contexte } from "./Services/contexte";

export const AppContext = createContext<Contexte>({} as Contexte);
