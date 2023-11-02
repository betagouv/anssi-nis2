import { ContenusResultatEligibilite } from "../Props/contenusResultatEligibilite";
import { ResultatEligibilite } from "../../../Domaine/Simulateur/Eligibilite.definitions.ts";

export type OperationRecupereContenusResultatEligibilite = (
  statutEligibiliteNIS2: ResultatEligibilite,
) => ContenusResultatEligibilite;
