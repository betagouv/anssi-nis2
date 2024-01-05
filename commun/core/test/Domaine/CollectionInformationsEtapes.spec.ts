import { describe, expect, it } from "vitest";
import { fc } from "@fast-check/vitest";
import { CollectionInformationsEtapes } from "../../src/Domain/Simulateur/CollectionInformationsEtapes";
import { InformationsEtapeVide } from "../../src/Domain/Simulateur/EtatEtapes";
import { decoreChaineRendue } from "../utilitaires/manipulationArbitraires";
import { arbitrairesCollectionEtape } from "./arbitraires/collectionInformationEtape";
import { arbitrairesInformationEtape } from "./arbitraires/informationEtape.arbitraires";
import { arbListeEtapesEtIndice } from "./arbitraires/listeEtapes";
import {
  collectionInformationsEtapesAvecInexistantes,
  exCollectionInformationEtape,
} from "./exemples/collectionInformationEtape.exemples";
import { exInformationEtape } from "./exemples/informationEtape.exemples";

const collectionInformationsEtapes =
  exCollectionInformationEtape.longueur2.simple;
const parametresTests = [
  {
    etapeCourante: exInformationEtape.form1,
    indiceEtapeCourante: 0,
    informationEtapeSuivante: exInformationEtape.form2,
    estDernier: false,
    numeroEtape: 1,
  },
  {
    etapeCourante: exInformationEtape.form2,
    indiceEtapeCourante: 1,
    informationEtapeSuivante: InformationsEtapeVide,
    estDernier: true,
    numeroEtape: 2,
  },
];

describe(CollectionInformationsEtapes, () => {
  describe("Exemples", () => {
    it.each(parametresTests)(
      "l'indice $indiceEtapeCourante devrait contenir " +
        "l'étape $etapeCourante.titre",
      ({ etapeCourante, indiceEtapeCourante }) => {
        expect(
          collectionInformationsEtapes.recupereEtape(indiceEtapeCourante)
        ).toStrictEqual(etapeCourante);
      }
    );

    it.each(parametresTests)(
      "l'indice $indiceEtapeCourante devrait correspondre au numéro d'étape $numeroEtape ",
      ({ indiceEtapeCourante, numeroEtape }) => {
        expect(
          collectionInformationsEtapes.numero(indiceEtapeCourante)
        ).toStrictEqual(numeroEtape);
      }
    );

    it.each(parametresTests)(
      "l'indice $indiceEtapeCourante devrait être suivie par " +
        "l'étape $informationEtapeSuivante.titre",
      ({ indiceEtapeCourante, informationEtapeSuivante }) => {
        expect(
          collectionInformationsEtapes.recupereInformationsEtapeSuivante(
            indiceEtapeCourante
          )
        ).toBe(informationEtapeSuivante);
      }
    );

    it.each(parametresTests)(
      "l'indice $indiceEtapeCourante devrait être dernier ? $estDernier",
      ({ indiceEtapeCourante, estDernier }) => {
        expect(
          collectionInformationsEtapes.estDerniereEtape(indiceEtapeCourante)
        ).toBe(estDernier);
      }
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
        })
      );
    });
    it("nombre d'étape d'une collection d'étapes result est toujours 0", () => {
      fc.assert(
        fc.property(
          fc.array(arbitrairesInformationEtape.resultat),
          (listeEtapes) => {
            const collection = new CollectionInformationsEtapes(...listeEtapes);
            expect(collection.nombreEtapes).toBe(0);
          }
        )
      );
    });
    it("nombre d'étape est toujours supérieur à etape courante", () => {
      fc.assert(
        fc.property(arbListeEtapesEtIndice, ({ listeEtapes, indice }) => {
          const collection = new CollectionInformationsEtapes(...listeEtapes);
          expect(collection.nombreEtapes).toBeGreaterThanOrEqual(
            collection.numero(indice)
          );
        })
      );
    });

    describe("estPremiereEtape", () => {
      it("toujours vrai pour le premier d'une liste d'étape form", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.formPuisResult,
            ({ collection }) => {
              expect(collection.estPremiereEtape(0)).toBeTruthy();
            }
          )
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
                collection.estPremiereEtape(nombreEtapesResult)
              ).toBeTruthy();
            }
          )
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
            }
          )
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
            }
          )
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
                collection.estDerniereEtape(nombreEtapesForm - 1)
              ).toBeTruthy();
            }
          )
        );
      });
      it("si collection terminant par des form, dernier élément", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.resultPuisForm.avecNombre,
            ({ collection }) => {
              decoreChaineRendue(collection);
              expect(
                collection.estDerniereEtape(collection.length - 1)
              ).toBeTruthy();
            }
          )
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
                collection.estDerniereEtape(collection.length - 1)
              ).toBeTruthy();
            }
          )
        );
      });
      it("faux avec une collection commençant par N Form sur le premier Result", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.formPuisResult,
            ({ collection, nombreEtapesForm }) => {
              decoreChaineRendue(collection);
              expect(collection.estDerniereEtape(nombreEtapesForm)).toBeFalsy();
            }
          )
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
          })
        );
      });

      it("faux: l'avant dernier indice d'étape 'Form' suivi de 'Result'", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.formPuisResult,
            ({ collection, nombreEtapesForm }) => {
              decoreChaineRendue(collection);
              expect(
                collection.estDerniereEtape(nombreEtapesForm - 2)
              ).toBeFalsy();
            }
          )
        );
      });

      it("faux: l'avant dernier indice de la collection", () => {
        fc.assert(
          fc.property(
            arbitrairesCollectionEtape.resultPuisForm.liste,
            (collection) => {
              decoreChaineRendue(collection);
              expect(
                collection.estDerniereEtape(collection.length - 2)
              ).toBeFalsy();
            }
          )
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
                  nombreEtapesForm - 2
                ).longueurComptabilisee
              ).toBe(1);
            }
          )
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
                  collection.length - 2
                ).longueurComptabilisee
              ).toBe(1);
            }
          )
        );
      });
    });
  });
});
