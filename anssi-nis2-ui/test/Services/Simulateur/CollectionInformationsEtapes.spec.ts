import { describe, expect, it } from "vitest";
import { CollectionInformationsEtapes } from "../../../src/Services/Simulateur/CollectionInformationsEtapes";
import {
  etapeInexistante,
  InformationEtapeForm,
  InformationEtapeResult,
} from "../../../src/Services/Simulateur/informationsEtape";
import {
  EtapeLocalisation,
  EtapeTypeStructure,
} from "../../../src/Components/Simulateur/Etapes";

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

  describe("nombreEtapes", () => {
    it("retourne 2 étapes quand 2 étapes form seules sont ajoutées", () => {
      const nombreEtapesEffectif = collectionInformationsEtapes.nombreEtapes;
      const nombreEtapesAttendu = 2;
      expect(nombreEtapesEffectif).toBe(nombreEtapesAttendu);
    });

    it("retourne 3 étapes quand 3 étapes form sont ajoutées au milieu d'étapes result et d'étapes inexistante", () => {
      const collectionInformationsEtapesAvecInexistantes =
        new CollectionInformationsEtapes(
          new InformationEtapeResult(""),
          informationEtapeForm1,
          new InformationEtapeResult(""),
          informationEtapeForm2,
          new InformationEtapeForm(
            "",
            {
              message: "Sélectionnez une réponse",
              validateur: auMoinsUn("etatMembre"),
            },
            EtapeLocalisation,
          ),
          etapeInexistante,
        );
      const nombreEtapesEffectif =
        collectionInformationsEtapesAvecInexistantes.nombreEtapes;
      const nombreEtapesAttendu = 3;
      expect(nombreEtapesEffectif).toBe(nombreEtapesAttendu);
    });
  });
});
