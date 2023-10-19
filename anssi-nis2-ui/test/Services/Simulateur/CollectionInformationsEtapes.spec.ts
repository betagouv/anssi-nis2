import { describe, expect, it, vi } from "vitest";
import { fc } from "@fast-check/vitest";
import { CollectionInformationsEtapes } from "../../../src/Services/Simulateur/CollectionInformationsEtapes";
import {
  etapeInexistante,
  InformationEtapeForm,
  InformationEtapeResult,
} from "../../../src/Services/Simulateur/informationsEtape";
import { ValidationReponses } from "../../../src/Domaine/Simulateur/Operations/validateursChamps";
import { SimulateurEtapeNodeComponent } from "../../../src/Services/Simulateur/Props/component";

const FauxSimulateurEtapeComposant: SimulateurEtapeNodeComponent = vi.fn();

describe(CollectionInformationsEtapes, () => {
  const fausseValidationReponse: ValidationReponses = {
    message: "Fausse validation",
    validateur: vi.fn(),
  };
  const informationEtapeForm1 = new InformationEtapeForm(
    "Etape Form 1",
    fausseValidationReponse,
    FauxSimulateurEtapeComposant,
  );
  const informationEtapeForm2 = new InformationEtapeForm(
    "Etape Form 2",
    fausseValidationReponse,
    FauxSimulateurEtapeComposant,
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
            fausseValidationReponse,
            FauxSimulateurEtapeComposant,
          ),
          etapeInexistante,
        );
      const nombreEtapesEffectif =
        collectionInformationsEtapesAvecInexistantes.nombreEtapes;
      const nombreEtapesAttendu = 3;
      expect(nombreEtapesEffectif).toBe(nombreEtapesAttendu);
    });
  });

  describe("Propriétés croisées numéro étape", () => {
    const arbInformationEtapeForm = fc
      .string()
      .map(
        (titre) =>
          new InformationEtapeForm(
            titre,
            fausseValidationReponse,
            FauxSimulateurEtapeComposant,
          ),
      );
    const arbInformationEtapeResult = fc
      .string()
      .map((titre) => new InformationEtapeResult(titre));
    it("nombre d'étape d'une collection d'étapes form est toujours le nombre d'étapes en entrée", () => {
      fc.assert(
        fc.property(fc.array(arbInformationEtapeForm), (listeEtapes) => {
          const collection = new CollectionInformationsEtapes(...listeEtapes);
          expect(collection.nombreEtapes).toBe(listeEtapes.length);
        }),
      );
    });
    it("nombre d'étape d'une collection d'étapes result est toujours 0", () => {
      fc.assert(
        fc.property(fc.array(arbInformationEtapeResult), (listeEtapes) => {
          const collection = new CollectionInformationsEtapes(...listeEtapes);
          expect(collection.nombreEtapes).toBe(0);
        }),
      );
    });
    it("nombre d'étape est toujours supérieur à etape courante", () => {});
  });
});
