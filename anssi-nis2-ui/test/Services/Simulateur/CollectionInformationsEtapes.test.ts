import { describe, expect, it } from "vitest";
import { CollectionInformationsEtapes } from "../../../src/Services/Simulateur/CollectionInformationsEtapes";
import {
  EtapeInexistante,
  InformationEtapeForm,
} from "../../../src/Services/Simulateur/informationsEtape";
import {
  Etape1Localisation,
  Etape2TypeStructure,
} from "../../../src/Components/Simulateur";

describe(CollectionInformationsEtapes, () => {
  const collectionInformationsEtapes = new CollectionInformationsEtapes(
    new InformationEtapeForm(
      "Localisation de l’activité",
      "Sélectionnez une réponse",
      Etape1Localisation,
    ),
    new InformationEtapeForm(
      "Localisation de l’activité",
      "Sélectionnez une réponse",
      Etape2TypeStructure,
    ),
  );

  it("devrait contenir un tableau d'étapes", () => {
    const indiceEtapeCourante = 0;
    expect(
      collectionInformationsEtapes.recupereInformationsEtapeSuivante(
        indiceEtapeCourante,
      ),
    ).toBeInstanceOf(InformationEtapeForm);

    expect(
      collectionInformationsEtapes.estAvantDerniereEtape(indiceEtapeCourante),
    ).toBeTruthy();

    expect(
      collectionInformationsEtapes.numeroCourante(indiceEtapeCourante),
    ).toStrictEqual(1);
  });

  it("devrait contenir un tableau d'étapes", () => {
    const indiceEtapeCourante = 1;
    expect(
      collectionInformationsEtapes.recupereInformationsEtapeSuivante(
        indiceEtapeCourante,
      ),
    ).toStrictEqual(EtapeInexistante.HorsDePortee);

    expect(
      collectionInformationsEtapes.estAvantDerniereEtape(indiceEtapeCourante),
    ).toBeFalsy();

    expect(
      collectionInformationsEtapes.numeroCourante(indiceEtapeCourante),
    ).toStrictEqual(2);
  });
});
