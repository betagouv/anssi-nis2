import { OperationRecupereContenusResultatEligibilite } from "./Operations/operationRecupereContenusResultatEligibilite";
import { contenusResultats } from "../../References/contenusResultatEligibilite.ts";

export const recupereContenusResultatEligibilite: OperationRecupereContenusResultatEligibilite =
  (statutEligibiliteNIS2) => contenusResultats[statutEligibiliteNIS2];
