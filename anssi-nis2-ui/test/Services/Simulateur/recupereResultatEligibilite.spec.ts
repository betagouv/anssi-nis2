import { describe, expect, it } from "vitest";
import { recupereContenusResultatEligibilite } from "../../../src/Services/Simulateur/recupereContenusResultatEligibilite";
import { Eligibilite } from "../../../src/Domaine/Simulateur/resultatEligibilite";
import {
  contenusResultatEligiblePetitEntreprise,
  contenusResultatNonEligible,
} from "../../../src/References/contenusResultatEligibilite";

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
