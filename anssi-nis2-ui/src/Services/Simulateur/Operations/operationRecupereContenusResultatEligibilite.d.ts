import { ContenusResultatEligibilite } from "../Props/contenusResultatEligibilite";
import { ResultatEligibilite } from "../../../../../anssi-nis2-domain/src/Simulateur/Eligibilite.definitions.ts";

export type OperationRecupereContenusResultatEligibilite = (
  statutEligibiliteNIS2: ResultatEligibilite,
) => ContenusResultatEligibilite;
