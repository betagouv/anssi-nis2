import { describe, it, expect } from "vitest";
import {
  toujoursFaux,
  toujoursVrai,
} from "../../../utils/services/commun.predicats";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique";
import { fabriquesInformationsEtapes } from "../../src/Domain/Simulateur/fabriques/InformationsEtape.fabrique";
import {
  CapacitesEtapeFormulaire,
  EtapeExistante,
  InformationEtapeForm,
  VariantesEtape,
} from "../../src/Domain/Simulateur/InformationsEtape";
import { exInformationEtape } from "./exemples/informationEtape.exemples";
import { fausseValidationReponse } from "./exemples/InformationEtape.faussaire";

describe("fabriquesInformationsEtapes", () => {
  describe(fabriquesInformationsEtapes.variantes, () => {
    const resultatAttendu: EtapeExistante & CapacitesEtapeFormulaire = {
      varianteAffichee: expect.any(Function),
      longueurComptabilisee: 1,
      type: "variante",
      existe: true,
      titre: "Etape Form 1",
      estIgnoree: toujoursFaux,
      remplitContitionSousEtape: toujoursFaux,
      validationReponses: fausseValidationReponse,
      fabriqueValidationReponses: expect.any(Function),
    };
    it("initialisation avec une variantes", () => {
      const variantesEtapes: VariantesEtape<InformationEtapeForm>[] = [
        {
          etape: exInformationEtape.form1,
          conditions: {},
        },
      ];
      const resultUneEtape =
        fabriquesInformationsEtapes.variantes(variantesEtapes);
      const donnees = donneesFormulaireSimulateurVide;
      expect(resultUneEtape).toEqual({
        ...resultatAttendu,
        variantes: [variantesEtapes[0]?.etape],
      });
      expect(resultUneEtape.varianteAffichee(donnees)).toBe(0);
    });
    it("initialisation avec deux variantes", () => {
      const variantesDeuxEtapes: VariantesEtape<InformationEtapeForm>[] = [
        {
          etape: exInformationEtape.form1,
          conditions: { typeStructure: ["privee"] },
        },
        {
          etape: exInformationEtape.form2,
          conditions: { typeStructure: ["publique"] },
        },
      ];
      const resultDeuxEtapes =
        fabriquesInformationsEtapes.variantes(variantesDeuxEtapes);
      const donnees = fabriqueDonneesFormulaire(
        donneesFormulaireSimulateurVide,
      );
      expect(resultDeuxEtapes).toEqual({
        ...resultatAttendu,
        variantes: [exInformationEtape.form1, exInformationEtape.form2],
      });
      expect(
        resultDeuxEtapes.varianteAffichee({
          ...donnees,
          typeStructure: ["privee"],
        }),
      ).toBe(0);
      expect(
        resultDeuxEtapes.varianteAffichee({
          ...donnees,
          typeStructure: ["publique"],
        }),
      ).toBe(1);
    });
  });
  describe(fabriquesInformationsEtapes.sousEtapeConditionnelle, () => {
    it("Construit une sous-étape conditionnelle avec des variantes", () => {
      const variantesDeuxEtapes: VariantesEtape<InformationEtapeForm>[] = [
        {
          etape: exInformationEtape.form1,
          conditions: { typeStructure: ["privee"] },
        },
        {
          etape: exInformationEtape.form2,
          conditions: { typeStructure: ["publique"] },
        },
      ];
      const variantes =
        fabriquesInformationsEtapes.variantes(variantesDeuxEtapes);
      const sousEtapeConditionnelle =
        fabriquesInformationsEtapes.sousEtapeConditionnelle(
          toujoursVrai,
          variantes,
        );
      expect(
        sousEtapeConditionnelle.sousEtape.varianteAffichee({
          ...donneesFormulaireSimulateurVide,
          typeStructure: ["privee"],
        }),
      ).toBe(0);
      expect(
        sousEtapeConditionnelle.sousEtape.varianteAffichee({
          ...donneesFormulaireSimulateurVide,
          typeStructure: ["publique"],
        }),
      ).toBe(1);
    });
  });
});
