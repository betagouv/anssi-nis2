import { describe, expect, it } from "vitest";
import {
  fabriqueEtatEtapePrecedent,
  fabriqueEtatEtapeSuivant,
} from "../../../src/Domaine/Simulateur/fabriques/EtatEtapeFabrique";
import { exEtatEtape } from "./exemples/etatEtape.exemple";
import { donneesFormulaireSimulateurVide } from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import { EtatEtapes } from "../../../src/Services/Simulateur/EtatEtapes";

const donneesVides = donneesFormulaireSimulateurVide;

const attendEtatEtapeEgaux = (
  etatEtapeResultant: EtatEtapes,
  etatEtapeAttendu: EtatEtapes,
) =>
  Object.keys(etatEtapeAttendu)
    .filter((champ) => champ != "rempliContitionSousEtape")
    .map((champ) =>
      expect(etatEtapeResultant[champ], `Propriété ${champ}`).toStrictEqual(
        etatEtapeAttendu[champ],
      ),
    );

describe(fabriqueEtatEtapeSuivant, () => {
  describe("Fabrique l'état suivant", () => {
    it("renvoie l'étape 2 quand suivant est appelé depuis l'étape 1", () => {
      attendEtatEtapeEgaux(
        fabriqueEtatEtapeSuivant(
          exEtatEtape.longueur2.etapeInitiale,
          donneesVides,
        ),
        exEtatEtape.longueur2.etape2,
      );
    });
    describe("Sous-étapes conditionnelles", () => {
      it("renvoie l'étape 3 après l'étape 2", () => {
        attendEtatEtapeEgaux(
          fabriqueEtatEtapeSuivant(exEtatEtape.longueur3.etape2, donneesVides),
          exEtatEtape.longueur3.etape3,
        );
      });
      it("renvoie l'étape 3 bis après l'étape 3", () => {
        attendEtatEtapeEgaux(
          fabriqueEtatEtapeSuivant(exEtatEtape.longueur3.etape3, donneesVides),
          exEtatEtape.longueur3.etape3_1,
        );
      });

      it("renvoie l'étape 3 bis après l'étape 3 bis si elle est la dernière", () => {
        attendEtatEtapeEgaux(
          fabriqueEtatEtapeSuivant(
            exEtatEtape.longueur3.etape3_1,
            donneesVides,
          ),
          exEtatEtape.longueur3.etape3_1,
        );
      });
      it("renvoie l'étape 4 après l'étape 3 bis", () => {
        attendEtatEtapeEgaux(
          fabriqueEtatEtapeSuivant(
            exEtatEtape.longueur4.etape3_1,
            donneesVides,
          ),
          exEtatEtape.longueur4.etape4,
        );
      });
    });
  });
});

describe(fabriqueEtatEtapePrecedent, () => {
  describe("Avancement nominal", () => {
    it("renvoie l'étape courante avant l'étape 1", () => {
      attendEtatEtapeEgaux(
        fabriqueEtatEtapePrecedent(
          exEtatEtape.longueur2.etapeInitiale,
          donneesVides,
        ),
        exEtatEtape.longueur2.etapeInitiale,
      );
    });

    it("renvoie l'étape courante quand appelé sur etat suivant", () => {
      attendEtatEtapeEgaux(
        fabriqueEtatEtapePrecedent(
          fabriqueEtatEtapeSuivant(
            exEtatEtape.longueur2.etapeInitiale,
            donneesVides,
          ),
          donneesVides,
        ),
        exEtatEtape.longueur2.etapeInitiale,
      );
    });
  });

  describe("Sous-étapes conditionnelles", () => {
    it("renvoie l'étape 3 avant l'étape 3 bis", () => {
      attendEtatEtapeEgaux(
        fabriqueEtatEtapePrecedent(
          exEtatEtape.longueur3.etape3_1,
          donneesVides,
        ),
        exEtatEtape.longueur3.etape3,
      );
    });
    it("renvoie l'étape 2 avant l'étape 3", () => {
      attendEtatEtapeEgaux(
        fabriqueEtatEtapePrecedent(exEtatEtape.longueur3.etape3, donneesVides),
        exEtatEtape.longueur3.etape2,
      );
    });
    it("renvoie l'étape 3 avant l'étape 4", () => {
      attendEtatEtapeEgaux(
        fabriqueEtatEtapePrecedent(exEtatEtape.longueur4.etape4, donneesVides),
        exEtatEtape.longueur4.etape3,
      );
    });
  });
});
