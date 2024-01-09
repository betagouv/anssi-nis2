import { fc } from "@fast-check/vitest";
import { describe, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";

import { RegulationEntite } from "../../src/Domain/Simulateur/Regulation.definitions";

import { calculeRegulationEntite } from "../../src/Domain/Simulateur/services/Regulation/Regulation.operations";
import { verifieQue } from "../utilitaires/assure";
import { arbForm } from "./arbitraires/arbitrairesSimulateur";

type VerificationAvecRaison = (
  arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>,
) => {
  car: (d: Partial<DonneesFormulaireSimulateur>) => void;
};
type VerificationSansRaison = (
  arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>,
) => void;

const V: Record<
  `est${RegulationEntite}`,
  VerificationAvecRaison | VerificationSansRaison
> = {
  estRegule: (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => {
    return {
      car: (d: Partial<DonneesFormulaireSimulateur>) =>
        verifieQue(calculeRegulationEntite)
          .renvoieToujours({
            decision: "Regule",
            causes: d,
            donnees: fabriqueDonneesFormulaire(d),
          })
          .quelqueSoit(arbitraire),
    };
  },
  estNonRegule: (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => {
    return {
      car: () =>
        verifieQue(calculeRegulationEntite)
          .renvoieToujours({
            decision: "NonRegule",
          })
          .quelqueSoit(arbitraire),
    };
  },
  estIncertain: (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => {
    verifieQue(calculeRegulationEntite)
      .renvoieToujours({
        decision: "Incertain",
      })
      .quelqueSoit(arbitraire);
  },
};

describe(calculeRegulationEntite, () => {
  describe("Entité OSE pour NIS1", () => {
    it("de petite taille est toujours éligible", () => {
      V.estRegule(arbForm.designeOSE.petit)?.car({
        designeOperateurServicesEssentiels: ["oui"],
      });
    });
    // it("de moyenne ou grande taille est toujours éligible", () => {
    //   V.EligibleMoyenneGrandeEntreprise(arbForm.designeOSE.moyenGrand);
    // });
  });

  describe("Incertain", () => {
    it("de petite taille est toujours éligible", () => {
      V.estIncertain(
        arbForm.nonValide.donneeAbsente.designeOperateurServicesEssentiels,
      );
    });
  });
});
