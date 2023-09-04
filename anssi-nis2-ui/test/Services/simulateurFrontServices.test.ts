import { describe, it, expect } from "vitest";
import {
  genereTransformateurValeursVersOptions,
  SimulateurFormData,
  transformePaysUnionEuropeennePourSelect,
} from "../../src/Services/simulateurFrontServices";
import { paysUnionEuropeenneLocalisation } from "../../src/Domaine/DomaineSimulateur";

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
});
