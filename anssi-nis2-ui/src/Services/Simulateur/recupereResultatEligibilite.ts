import { OperationRecupereContenusResultatEligibilite } from "./Operations/operationRecupereContenusResultatEligibilite";
import { contenusResultatEligible } from "../../References/contenusResultatEligibilite.ts";

export const recupereResultatEligibilite: OperationRecupereContenusResultatEligibilite =
  () => contenusResultatEligible;
