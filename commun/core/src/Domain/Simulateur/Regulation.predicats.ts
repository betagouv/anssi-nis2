import { Regulation, RegulationEntite } from "./Regulation.definitions";

export const estRegule = (regulation: RegulationEntite) =>
  regulation === Regulation.Regule;
export const estIncertain = (regulation: string) =>
  regulation === Regulation.Incertain;
