import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import {
  CausesRegulation,
  Regulation,
  RegulationEntite,
  ResultatRegulationEntite,
} from "../../src/Domain/Simulateur/Regulation.definitions";
import { calculeRegulationEntite } from "../../src/Domain/Simulateur/services/Regulation/Regulation.operations";
import { verifieQue } from "../utilitaires/assure";

type VerificationAvecRaison = (
  arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>,
) => {
  car: (
    validation:
      | Partial<DonneesFormulaireSimulateur>
      | ((d: ResultatRegulationEntite) => boolean),
  ) => VerificationAvecRaison;
};
const fabriqueVerif =
  (
    pourRegulation: RegulationEntite,
    fabriqueCause: (d: Partial<DonneesFormulaireSimulateur>) => {
      causes: CausesRegulation;
    },
  ): VerificationAvecRaison =>
  (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => ({
    car: (validation) => {
      if (typeof validation === "function") {
        verifieQue(calculeRegulationEntite)
          .satisfait(validation)
          .quelqueSoit(arbitraire);
      } else {
        verifieQue(calculeRegulationEntite)
          .renvoieToujours({
            decision: Regulation.Regule,
            ...fabriqueCause(
              validation as Partial<DonneesFormulaireSimulateur>,
            ),
          })
          .quelqueSoit(arbitraire);
      }
      return V[`est${pourRegulation}`];
    },
  });

const estRegule = fabriqueVerif(Regulation.Regule, (d) => ({ causes: d }));
export const V: Record<`est${RegulationEntite}`, VerificationAvecRaison> = {
  estRegule,
  estNonRegule: (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => {
    return {
      car: () => {
        verifieQue(calculeRegulationEntite)
          .renvoieToujours({
            decision: "NonRegule",
          })
          .quelqueSoit(arbitraire);
        return V.estNonRegule;
      },
    };
  },
  estIncertain: (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => {
    return {
      car: () => {
        verifieQue(calculeRegulationEntite)
          .renvoieToujours({
            decision: "Incertain",
          })
          .quelqueSoit(arbitraire);
        return V.estIncertain;
      },
    };
  },
};
