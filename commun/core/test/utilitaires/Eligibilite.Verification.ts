import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { Eligibilite } from "../../src/Domain/Simulateur/Eligibilite.constantes";
import { ResultatEligibilite } from "../../src/Domain/Simulateur/Eligibilite.definitions";
import { calculeEligibilite } from "../../src/Domain/Simulateur/services/Eligibilite/Eligibilite.operations";
import { verifieQue } from "./assure";

export const VerifieEligibilite = Object.values(Eligibilite).reduce(
  (acc, nom) => ({
    ...acc,
    [nom]: verifieQue(calculeEligibilite).renvoieToujours(Eligibilite[nom])
      .quelqueSoit,
  }),
  {}
) as Record<
  ResultatEligibilite,
  (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => void
>;
