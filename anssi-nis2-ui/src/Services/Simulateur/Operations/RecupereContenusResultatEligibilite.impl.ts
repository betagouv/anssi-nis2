import { ResultatEligibilite } from "../../../../../commun/core/src/Domain/Simulateur/Eligibilite.definitions.ts";
import { RecupereContenusResultatEligibilite } from "./RecupereContenusResultatEligibilite.declarations.ts";
import { contenusResultats } from "../../../References/contenusResultatEligibilite.ts";

export const recupereContenusResultatEligibilite: RecupereContenusResultatEligibilite =
  (statutEligibiliteNIS2: ResultatEligibilite) =>
    contenusResultats[statutEligibiliteNIS2];
