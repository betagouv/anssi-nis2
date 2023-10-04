import { describe, expect, it, vi } from "vitest";
import { CollectionInformationsEtapes } from "../../../src/Services/Simulateur/CollectionInformationsEtapes";
import {
  etapeInexistante,
  InformationEtapeForm,
} from "../../../src/Services/Simulateur/informationsEtape";
import {
  EtapeLocalisation,
  Etape2TypeStructure,
} from "../../../src/Components/Simulateur";

describe(CollectionInformationsEtapes, () => {
  const informationEtapeForm1 = new InformationEtapeForm(
    "Localisation de l’activité",
    "Sélectionnez une réponse",
    EtapeLocalisation,
  );
  const informationEtapeForm2 = new InformationEtapeForm(
    "Type de structure",
    "Sélectionnez une réponse",
    Etape2TypeStructure,
  );
  const collectionInformationsEtapes = new CollectionInformationsEtapes(
    informationEtapeForm1,
    informationEtapeForm2,
  );

  const parametresTests = [
    {
      etapeCourante: informationEtapeForm1,
      indiceEtapeCourante: 0,
      informationEtapeSuivante: informationEtapeForm2,
      estAvantDernier: true,
      numeroEtape: 1,
    },
    {
      etapeCourante: informationEtapeForm2,
      indiceEtapeCourante: 1,
      informationEtapeSuivante: etapeInexistante,
      estAvantDernier: false,
      numeroEtape: 2,
    },
  ];

  it.each(parametresTests)(
    "l'indice $indiceEtapeCourante devrait contenir " +
      "l'étape $etapeCourante.titre",
    ({ etapeCourante, indiceEtapeCourante }) => {
      expect(
        collectionInformationsEtapes.recupereEtapeCourante(indiceEtapeCourante),
      ).toStrictEqual(etapeCourante);
    },
  );

  it.each(parametresTests)(
    "l'indice $indiceEtapeCourante devrait correspondre au numéro d'étape $numeroEtape ",
    ({ indiceEtapeCourante, numeroEtape }) => {
      expect(
        collectionInformationsEtapes.numeroCourante(indiceEtapeCourante),
      ).toStrictEqual(numeroEtape);
    },
  );

  it.each(parametresTests)(
    "l'indice $indiceEtapeCourante devrait être suivie par " +
      "l'étape $informationEtapeSuivante.titre",
    ({ indiceEtapeCourante, informationEtapeSuivante }) => {
      expect(
        collectionInformationsEtapes.recupereInformationsEtapeSuivante(
          indiceEtapeCourante,
        ),
      ).toBe(informationEtapeSuivante);
    },
  );

  it.each(parametresTests)(
    "l'indice $indiceEtapeCourante devrait être avant dernier ? $estAvantDernier",
    ({ indiceEtapeCourante, estAvantDernier }) => {
      expect(
        collectionInformationsEtapes.estAvantDerniereEtape(indiceEtapeCourante),
      ).toBe(estAvantDernier);
    },
  );

  it("devrait appeler la fonction seulement si l'étape existe", () => {
    const rappel = vi.fn();
    collectionInformationsEtapes.siExiste(0, rappel);
    expect(rappel.mock.calls.length).toBe(1);
    expect(rappel.mock.calls[0]).toStrictEqual([0]);
  });

  it("ne devrait pas appeler la fonction si l'étape n'existe pas", () => {
    const rappel = vi.fn();
    collectionInformationsEtapes.siExiste(2, rappel);
    expect(rappel.mock.calls.length).toBe(0);
  });
});
