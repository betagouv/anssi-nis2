import { createContext } from "react";

import { Contexte } from "../contexte";

export const AppContext = createContext<Contexte>({} as Contexte);
