import { createContext } from "react";
import { Context } from "./Services/context";

export const AppContext = createContext<Context>({} as Context);
