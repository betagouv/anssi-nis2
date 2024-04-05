import { describe, expect, it } from "vitest";
import { Activite } from "../../../../commun/core/src/Domain/Simulateur/Activite.definitions";
import { donneesFormulaireSimulateurVide } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique";
import { genereTransformateurValeursVersOptions } from "../../../src/Services/Simulateur/genereTransformateurValeursVersOptions";

describe(genereTransformateurValeursVersOptions, () => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = () => {};

  type ValeurActivitesPartielles = Extract<
    Activite,
    "entrepriseElectriciteRemplissantFonctionFourniture"
  >;
  const getSousEnsembleActiviteLabel = (
    value: ValeurActivitesPartielles,
    secteurActivite: Record<ValeurActivitesPartielles, string>,
  ) => secteurActivite[value];

  describe("avec des groupes", () => {
    const activites: Record<ValeurActivitesPartielles, string> = {
      entrepriseElectriciteRemplissantFonctionFourniture:
        "Entreprise d’électricité remplissant une fonction de fourniture",
    };
    const transformateur = genereTransformateurValeursVersOptions<
      ValeurActivitesPartielles,
      string
    >(getSousEnsembleActiviteLabel, "activites");

    it("genere une liste d'option avec des valeurs préfixées", () => {
      const attendu = [
        {
          label:
            "Entreprise d’électricité remplissant une fonction de fourniture",
          nativeInputProps: {
            checked: false,
            onChange: onChange,
            name: "activites",
            value: "entrepriseElectriciteRemplissantFonctionFourniture",
          },
        },
      ];

      const optionsActivitesObtenues = transformateur(
        activites,
        onChange,
        donneesFormulaireSimulateurVide,
      );
      expect(optionsActivitesObtenues).toStrictEqual(attendu);
    });

    it("genere une liste d'option avec la bonne option cochée", () => {
      const valeurSelectionnee: Activite =
        "entrepriseElectriciteRemplissantFonctionFourniture";
      const attendu = [
        {
          label:
            "Entreprise d’électricité remplissant une fonction de fourniture",
          nativeInputProps: {
            checked: true,
            onChange: onChange,
            name: "activites",
            value: valeurSelectionnee,
          },
        },
      ];
      const currentDataForm = fabriqueDonneesFormulaire({
        activites: [valeurSelectionnee],
      });

      const optionsActivitesObtenues = transformateur(
        activites,
        onChange,
        currentDataForm,
      );
      expect(optionsActivitesObtenues).toStrictEqual(attendu);
    });
  });
});
