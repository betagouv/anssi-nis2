import { creeServeurNest } from "./serveur.nest";
import { creeServeurExpress } from "./serveur.express";
import { ImplementationDuServeur, ServeurMonEspaceNIS2 } from "./serveur.types";

export async function creeServeur(
  port: number,
  implementation: ImplementationDuServeur,
): Promise<ServeurMonEspaceNIS2> {
  return implementation === ImplementationDuServeur.Nest
    ? creeServeurNest(port)
    : creeServeurExpress(port);
}
