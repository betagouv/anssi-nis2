import { describe, it, expect } from "vitest";
import { toujoursFaux } from "../../src/Domain/Commun/Commun.predicats";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/DonneesFormulaire.constantes";
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
      const donnees = new DonneesFormulaireSimulateur(
        donneesFormulaireSimulateurVide
      );
      expect(resultDeuxEtapes).toEqual({
        ...resultatAttendu,
        variantes: [exInformationEtape.form1, exInformationEtape.form2],
      });
      expect(
        resultDeuxEtapes.varianteAffichee(
          donnees.avec({ typeStructure: ["privee"] })
        )
      ).toBe(0);
      expect(
        resultDeuxEtapes.varianteAffichee(
          donnees.avec({ typeStructure: ["publique"] })
        )
      ).toBe(1);
    });
  });
});
