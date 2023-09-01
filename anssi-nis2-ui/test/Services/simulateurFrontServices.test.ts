import { test, expect } from "vitest";
import { transformePaysUnionEuropeennePourSelect } from "../../src/Services/simulateurFrontServices";
import { paysUnionEuropeenneLocalisation } from "../../src/Domaine/DomaineSimulateur";

test("transforme la liste de pays de l'UE par défaut", () => {
  const attendu = [
    {
      label: "France",
      nativeInputProps: {
        name: "etatMembre",
        value: "france",
      },
    },
    {
      label: "Autre état membre",
      nativeInputProps: {
        name: "etatMembre",
        value: "autre",
      },
    },
    {
      label: "Hors Union Européenne",
      nativeInputProps: {
        name: "etatMembre",
        value: "horsue",
      },
    },
  ];
  expect(
    transformePaysUnionEuropeennePourSelect(paysUnionEuropeenneLocalisation),
  ).toStrictEqual(attendu);
});
