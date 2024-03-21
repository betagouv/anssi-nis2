import { describe, it, expect } from "vitest";
import { Activite } from "../../../../commun/core/src/Domain/Simulateur/Activite.definitions";
import { donneesFormulaireSimulateurVide } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import { fabriqueDonneesFormulaire } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.fabrique";
import { genereTransformateurValeursVersOptions } from "../../../src/Services/Simulateur/genereTransformateurValeursVersOptions";
import { libellesPaysUnionEuropeenneLocalisation } from "../../../src/References/Libelles";
import { transformePaysUnionEuropeennePourSelect } from "../../../src/Services/Simulateur/Transformateurs/TransformePaysUnionEuropeennePourSelect";

describe(genereTransformateurValeursVersOptions, () => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = () => {};
  const optionsPaysUE = (optionsChecked = [false, false, false]) => [
    {
      label: "France",
      nativeInputProps: {
        checked: optionsChecked[0],
        onChange: onChange,
        name: "appartenancePaysUnionEuropeenne",
        value: "france",
      },
    },
    {
      label: "Autres états membres de l'Union Européenne",
      nativeInputProps: {
        checked: optionsChecked[1],
        onChange: onChange,
        name: "appartenancePaysUnionEuropeenne",
        value: "autre",
      },
    },
    {
      label: "Autres états hors Union Européenne",
      nativeInputProps: {
        checked: optionsChecked[2],
        onChange: onChange,
        name: "appartenancePaysUnionEuropeenne",
        value: "horsue",
      },
    },
  ];

  it("transforme la liste de pays de l'UE par défaut", () => {
    const attendu = optionsPaysUE();
    expect(
      transformePaysUnionEuropeennePourSelect(
        libellesPaysUnionEuropeenneLocalisation,
        onChange,
      ),
    ).toStrictEqual(attendu);
  });

  it("génère un champ d'option avec les bons états checked", () => {
    const attendu = optionsPaysUE([true, false, false]);
    const defaultDataForm = fabriqueDonneesFormulaire({
      appartenancePaysUnionEuropeenne: ["france"],
    });
    const optionsPaysUEObtenu = transformePaysUnionEuropeennePourSelect(
      libellesPaysUnionEuropeenneLocalisation,
      onChange,
      defaultDataForm,
    );
    expect(optionsPaysUEObtenu).toStrictEqual(attendu);
  });

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
