import { describe, it, expect } from "vitest";
import { genereTransformateurValeursVersOptions } from "../../../src/Services/Simulateur/genereTransformateurValeursVersOptions";
import { libellesPaysUnionEuropeenneLocalisation } from "../../../src/Domaine/References/Libelles";
import { transformePaysUnionEuropeennePourSelect } from "../../../src/Services/Simulateur/Transformateurs";
import {
  donneesFormulaireSimulateurVide,
  DonneesFormulaireSimulateur,
} from "../../../src/Domaine/Simulateur/DonneesFormulaire";

describe(genereTransformateurValeursVersOptions, () => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = () => {};
  const optionsPaysUE = (optionsChecked = [false, false, false]) => [
    {
      label: "France",
      nativeInputProps: {
        checked: optionsChecked[0],
        onChange: onChange,
        name: "etatMembre",
        value: "france",
      },
    },
    {
      label: "Autres états membres",
      nativeInputProps: {
        checked: optionsChecked[1],
        onChange: onChange,
        name: "etatMembre",
        value: "autre",
      },
    },
    {
      label: "Autres états hors Union Européenne",
      nativeInputProps: {
        checked: optionsChecked[2],
        onChange: onChange,
        name: "etatMembre",
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
    const defaultDataForm: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      etatMembre: ["france"],
    };
    const optionsPaysUEObtenu = transformePaysUnionEuropeennePourSelect(
      libellesPaysUnionEuropeenneLocalisation,
      onChange,
      defaultDataForm,
    );
    expect(optionsPaysUEObtenu).toStrictEqual(attendu);
  });

  describe("avec des groupes", () => {
    type SousEnsembleActivites =
      "entrepriseElectriciteRemplissantUneFonctionDeFourniture";
    const getSousEnsembleActiviteLabel = (
      value: string,
      secteurActivite: Record<SousEnsembleActivites, string>,
    ) => secteurActivite[value as SousEnsembleActivites];
    const activites = {
      entrepriseElectriciteRemplissantUneFonctionDeFourniture:
        "Entreprise d’électricité remplissant une fonction de fourniture",
    };
    const groupOfActivite = "energie";
    const transformateur = genereTransformateurValeursVersOptions(
      getSousEnsembleActiviteLabel,
      "secteurActivite",
    );

    it("genere une liste d'option avec des valeurs préfixées", () => {
      const attendu = [
        {
          label:
            "Entreprise d’électricité remplissant une fonction de fourniture",
          nativeInputProps: {
            checked: false,
            onChange: onChange,
            name: "secteurActivite",
            value:
              "energie[entrepriseElectriciteRemplissantUneFonctionDeFourniture]",
          },
        },
      ];

      const optionsActivitesObtenues = transformateur(
        activites,
        onChange,
        donneesFormulaireSimulateurVide,
        groupOfActivite,
      );
      expect(optionsActivitesObtenues).toStrictEqual(attendu);
    });

    it("genere une liste d'option avec la bonne option cochée", () => {
      const valeurSelectionnee =
        "energie[entrepriseElectriciteRemplissantUneFonctionDeFourniture]";
      const attendu = [
        {
          label:
            "Entreprise d’électricité remplissant une fonction de fourniture",
          nativeInputProps: {
            checked: true,
            onChange: onChange,
            name: "secteurActivite",
            value: valeurSelectionnee,
          },
        },
      ];
      const currentDataForm: DonneesFormulaireSimulateur = {
        ...donneesFormulaireSimulateurVide,
        secteurActivite: [valeurSelectionnee],
      };

      const optionsActivitesObtenues = transformateur(
        activites,
        onChange,
        currentDataForm,
        groupOfActivite,
      );
      expect(optionsActivitesObtenues).toStrictEqual(attendu);
    });
  });
});
