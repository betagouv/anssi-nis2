import { fc } from "@fast-check/vitest";
import { describe, expect, it } from "vitest";
import { UnionPetitMoyenGrand } from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/fabriques/DonneesFormulaire.fabrique";
import {
  contientPetiteEntreprise,
  predicatDonneesFormulaire,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats";
import { fabriqueArbSingleton } from "../utilitaires/manipulationArbitraires";

describe("predicatDonneesFormulaire", () => {
  describe("Champ contient", () => {
    it("Predicat contient", () => {
      const donnees = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: ["infrastructureNumerique"],
      };
      expect(donnees).toSatisfy(
        predicatDonneesFormulaire
          .champs("secteurActivite")
          .contient("infrastructureNumerique"),
      );
      expect(donnees).not.toSatisfy(
        predicatDonneesFormulaire
          .champs("secteurActivite")
          .contient("fournisseursNumeriques"),
      );
    });
  });

  describe(contientPetiteEntreprise, () => {
    it("est vrai pour petit / petit", () => {
      const donnees = fabriqueDonneesFormulaire({
        trancheNombreEmployes: ["petit"],
        trancheChiffreAffaire: ["petit"],
      });
      expect(contientPetiteEntreprise(donnees)).toBeTruthy();
    });

    const moyenGrand: UnionPetitMoyenGrand[] = ["moyen", "grand"];
    const petitMoyenGrand: UnionPetitMoyenGrand[] = ["petit", "moyen", "grand"];
    const verifieDonneesNeContientPasPetiteEntreprise = (
      trancheA: UnionPetitMoyenGrand[],
      trancheB: UnionPetitMoyenGrand[],
    ) =>
      !contientPetiteEntreprise(
        fabriqueDonneesFormulaire({
          trancheNombreEmployes: trancheA,
          trancheChiffreAffaire: trancheB,
        }),
      );
    it("est faux pour toute tranche employes moyen et grand", () => {
      fc.assert(
        fc.property(
          fabriqueArbSingleton(moyenGrand),
          fabriqueArbSingleton(petitMoyenGrand),
          verifieDonneesNeContientPasPetiteEntreprise,
        ),
        { verbose: true },
      );
    });
    it("est faux pour toute tranche CA moyen et grand", () => {
      fc.assert(
        fc.property(
          fabriqueArbSingleton(petitMoyenGrand),
          fabriqueArbSingleton(moyenGrand),
          verifieDonneesNeContientPasPetiteEntreprise,
        ),
        { verbose: true },
      );
    });
  });
});
