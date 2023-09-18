import { describe, expect, it } from "vitest";
import { EtatEtapes } from "../../../src/Services/Simulateur/EtatEtapes";
import {
  InformationEtapeForm,
  InformationsEtape,
  SousEtapeConditionnelle,
} from "../../../src/Services/Simulateur/informationsEtape";
import {
  Etape1Localisation,
  Etape2TypeStructure,
  Etape3Taille,
  Etape4Secteur,
} from "../../../src/Components/Simulateur";
import { CollectionInformationsEtapes } from "../../../src/Services/Simulateur/CollectionInformationsEtapes";
import { donneesFormulaireSimulateurVide } from "../../../src/Services/Simulateur/donneesFormulaire";

describe(EtatEtapes, () => {
  const informationEtapeForm1 = new InformationEtapeForm(
    "Localisation de l’activité",
    "Sélectionnez une réponse",
    Etape1Localisation,
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
  const numeroEtapeInitiale = 1;
  const etatEtapesInitial = new EtatEtapes(
    collectionInformationsEtapes,
    numeroEtapeInitiale,
  );

  const attendUneEtapeCourante = (
    etatEtapes: EtatEtapes,
    numeroEtapeCouranteAttendue: number,
    contenuEtapeAttendu: InformationEtapeForm,
  ) => {
    expect(etatEtapes.numeroEtapeCourante).toStrictEqual(
      numeroEtapeCouranteAttendue,
    );
    expect(
      etatEtapes.contenuEtapeCourante() as InformationsEtape,
    ).toStrictEqual(contenuEtapeAttendu);
  };

  it("se construit avec une collection d'étapes", () => {
    const numeroEtapeCouranteAttendue = numeroEtapeInitiale;
    const etatEtapes = etatEtapesInitial;
    const contenuEtapeAttendu = informationEtapeForm1;

    expect(etatEtapes).toBeInstanceOf(EtatEtapes);
    expect(etatEtapes.collectionEtapes).toStrictEqual(
      collectionInformationsEtapes,
    );
    attendUneEtapeCourante(
      etatEtapes,
      numeroEtapeCouranteAttendue,
      contenuEtapeAttendu,
    );
  });

  describe("Avancement nominal", () => {
    it("renvoie l'étape 2 quand suivant est appelé depuis l'étape 1", () => {
      const numeroEtapeSuivanteAttendu = 2;
      const contenuEtapeAttendu = informationEtapeForm2;

      const etatEtapes = etatEtapesInitial.suivante(
        donneesFormulaireSimulateurVide,
      );

      attendUneEtapeCourante(
        etatEtapes,
        numeroEtapeSuivanteAttendu,
        contenuEtapeAttendu,
      );
    });

    it("renvoie l'étape 1 quand precedent est appelé depuis l'étape 2", () => {
      const numeroEtapePrecedenteAttendu = 1;
      const contenuEtapeAttendu = informationEtapeForm1;

      const etatEtapes = etatEtapesInitial
        .suivante(donneesFormulaireSimulateurVide)
        .precedent();

      attendUneEtapeCourante(
        etatEtapes,
        numeroEtapePrecedenteAttendu,
        contenuEtapeAttendu,
      );
    });
  });

  describe("Sous-étapes conditionnelles", () => {
    // const predicatFaux = (formData: DonneesFormulaireSimulateur) => false;
    const predicatVrai = () => true;
    const informationSousEtape4 = new InformationEtapeForm(
      "Sous-étape",
      "Indication sous-étape",
      Etape4Secteur,
    );
    const sousEtapeToujoursPresente = new SousEtapeConditionnelle(
      predicatVrai,
      informationSousEtape4,
    );
    const informationEtape3AvecSousEtape = new InformationEtapeForm(
      "Contient une sous Etape",
      "Indication réponse",
      Etape3Taille,
      sousEtapeToujoursPresente,
    );
    const collectionInformationsEtapesAvecConditionnelle =
      new CollectionInformationsEtapes(
        informationEtapeForm1,
        informationEtapeForm2,
        informationEtape3AvecSousEtape,
      );
    const etatEtapes2AvecConditionnelle3 = new EtatEtapes(
      collectionInformationsEtapesAvecConditionnelle,
      2,
    );

    it("renvoie l'étape 3 après l'étape 2", () => {
      const etatEtapeResultant = etatEtapes2AvecConditionnelle3.suivante(
        donneesFormulaireSimulateurVide,
      );

      attendUneEtapeCourante(
        etatEtapeResultant,
        3,
        informationEtape3AvecSousEtape,
      );
    });

    it("renvoie l'étape 3 bis après l'étape 3", () => {
      const etatEtapes3 = new EtatEtapes(
        collectionInformationsEtapesAvecConditionnelle,
        3,
      );
      const etatEtapes3SousEtapeAttendu = new EtatEtapes(
        collectionInformationsEtapesAvecConditionnelle,
        3,
        1,
      );
      const etatEtapeResultant = etatEtapes3.suivante(
        donneesFormulaireSimulateurVide,
      );
      expect(etatEtapeResultant).toStrictEqual(etatEtapes3SousEtapeAttendu);

      attendUneEtapeCourante(etatEtapeResultant, 3, informationSousEtape4);
    });
  });
});
