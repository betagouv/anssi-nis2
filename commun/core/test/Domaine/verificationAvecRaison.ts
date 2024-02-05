import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import {
  FabriqueCause,
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

const fabriqueCarSatisfait = (
  validation: (d: ResultatRegulationEntite) => boolean,
  arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>,
) =>
  verifieQue(calculeRegulationEntite)
    .satisfait(validation)
    .quelqueSoit(arbitraire);

const fabriqueValidationQuelqueSoit = (
  pourRegulation: RegulationEntite,
  fabriqueCause: FabriqueCause,
  validation: Partial<DonneesFormulaireSimulateur>,
  arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>,
) => {
  verifieQue(calculeRegulationEntite)
    .renvoieToujours({
      decision: pourRegulation,
      ...fabriqueCause(validation as Partial<DonneesFormulaireSimulateur>),
    })
    .quelqueSoit(arbitraire);
};

const fabriqueVerif =
  (
    pourRegulation: RegulationEntite,
    fabriqueCause: FabriqueCause,
  ): VerificationAvecRaison =>
  (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => {
    if (pourRegulation !== Regulation.Regule)
      verifieQue(calculeRegulationEntite)
        .satisfait((r) => r.decision === pourRegulation)
        .quelqueSoit(arbitraire);
    return {
      car: (validation) => {
        if (typeof validation === "function") {
          fabriqueCarSatisfait(validation, arbitraire);
        } else {
          fabriqueValidationQuelqueSoit(
            pourRegulation,
            fabriqueCause,
            validation,
            arbitraire,
          );
        }
        return V[`est${pourRegulation}`];
      },
    };
  };

const estRegule = fabriqueVerif(Regulation.Regule, (d) => ({ causes: d }));
export const V: Record<`est${RegulationEntite}`, VerificationAvecRaison> = {
  estRegule,
  estNonRegule: fabriqueVerif(Regulation.NonRegule, () => ({})),
  estIncertain: fabriqueVerif(Regulation.Incertain, () => ({})),
};
