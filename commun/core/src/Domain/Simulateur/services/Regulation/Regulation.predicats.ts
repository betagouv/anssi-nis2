import {
  ResultatRegulationEntite,
  ResultatRegulationPositif,
} from "../../Regulation.definitions";
import { EtatRegulationDefinitif } from "../Eligibilite/EtatRegulation.definitions";

export const estResultatRegulationPositif = <
  T extends ResultatRegulationEntite | EtatRegulationDefinitif,
>(
  res: ResultatRegulationPositif | T,
): res is ResultatRegulationPositif => res.decision === "Regule";
