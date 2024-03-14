import { fc } from "@fast-check/vitest";
import { ens } from "../../../../utils/services/sets.operations";
import { AppartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursappartenancePaysUnionEuropeenne } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import { LocalisationsServices } from "../../../src/Domain/Simulateur/services/Eligibilite/LocalisationsActivites.definitions";
import { Arbitraire as A } from "../../utilitaires/Arbitraires.operations";

export const arbLocalisationsServices_ContientFrance: fc.Arbitrary<LocalisationsServices> =
  A.enchaine((arb: AppartenancePaysUnionEuropeenne[]) =>
    fc.constant({
      localisationFournitureServicesNumeriques:
        ens<AppartenancePaysUnionEuropeenne>(...arb, "france"),
    }),
  )(fc.subarray([...ValeursappartenancePaysUnionEuropeenne]));
export const arbLocalisationsServices_ContientAutreUE_SansFrance: fc.Arbitrary<LocalisationsServices> =
  A.enchaine((arb: AppartenancePaysUnionEuropeenne[]) =>
    fc.constant({
      localisationFournitureServicesNumeriques:
        ens<AppartenancePaysUnionEuropeenne>(...arb, "autre"),
    }),
  )(fc.subarray(["horsue"]));
export const arbLocalisationsServices_ContientUniquementHorsUE: fc.Arbitrary<LocalisationsServices> =
  fc.constant({
    localisationFournitureServicesNumeriques:
      ens<AppartenancePaysUnionEuropeenne>("horsue"),
  });
