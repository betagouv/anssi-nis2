import { describe, it, expect } from "vitest";
import {
  fabriquesInformationsEtapes,
  toujoursFaux,
} from "../../../anssi-nis2-domain/src/Simulateur/fabriques/InformationsEtape.fabrique";
import { SimulateurEtapeForm } from "../../src/Components/Simulateur/SimulateurEtapeForm";
import {
  CapacitesEtapeFormulaire,
  EtapeExistante,
  InformationEtapeForm,
  VariantesEtape,
} from "../../../anssi-nis2-domain/src/Simulateur/InformationsEtape";
import { exInformationEtape } from "../Services/Simulateur/exemples/informationEtape.exemples";
import { fausseValidationReponse } from "../Services/Simulateur/InformationEtape.faussaire";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { SimulateurEtapeRenderedComponent } from "../../src/Services/Simulateur/Props/component";

describe("fabriquesInformationsEtapes", () => {
  describe(fabriquesInformationsEtapes.variantes, () => {
    const resultatAttendu: EtapeExistante<SimulateurEtapeRenderedComponent> &
      CapacitesEtapeFormulaire = {
      varianteAffichee: expect.any(Function),
      longueurComptabilisee: 1,
      existe: true,
      titre: "Etape Form 1",
      estIgnoree: toujoursFaux,
      conteneurElementRendu: SimulateurEtapeForm,
      remplitContitionSousEtape: toujoursFaux,
      validationReponses: fausseValidationReponse,
      fabriqueComposant: expect.any(Function),
      fabriqueValidationReponses: expect.any(Function),
    };
    it("initialisation avec une variantes", () => {
      const variantesEtapes: VariantesEtape<
        SimulateurEtapeRenderedComponent,
        InformationEtapeForm<SimulateurEtapeRenderedComponent>
      >[] = [
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
      const variantesDeuxEtapes: VariantesEtape<
        SimulateurEtapeRenderedComponent,
        InformationEtapeForm<SimulateurEtapeRenderedComponent>
      >[] = [
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
