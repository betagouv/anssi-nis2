import { describe, it } from "vitest";
import { fc } from "@fast-check/vitest";
import { auMoinsUneActiviteInfraNumConcernee } from "../../src/Domain/Simulateur/Activite.predicats";
import { verifieQue } from "../utilitaires/assure";
import { ValeursActivites } from "../../src/Domain/Simulateur/Activite.valeurs";

describe(auMoinsUneActiviteInfraNumConcernee, () => {
  it("est vrai pour toutes donnees formulaire contenant prestataireServiceConfianceQualifie", () => {
    const arbActivites = fc
      .subarray(ValeursActivites)
      .filter((a) => a.includes("prestataireServiceConfianceQualifie"));
    verifieQue(auMoinsUneActiviteInfraNumConcernee)
      .estToujoursVrai()
      .quelqueSoit(arbActivites);
  });
});
