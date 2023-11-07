import { describe, it, expect } from "vitest";
import {
  fabriquesInformationsEtapes,
  toujoursFaux,
} from "../../src/Domaine/Simulateur/fabriques/InformationsEtape.fabrique";
import { SimulateurEtapeForm } from "../../src/Components/Simulateur/SimulateurEtapeForm";
import {
  InformationEtapeForm,
  VariantesEtape,
} from "../../src/Services/Simulateur/InformationsEtape";
import { exInformationEtape } from "../Services/Simulateur/exemples/informationEtape.exemples";
import { fausseValidationReponse } from "../Services/Simulateur/InformationEtape.faussaire";

describe("fabriquesInformationsEtapes", () => {
  describe(fabriquesInformationsEtapes.variantes, () => {
    it("initialisation avec une seule variante", () => {
      const variantesEtapes: VariantesEtape<InformationEtapeForm>[] = [
        { etape: exInformationEtape.form1, conditions: {} },
      ];
      const result = fabriquesInformationsEtapes.variantes(variantesEtapes);
      expect(result).toEqual({
        variantes: [variantesEtapes[0]?.etape],
        etapeAffichee: expect.any(Function),
        longueurComptabilisee: 1,
        existe: true,
        titre: "Etape Form 1",
        estIgnoree: toujoursFaux,
        conteneurElementRendu: SimulateurEtapeForm,
        remplitContitionSousEtape: toujoursFaux,
        validationReponses: fausseValidationReponse,
      });
    });
  });
});
