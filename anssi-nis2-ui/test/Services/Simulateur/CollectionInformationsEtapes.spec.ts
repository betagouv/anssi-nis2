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

    function farbiqueArbitraireTupleListeEtIndice(arrayOptions = {}) {
      return fc
        .array(
          fc.oneof(arbInformationEtapeForm, arbInformationEtapeResult),
          arrayOptions,
        )
        .chain((liste) =>
          fc.record({
            listeEtapes: fc.constant(liste),
            indice: fc.nat(liste.length),
          }),
        );
    }

    const arbTupleListeEtapesEtIndice = farbiqueArbitraireTupleListeEtIndice();
    const arbTupleListesFormEtResult = fc.record({
      listeEtapesForm: fc.array(arbInformationEtapeForm, { minLength: 1 }),
      listeEtapesResult: fc.array(arbInformationEtapeResult),
    });
    const arbRecListeEtapesCommencantParNForm =
      arbTupleListesFormEtResult.chain((tuple) =>
        fc.record({
          nombreEtapesForm: fc.constant(tuple.listeEtapesForm.length),
          collection: fc.constant(
            new CollectionInformationsEtapes(
              ...[...tuple.listeEtapesForm, ...tuple.listeEtapesResult],
            ),
          ),
        }),
      );
    const arbRecListeEtapesCommencantParNResult =
      arbTupleListesFormEtResult.chain((tuple) =>
        fc.constant(
          new CollectionInformationsEtapes(
            ...[...tuple.listeEtapesResult, ...tuple.listeEtapesForm],
          ),
        ),
      );
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
    it("nombre d'étape est toujours supérieur à etape courante", () => {
      fc.assert(
        fc.property(arbTupleListeEtapesEtIndice, ({ listeEtapes, indice }) => {
          const collection = new CollectionInformationsEtapes(...listeEtapes);
          expect(collection.nombreEtapes).toBeGreaterThanOrEqual(
            collection.numeroCourante(indice),
          );
        }),
      );
    });
    it("le numéro de dernière etape est toujours le numéro de la derniére étape form", () => {
      fc.assert(
        fc.property(
          arbRecListeEtapesCommencantParNForm,
          ({ collection, nombreEtapesForm }) => {
            expect(
              collection.estDerniereEtape(nombreEtapesForm - 1),
            ).toBeTruthy();
          },
        ),
      );
      fc.assert(
        fc.property(arbRecListeEtapesCommencantParNResult, (collection) => {
          expect(
            collection.estDerniereEtape(collection.length - 1),
          ).toBeTruthy();
        }),
      );
    });

    it("est toujours une etape comptabilisable si dernière d'une liste d'étapes Form avant Result", () => {
      fc.assert(
        fc.property(
          arbRecListeEtapesCommencantParNForm,
          ({ collection, nombreEtapesForm }) => {
            expect(
              collection.recupereInformationsEtapeSuivante(nombreEtapesForm - 2)
                .estComptabilisee,
            ).toBeTruthy();
          },
        ),
      );
    });
    it("est toujours une etape comptabilisable si dernière d'une liste d'étapes Form après Result", () => {
      fc.assert(
        fc.property(arbRecListeEtapesCommencantParNResult, (collection) => {
          Object.defineProperties(collection, {
            [fc.toStringMethod]: { value: () => collection.toString() },
          });
          expect(
            collection.recupereInformationsEtapeSuivante(collection.length - 2)
              .estComptabilisee,
          ).toBeTruthy();
        }),
      );
    });
  });
});
