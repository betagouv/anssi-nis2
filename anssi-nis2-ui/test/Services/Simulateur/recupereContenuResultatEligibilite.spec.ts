import { describe, expect, it } from "vitest";
import { ValeursResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Eligibilite.valeurs";
import { recupereContenusResultatEligibilite } from "../../../src/Services/Simulateur/Operations/RecupereContenusResultatEligibilite.impl";
import { contenusResultats } from "../../../src/References/contenusResultatEligibilite";

describe(recupereContenusResultatEligibilite, () => {
  it.each(ValeursResultatEligibilite)(
    `"Renvoie le contenu adequat pour le résultat %s"`,
    (valeur) => {
      const contenusAttendus = contenusResultats[valeur];
      const contenusObtenus = recupereContenusResultatEligibilite(valeur);

      expect(contenusObtenus).toStrictEqual(contenusAttendus);
    },
  );
});
