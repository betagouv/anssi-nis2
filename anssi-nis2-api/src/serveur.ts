import { creeServeurNest } from "./serveur.nest";
import { creeServeurExpress } from "./serveur.express";
import {
  DependanceServeur,
  ImplementationDuServeur,
  ServeurMonEspaceNIS2,
} from "./serveur.types";

export async function creeServeur(
  port: number,
  implementation: ImplementationDuServeur,
  dependances?: DependanceServeur,
): Promise<ServeurMonEspaceNIS2> {
  return implementation === ImplementationDuServeur.Nest
    ? creeServeurNest(port)
    : creeServeurExpress(port, dependances);
}
