import { ResultatEligibilite } from "../../../../../commun/core/src/Domain/Simulateur/Eligibilite.definitions.ts";
import { ContenusResultatEligibilite } from "../Props/ContenusResultatEligibilite.declaration.ts";

export type RecupereContenusResultatEligibilite = (
  statutEligibiliteNIS2: ResultatEligibilite,
) => ContenusResultatEligibilite;
