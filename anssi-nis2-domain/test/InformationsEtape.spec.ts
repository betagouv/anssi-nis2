import { describe, it, expect } from "vitest";
import {
  CapacitesEtapeFormulaire,
  EtapeExistante,
  InformationEtapeForm,
  VariantesEtape,
} from "../src/Simulateur/InformationsEtape";
import { exInformationEtape } from "./exemples/informationEtape.exemples";
import { fausseValidationReponse } from "./utilitaires/InformationEtape.faussaire";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../src/Simulateur/DonneesFormulaire";
import {
  fabriquesInformationsEtapes,
  toujoursFaux,
} from "anssi-nis2-ui/src/Services/Simulateur/InformationsEtape.fabrique";

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
      const donnees = new DonneesFormulaireSimulateur(
        donneesFormulaireSimulateurVide,
      );
      expect(resultDeuxEtapes).toEqual({
        ...resultatAttendu,
        variantes: [exInformationEtape.form1, exInformationEtape.form2],
      });
      expect(
        resultDeuxEtapes.varianteAffichee(
          donnees.avec({ typeStructure: ["privee"] }),
        ),
      ).toBe(0);
      expect(
        resultDeuxEtapes.varianteAffichee(
          donnees.avec({ typeStructure: ["publique"] }),
        ),
      ).toBe(1);
    });
  });
});
