import { Middleware } from "../../serveur.types";

export const middlewareFantaisie = (): Middleware => ({
  modeMaintenance: (_req, _res, suite) => suite(),
});
