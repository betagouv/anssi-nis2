import { describe, expect, it } from "vitest";
import { resultatReguleOSE } from "../../src/Domain/Simulateur/fabriques/Regulation.fabrique";
import { resultatIncertain } from "../../src/Domain/Simulateur/Regulation.constantes";
import {
  definitivementRegule,
  evalueRegulationEtatReponseOse,
  fabriqueAiguillageDonneesEvaluation,
  qualifieDesignationOse,
  ResultatEvaluationRegulation,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definition";
import { UnionReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";

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
  describe("Regulation Etat Reponse", () => {
    it("OSE = oui", () => {
      const reponse: UnionReponseEtat = {
        _tag: "DesignationOperateurServicesEssentiels",
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "oui",
        },
      };
      const resultatAttendu: ResultatEvaluationRegulation = {
        _tag: "ResultatEvaluationRegulationDefinitif",
        etapeEvaluee: "DesignationOperateurServicesEssentiels",
        ...resultatReguleOSE,
      };
      const resultatObtenu = evalueRegulationEtatReponseOse(reponse);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
    it("OSE = non", () => {
      const reponse: UnionReponseEtat = {
        _tag: "DesignationOperateurServicesEssentiels",
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "non",
        },
      };
      const resultatAttendu: ResultatEvaluationRegulation = {
        _tag: "ResultatEvaluationRegulationEnSuspens",
        etapeEvaluee: "DesignationOperateurServicesEssentiels",
        ...resultatIncertain,
      };
      const resultatObtenu = evalueRegulationEtatReponseOse(reponse);
      expect(resultatObtenu).toStrictEqual(resultatAttendu);
    });
  });
});
