import { describe, it, expect } from "vitest";
import {
  emptySimulateurFormData,
  genereTransformateurValeursVersOptions,
  SimulateurFormData,
  transformePaysUnionEuropeennePourSelect,
} from "../../src/Services/simulateurFrontServices";
import {paysUnionEuropeenneLocalisation} from "../../src/Domaine/DomaineSimulateur";

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
      label: "Autre état membre",
      nativeInputProps: {
        checked: optionsChecked[1],
        onChange: onChange,
        name: "etatMembre",
        value: "autre",
      },
    },
    {
      label: "Hors Union Européenne",
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
        paysUnionEuropeenneLocalisation,
        onChange,
      ),
    ).toStrictEqual(attendu);
  });

  it("génère un champ d'option avec les bons états checked", () => {
    const attendu = optionsPaysUE([true, false, false]);
    const defaultDataForm: SimulateurFormData = {
      secteurActivite: [],
      trancheCA: [],
      trancheNombreEmployes: [],
      typeStructure: [],
      etatMembre: ["france"],
    };
    const optionsPaysUEObtenu = transformePaysUnionEuropeennePourSelect(
      paysUnionEuropeenneLocalisation,
      onChange,
      defaultDataForm,
    );
    expect(optionsPaysUEObtenu).toStrictEqual(attendu);
  });

  it("genere une liste d'option avec des valeurs préfixées", () => {
    const attendu =     [{
          label: "Entreprise d’électricité remplissant une fonction de fourniture",
          nativeInputProps: {
            checked: false,
            onChange: onChange,
            name: "secteurActivite",
            value: "energie[entrepriseElectriciteRemplissantUneFonctionDeFourniture]",
          },
        },
        ];
    type SousEnsembleActivites = "entrepriseElectriciteRemplissantUneFonctionDeFourniture"
    const getSousEnsembleActiviteLabel = (
        value: string,
        secteurActivite: Record<SousEnsembleActivites, string>,
    ) => secteurActivite[value as SousEnsembleActivites];
    const activites = {
      entrepriseElectriciteRemplissantUneFonctionDeFourniture:
          "Entreprise d’électricité remplissant une fonction de fourniture",
    }
    const groupOfActivite = "energie"
    const transformateur = genereTransformateurValeursVersOptions(getSousEnsembleActiviteLabel, "secteurActivite")
    const optionsActivitesObtenues = transformateur(
        activites,
        onChange,
        emptySimulateurFormData,
        groupOfActivite,
    );
    expect(optionsActivitesObtenues).toStrictEqual(attendu)
  })
});
