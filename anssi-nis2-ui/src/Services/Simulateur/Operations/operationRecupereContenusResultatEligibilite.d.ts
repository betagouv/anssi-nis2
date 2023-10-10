import { ResultatEligibilite } from "../../../Domaine/Simulateur/resultatEligibilite.ts";
import { ContenusResultatEligibilite } from "../contenusResultatEligibilite";

export type OperationRecupereContenusResultatEligibilite = (
  statutEligibiliteNIS2: ResultatEligibilite,
) => ContenusResultatEligibilite;
