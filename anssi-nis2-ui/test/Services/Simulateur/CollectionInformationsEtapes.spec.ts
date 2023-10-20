import { describe, expect, it } from "vitest";
import { fc } from "@fast-check/vitest";
import { CollectionInformationsEtapes } from "../../../src/Services/Simulateur/CollectionInformationsEtapes";
import {
  etapeInexistante,
  InformationEtapeForm,
  InformationEtapeResult,
} from "../../../src/Services/Simulateur/informationsEtape";
import { decoreChaineRendue } from "../../utilitaires/manipulationArbitraires";
import {
  fausseValidationReponse,
  FauxSimulateurEtapeComposant,
} from "./fabriquesInformationEtape";
import { arbitrairesInformationEtape } from "./arbitraires/informationEtape";
import { arbitrairesCollectionEtape } from "./arbitraires/collectionInformationEtape";
import { arbListeEtapesEtIndice } from "./arbitraires/listeEtapes";

describe(CollectionInformationsEtapes, () => {
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
  describe("Exemples", () => {
    it.each(parametresTests)(
      "l'indice $indiceEtapeCourante devrait contenir " +
        "l'étape $etapeCourante.titre",
      ({ etapeCourante, indiceEtapeCourante }) => {
        expect(
          collectionInformationsEtapes.recupereEtapeCourante(
            indiceEtapeCourante,
          ),
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
      "l'indice $indiceEtapeCourante devrait être dernier ? $estDernier",
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
        const nombreEtapesEffectif =
          collectionInformationsEtapesAvecInexistantes.nombreEtapes;
        const nombreEtapesAttendu = 3;
        expect(nombreEtapesEffectif).toBe(nombreEtapesAttendu);
      });
    });
  });

  describe("Propriétés croisées numéro étape", () => {
    it("nombre d'étape d'une collection d'étapes form est toujours le nombre d'étapes en entrée", () => {
      fc.assert(
        fc.property(arbitrairesCollectionEtape.form, (collection) => {
          expect(collection.nombreEtapes).toBe(collection.length);
        }),
      );
    });
    it("nombre d'étape d'une collection d'étapes result est toujours 0", () => {
      fc.assert(
        fc.property(
          fc.array(arbitrairesInformationEtape.resultat),
          (listeEtapes) => {
            const collection = new CollectionInformationsEtapes(...listeEtapes);
            expect(collection.nombreEtapes).toBe(0);
          },
        ),
      );
    });
    it("nombre d'étape est toujours supérieur à etape courante", () => {
      fc.assert(
        fc.property(arbListeEtapesEtIndice, ({ listeEtapes, indice }) => {
          const collection = new CollectionInformationsEtapes(...listeEtapes);
          expect(collection.nombreEtapes).toBeGreaterThanOrEqual(
            collection.numeroCourante(indice),
          );
        }),
      );
    });

    describe("estPremiereEtape", () => {
      it("toujours vrai pour le premier d'une liste d'étape form", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.formPuisResult,
            ({ collection }) => {
              expect(collection.estPremiereEtape(0)).toBeTruthy();
            },
          ),
        );
      });
      it("si collection terminant par des form, premier élément de la série", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.resultPuisForm.avecNombre,
            ({ collection, nombreEtapesResult }) => {
              decoreChaineRendue(collection);
              expect(collection.estPremiereEtape(0)).toBeFalsy();
              expect(
                collection.estPremiereEtape(nombreEtapesResult),
              ).toBeTruthy();
            },
          ),
        );
      });
      it("avec une collection avec des sous étapes", () => {
        fc.assert(
          fc.property(
            fc.array(arbitrairesInformationEtape.form.avecSousEtape, {
              minLength: 1,
            }),
            (liste) => {
              const collection = new CollectionInformationsEtapes(...liste);
              decoreChaineRendue(collection);
              expect(collection.estPremiereEtape(0)).toBeTruthy();
              expect(collection.estPremiereEtape(1)).toBeFalsy();
            },
          ),
        );
      });
      it("faux avec une collection commençant par N Form sur le premier Result", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.formPuisResult,
            ({ collection, nombreEtapesForm }) => {
              decoreChaineRendue(collection);
              expect(collection.estPremiereEtape(0)).toBeTruthy();
              expect(collection.estPremiereEtape(nombreEtapesForm)).toBeFalsy();
            },
          ),
        );
      });
    });
    describe("estDerniereEtape", () => {
      it("le numéro de dernière etape est toujours le numéro de la derniére étape form", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.formPuisResult,
            ({ collection, nombreEtapesForm }) => {
              expect(
                collection.estDerniereEtape(nombreEtapesForm - 1),
              ).toBeTruthy();
            },
          ),
        );
      });
      it("si collection terminant par des form, dernier élément", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.resultPuisForm.avecNombre,
            ({ collection }) => {
              decoreChaineRendue(collection);
              expect(
                collection.estDerniereEtape(collection.length - 1),
              ).toBeTruthy();
            },
          ),
        );
      });
      it("avec une collection avec des sous étapes", () => {
        fc.assert(
          fc.property(
            fc.array(arbitrairesInformationEtape.form.avecSousEtape, {
              minLength: 1,
            }),
            (liste) => {
              const collection = new CollectionInformationsEtapes(...liste);
              decoreChaineRendue(collection);
              expect(
                collection.estDerniereEtape(collection.length - 1),
              ).toBeTruthy();
            },
          ),
        );
      });
      it("faux avec une collection commençant par N Form sur le premier Result", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.formPuisResult,
            ({ collection, nombreEtapesForm }) => {
              decoreChaineRendue(collection);
              expect(collection.estDerniereEtape(nombreEtapesForm)).toBeFalsy();
            },
          ),
        );
      });
      it("faux avec une collection contenant des sous Etapes, au delà de l'indice", () => {
        const arbLocal = fc
          .array(arbitrairesInformationEtape.form.avecSousEtape)
          .map((liste) => new CollectionInformationsEtapes(...liste));
        fc.assert(
          fc.property(arbLocal, (collection) => {
            // const collection = new CollectionInformationsEtapes(...liste);
            decoreChaineRendue(collection);
            expect(collection.estDerniereEtape(collection.length)).toBeFalsy();
          }),
        );
      });

      it("faux: l'avant dernier indice d'étape 'Form' suivi de 'Result'", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.formPuisResult,
            ({ collection, nombreEtapesForm }) => {
              decoreChaineRendue(collection);
              expect(
                collection.estDerniereEtape(nombreEtapesForm - 2),
              ).toBeFalsy();
            },
          ),
        );
      });

      it("faux: l'avant dernier indice de la collection", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.resultPuisForm.liste,
            (collection) => {
              decoreChaineRendue(collection);
              expect(
                collection.estDerniereEtape(collection.length - 2),
              ).toBeFalsy();
            },
          ),
        );
      });
    });

    describe("estComptabilisée", () => {
      it("est toujours une etape comptabilisable si dernière d'une liste d'étapes Form avant Result", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.formPuisResult,
            ({ collection, nombreEtapesForm }) => {
              decoreChaineRendue(collection);
              expect(
                collection.recupereInformationsEtapeSuivante(
                  nombreEtapesForm - 2,
                ).estComptabilisee,
              ).toBeTruthy();
            },
          ),
        );
      });
      it("est toujours une etape comptabilisable si dernière d'une liste d'étapes Form après Result", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.resultPuisForm.liste,
            (collection) => {
              decoreChaineRendue(collection);
              expect(
                collection.recupereInformationsEtapeSuivante(
                  collection.length - 2,
                ).estComptabilisee,
              ).toBeTruthy();
            },
          ),
        );
      });
    });
  });
});
