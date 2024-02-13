import { describe, expect, it } from "vitest";
import {
  definitivementRegule,
  fabriqueAiguillageDonneesEvaluation,
  qualifieDesignationOse,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definition";

describe("qualifieEtatRegulation", () => {
  describe("qualifieDesignationOse", () => {
    it("qualifieDesignationOse = oui renvoie définitivement régulé", () => {
      const resultatAttendu = definitivementRegule();
      const donneesInitiales = fabriqueAiguillageDonneesEvaluation(
        "DesignationOperateurServicesEssentiels",
        {
          designationOperateurServicesEssentiels: "oui",
        },
      );
      const resultatObtenu = qualifieDesignationOse(donneesInitiales);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    it("qualifieDesignationOse = oui renvoie des données à qualifier pour appartenance UE", () => {
      const resultatAttendu = fabriqueAiguillageDonneesEvaluation(
        "AppartenancePaysUnionEuropeenne",
        { appartenancePaysUnionEuropeenne: "france" },
      );
      const donneesInitiales = fabriqueAiguillageDonneesEvaluation(
        "DesignationOperateurServicesEssentiels",
        {
          designationOperateurServicesEssentiels: "non",
        },
      );
      const resultatObtenu = qualifieDesignationOse(donneesInitiales);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
  });
});
