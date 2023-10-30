import { describe, expect, it } from "vitest";
import { EtatEtapesManipulable } from "../../../src/Services/Simulateur/EtatEtapes";
import { InformationsEtape } from "../../../src/Services/Simulateur/InformationsEtape";
import { donneesFormulaireSimulateurVide } from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  exInformationEtape,
  informationSousEtapeForm,
} from "./exemples/informationEtape.exemples";
import { exCollectionInformationEtape } from "./exemples/collectionInformationEtape.exemples";
import { exEtatEtape } from "./exemples/etatEtape.exemples";

const donneesVides = donneesFormulaireSimulateurVide;

describe(EtatEtapesManipulable, () => {
  const attendUneEtapeCourante = (
    etatEtapes: EtatEtapesManipulable,
    numeroCourantAttendu: number,
    contenuEtapeAttendu: InformationsEtape,
  ) => {
    expect(etatEtapes.numero).toStrictEqual(numeroCourantAttendu);
    expect(etatEtapes.contenuEtapeCourante).toStrictEqual(contenuEtapeAttendu);
  };

  describe("Construction", () => {
    it("se construit avec une collection d'étapes", () => {
      const etatEtapes = exEtatEtape.longueur2.etapeInitiale;

      expect(etatEtapes).toBeInstanceOf(EtatEtapesManipulable);
      expect(etatEtapes.collectionEtapes).toStrictEqual(
        exCollectionInformationEtape.longueur2.simple,
      );
      attendUneEtapeCourante(etatEtapes, 1, exInformationEtape.form1);
    });
  });

  describe("Avancement nominal", () => {
    it("renvoie l'étape 2 quand suivant est appelé depuis l'étape 1", () => {
      const etatEtapes =
        exEtatEtape.longueur2.etapeInitiale.suivant(donneesVides);
      attendUneEtapeCourante(etatEtapes, 2, exInformationEtape.form2);
    });

    it("renvoie l'étape 1 quand precedent est appelé depuis l'étape 2", () => {
      const etatEtapes = exEtatEtape.longueur2.etapeInitiale
        .suivant(donneesVides)
        .precedent(donneesVides);

      attendUneEtapeCourante(etatEtapes, 1, exInformationEtape.form1);
    });

    it("renvoie l'étape courante avant l'étape 1", () => {
      const etatEtapes =
        exEtatEtape.longueur2.etapeInitiale.precedent(donneesVides);
      attendUneEtapeCourante(etatEtapes, 1, exInformationEtape.form1);
    });
  });

  describe("Sous-étapes conditionnelles", () => {
    it("renvoie l'étape 3 après l'étape 2", () => {
      const etatEtapeResultant =
        exEtatEtape.longueur3.etape2.suivant(donneesVides);

      attendUneEtapeCourante(
        etatEtapeResultant,
        3,
        exInformationEtape.etapeAvecSousEtape,
      );
    });
    it("renvoie l'étape 3 bis après l'étape 3", () => {
      const etatEtapeResultant =
        exEtatEtape.longueur3.etape3.suivant(donneesVides);

      expect(etatEtapeResultant).toStrictEqual(exEtatEtape.longueur3.etape3_1);
      attendUneEtapeCourante(
        etatEtapeResultant,
        3,
        exInformationEtape.sousEtape,
      );
    });

    it("renvoie l'étape 3 avant l'étape 3 bis", () => {
      const etatEtapeResultant =
        exEtatEtape.longueur3.etape3_1.precedent(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(exEtatEtape.longueur3.etape3);

      attendUneEtapeCourante(
        etatEtapeResultant,
        3,
        exInformationEtape.etapeAvecSousEtape,
      );
    });

    it("renvoie l'étape 2 avant l'étape 3", () => {
      const etatEtapeResultant =
        exEtatEtape.longueur3.etape3.precedent(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(exEtatEtape.longueur3.etape2);

      attendUneEtapeCourante(etatEtapeResultant, 2, exInformationEtape.form2);
    });

    it("renvoie l'étape courante 3 après l'étape 3 bis", () => {
      const etatEtapeAttendue = new EtatEtapesManipulable(
        exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
        2,
        1,
      );

      const etatEtapeResultant =
        exEtatEtape.longueur3.etape3_1.suivant(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(etatEtapeAttendue);

      attendUneEtapeCourante(etatEtapeResultant, 3, informationSousEtapeForm);
    });

    it("renvoie l'étape 4 après l'étape 3 bis", () => {
      const etatEtapeAttendue = exEtatEtape.longueur4.etape4;

      const etatEtapeResultant =
        exEtatEtape.longueur4.etape3_1.suivant(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(etatEtapeAttendue);

      attendUneEtapeCourante(etatEtapeResultant, 4, exInformationEtape.form2);
    });

    it("renvoie l'étape 3 avant l'étape 4", () => {
      const etatEtapeAttendue = exEtatEtape.longueur4.etape3;

      const etatEtapeResultant =
        exEtatEtape.longueur4.etape4.precedent(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(etatEtapeAttendue);

      attendUneEtapeCourante(
        etatEtapeResultant,
        3,
        exInformationEtape.etapeAvecSousEtape,
      );
    });
  });

  // describe("Passer une étape", () => {
  //   it("passe la dernière étape si la condition est remplie", () => {
  //     const etatEtapeAttendu =
  //       exEtatEtape.longueur3.avantDerniereEtapeEvitable.etape3;
  //     const etatEtapeResultant =
  //       exEtatEtape.longueur3.avantDerniereEtapeEvitable.etapeInitiale.suivant(
  //         donneesVides,
  //       );
  //
  //     expect(etatEtapeResultant).toStrictEqual(etatEtapeAttendu);
  //
  //     attendUneEtapeCourante(etatEtapeResultant, 3, exInformationEtape.form2);
  //   });
  // });
});
