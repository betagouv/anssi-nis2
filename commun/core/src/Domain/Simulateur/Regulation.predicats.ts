import {
  Regulation,
  RegulationEntite,
  ResultatRegulationEntite,
  ResultatRegulationPositif,
} from "./Regulation.definitions";
import { EtatRegulationDefinitif } from "./services/Eligibilite/EtatRegulation.definitions";

export const estRegule = (regulation: RegulationEntite) =>
  regulation === Regulation.Regule;
export const estIncertain = (regulation: string) =>
  regulation === Regulation.Incertain;
export const estResultatRegulationPositif = <
  T extends ResultatRegulationEntite | EtatRegulationDefinitif,
>(
  res: ResultatRegulationPositif | T,
): res is ResultatRegulationPositif => res.decision === "Regule";
