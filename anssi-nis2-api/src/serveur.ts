import { creeServeurExpress } from "./serveur.express";
import { DependanceServeur, ServeurMonEspaceNIS2 } from "./serveur.types";

export async function creeServeur(
  port: number,
  dependances?: DependanceServeur,
): Promise<ServeurMonEspaceNIS2> {
  return creeServeurExpress(port, dependances);
}
