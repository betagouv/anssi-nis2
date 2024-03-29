import { describe, expect, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { donneesFormulaireSimulateurVide } from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes";
import { EtatEtape } from "../../src/Domain/Simulateur/EtatEtape.definitions";
import {
  fabriqueEtatEtapePrecedent,
  fabriqueEtatEtapeSuivant,
} from "../../src/Domain/Simulateur/services/EtatEtape/EtatEtape.operations";
import { exEtatEtape } from "./exemples/etatEtape.exemple";

const donneesVides = donneesFormulaireSimulateurVide;

const attendEtatEtapeEgaux = (
  etatEtapeResultant: EtatEtape,
  etatEtapeAttendu: EtatEtape,
  ignoreProprietes = ["ignoreEtapeSuivante"],
) =>
  Object.keys(etatEtapeAttendu)
    .filter((champ) => !ignoreProprietes.includes(champ))
    .map((champ) =>
      expect(
        etatEtapeResultant[champ as keyof EtatEtape],
        `Propriété ${champ}`,
      ).toStrictEqual(etatEtapeAttendu[champ as keyof EtatEtape]),
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
    describe("Etape facultative", () => {
      it("renvoie l'étape 3 après l'étape 2", () => {
        attendEtatEtapeEgaux(
          fabriqueEtatEtapeSuivant(
            exEtatEtape.longueur3.avantDerniereEtapeEvitable.etapeInitiale,
            donneesVides,
          ),
          exEtatEtape.longueur3.avantDerniereEtapeEvitable.etape3,
        );
      });
    });
    describe("Etape avec Variante", () => {
      it("Avance vers l'état étape avec la variante privee", () => {
        const donnees: DonneesFormulaireSimulateur = {
          ...donneesVides,
          typeStructure: ["privee"],
        };
        attendEtatEtapeEgaux(
          fabriqueEtatEtapeSuivant(
            exEtatEtape.longueur3.avecVarianteEtape2.etape1,
            donnees,
          ),
          exEtatEtape.longueur3.avecVarianteEtape2.etape2.variantePrivee,
        );
      });
      it("Avance vers l'état étape avec la variante privee", () => {
        const donnees: DonneesFormulaireSimulateur = {
          ...donneesVides,
          typeStructure: ["publique"],
        };
        attendEtatEtapeEgaux(
          fabriqueEtatEtapeSuivant(
            exEtatEtape.longueur3.avecVarianteEtape2.etape1,
            donnees,
          ),
          exEtatEtape.longueur3.avecVarianteEtape2.etape2.variantePublique,
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
    describe("Etape avec Variante", () => {
      it("Avance vers l'état étape avec la variante privee", () => {
        const donnees: DonneesFormulaireSimulateur = {
          ...donneesVides,
          typeStructure: ["privee"],
        };
        attendEtatEtapeEgaux(
          fabriqueEtatEtapePrecedent(
            exEtatEtape.longueur3.avecVarianteEtape2.etape3,
            donnees,
          ),
          exEtatEtape.longueur3.avecVarianteEtape2.etape2.variantePrivee,
        );
      });
      it("Avance vers l'état étape avec la variante privee", () => {
        const donnees: DonneesFormulaireSimulateur = {
          ...donneesVides,
          typeStructure: ["publique"],
        };
        attendEtatEtapeEgaux(
          fabriqueEtatEtapePrecedent(
            exEtatEtape.longueur3.avecVarianteEtape2.etape3,
            donnees,
          ),
          exEtatEtape.longueur3.avecVarianteEtape2.etape2.variantePublique,
        );
      });
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
