import { Middleware } from "./serveur.types";
import { RequestHandler } from "express";
import * as path from "node:path";

export function middleware(): Middleware {
  const modeMaintenance: RequestHandler = (_req, reponse, suite) => {
    const estEnModeMaintenance = process.env.MODE_MAINTENANCE_ACTIF === "true";
    if (!estEnModeMaintenance) return suite();

    reponse.sendFile(
      path.join(__dirname, "../../../statique/maintenance.html"),
    );
  };

  return { modeMaintenance };
}
