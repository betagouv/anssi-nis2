import { describe, expect, it } from "vitest";
import { recupereContenusResultatEligibilite } from "../../../src/Services/Simulateur/recupereContenusResultatEligibilite";
import {
  contenusResultatEligiblePetitEntreprise,
  contenusResultatNonEligible,
} from "../../../src/References/contenusResultatEligibilite";
import { Eligibilite } from "../../../src/Domaine/Simulateur/Eligibilite.definitions";

describe(recupereContenusResultatEligibilite, () => {
  it("retourne les contenus pour éligible lorsque le résultat est éligible", () => {
    const resultatEligibilite = Eligibilite.EligiblePetiteEntreprise;
    const contenusAttendus = contenusResultatEligiblePetitEntreprise;
    const contenusObtenus =
      recupereContenusResultatEligibilite(resultatEligibilite);

    expect(contenusObtenus).toStrictEqual(contenusAttendus);
  });

  it("retourne les contenus pour non-éligible lorsque le résultat est non-éligible", () => {
    const resultatEligibilite = Eligibilite.NonEligible;
    const contenusAttendus = contenusResultatNonEligible;
    const contenusObtenus =
      recupereContenusResultatEligibilite(resultatEligibilite);

    expect(contenusObtenus).toStrictEqual(contenusAttendus);
  });
});
