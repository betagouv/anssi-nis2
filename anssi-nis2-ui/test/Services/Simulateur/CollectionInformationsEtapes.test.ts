import { describe, expect, it, vi } from "vitest";
import { CollectionInformationsEtapes } from "../../../src/Services/Simulateur/CollectionInformationsEtapes";
import {
  etapeInexistante,
  InformationEtapeForm,
} from "../../../src/Services/Simulateur/informationsEtape";
import {
  EtapeLocalisation,
  EtapeTypeStructure,
} from "../../../src/Components/Simulateur";

import { auMoinsUn } from "../../../src/Domaine/Simulateur/Services/Validateurs";

describe(CollectionInformationsEtapes, () => {
  const informationEtapeForm1 = new InformationEtapeForm(
    "Localisation de l’activité",
    {
      message: "Sélectionnez une réponse",
      validateur: auMoinsUn("etatMembre"),
    },
    EtapeLocalisation,
  );
  const informationEtapeForm2 = new InformationEtapeForm(
    "Type de structure",
    {
      message: "Sélectionnez une réponse",
      validateur: auMoinsUn("etatMembre"),
    },
    EtapeTypeStructure,
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
      estDernier: false,
      numeroEtape: 1,
    },
    {
      etapeCourante: informationEtapeForm2,
      indiceEtapeCourante: 1,
      informationEtapeSuivante: etapeInexistante,
      estDernier: true,
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
    ({ indiceEtapeCourante, estDernier }) => {
      expect(
        collectionInformationsEtapes.estDerniereEtape(indiceEtapeCourante),
      ).toBe(estDernier);
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
