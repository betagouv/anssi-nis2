import { describe, expect, it } from "vitest";
import { EtatEtapes } from "../../../src/Services/Simulateur/EtatEtapes";
import {
  InformationEtapeForm,
  InformationsEtape,
  SousEtapeConditionnelle,
} from "../../../src/Services/Simulateur/InformationsEtape";
import {
  EtapeLocalisation,
  EtapeSecteursActivite,
  EtapeTaille,
  EtapeTypeStructure,
} from "../../../src/Components/Simulateur/Etapes";
import { CollectionInformationsEtapes } from "../../../src/Services/Simulateur/CollectionInformationsEtapes";
import { donneesFormulaireSimulateurVide } from "../../../src/Domaine/Simulateur/DonneesFormulaire";
import { validationUneReponses } from "../../../src/Domaine/Simulateur/Services/Validateurs";

const predicatVrai = () => true;
const indiceEtapeInitiale = 0;
const donneesVides = donneesFormulaireSimulateurVide;
const etapeLocalisation = new InformationEtapeForm(
  "Localisation de l’activité",
  validationUneReponses("etatMembre"),
  EtapeLocalisation,
);
const etapeTypeStructure = new InformationEtapeForm(
  "Type de structure",
  validationUneReponses("typeStructure"),
  EtapeTypeStructure,
);
const etapeActivite = new InformationEtapeForm(
  "Sous-étape",
  validationUneReponses("secteurActivite"),
  EtapeSecteursActivite,
);
const sousEtapeToujoursPresente = new SousEtapeConditionnelle(
  predicatVrai,
  etapeActivite,
);
const etapeEmployesAvecSousEtapeActivite = new InformationEtapeForm(
  "Contient une sous Etape",
  validationUneReponses("trancheNombreEmployes"),
  EtapeTaille,
  { sousEtapeConditionnelle: sousEtapeToujoursPresente },
);
const exInformationEtape = {
  localisation: etapeLocalisation,
  typeStructure: etapeTypeStructure,
  sousEtapeActivite: etapeActivite,
  tailleAvecSousEtapeActivite: etapeEmployesAvecSousEtapeActivite,
};
const collectionInformationsEtapesLongueur2Simple =
  new CollectionInformationsEtapes(
    exInformationEtape.localisation,
    exInformationEtape.typeStructure,
  );
const collec3EtapesAvecConditionnelleEnDernier =
  new CollectionInformationsEtapes(
    exInformationEtape.localisation,
    exInformationEtape.typeStructure,
    exInformationEtape.tailleAvecSousEtapeActivite,
  );
const collec4EtapesAvecConditionnelleEnAvantDernier =
  new CollectionInformationsEtapes(
    exInformationEtape.localisation,
    exInformationEtape.typeStructure,
    exInformationEtape.tailleAvecSousEtapeActivite,
    exInformationEtape.typeStructure,
  );
const ExemplesCollection = {
  longueur2: { simple: collectionInformationsEtapesLongueur2Simple },
  longueur3: {
    avecSousEtape: { enDernier: collec3EtapesAvecConditionnelleEnDernier },
  },
  longueur4: {
    avecSousEtape: {
      enAvantDernier: collec4EtapesAvecConditionnelleEnAvantDernier,
    },
  },
};
const etatEtapesInitial = new EtatEtapes(
  ExemplesCollection.longueur2.simple,
  indiceEtapeInitiale,
);
const etatEtapes2AvecConditionnelle3 = new EtatEtapes(
  ExemplesCollection.longueur3.avecSousEtape.enDernier,
  1,
);

const etatEtapes3 = new EtatEtapes(
  ExemplesCollection.longueur3.avecSousEtape.enDernier,
  2,
);

const etatEtapes3avantDernier = new EtatEtapes(
  ExemplesCollection.longueur4.avecSousEtape.enAvantDernier,
  2,
  0,
);

const etatEtapes3_1avantDernier = new EtatEtapes(
  ExemplesCollection.longueur4.avecSousEtape.enAvantDernier,
  2,
  1,
);

const etatEtapes4avantDernier = new EtatEtapes(
  ExemplesCollection.longueur4.avecSousEtape.enAvantDernier,
  3,
  0,
);

const etatEtapes3SousEtapeAttendu = new EtatEtapes(
  ExemplesCollection.longueur3.avecSousEtape.enDernier,
  2,
  1,
);

const exEtatEtape = {
  longueur2: { etapeInitiale: etatEtapesInitial },
  longueur3: {
    etape2: etatEtapes2AvecConditionnelle3,
    etape3: etatEtapes3,
    etape3_1: etatEtapes3SousEtapeAttendu,
  },
  longueur4: {
    etape3: etatEtapes3avantDernier,
    etape3_1: etatEtapes3_1avantDernier,
    etape4: etatEtapes4avantDernier,
  },
};
describe(EtatEtapes, () => {
  const attendUneEtapeCourante = (
    etatEtapes: EtatEtapes,
    numeroCourantAttendu: number,
    contenuEtapeAttendu: InformationsEtape,
  ) => {
    expect(etatEtapes.numero).toStrictEqual(numeroCourantAttendu);
    expect(etatEtapes.contenuEtapeCourante).toStrictEqual(contenuEtapeAttendu);
  };

  it("se construit avec une collection d'étapes", () => {
    const etatEtapes = exEtatEtape.longueur2.etapeInitiale;

    expect(etatEtapes).toBeInstanceOf(EtatEtapes);
    expect(etatEtapes.collectionEtapes).toStrictEqual(
      ExemplesCollection.longueur2.simple,
    );
    attendUneEtapeCourante(etatEtapes, 1, exInformationEtape.localisation);
  });

  describe("Avancement nominal", () => {
    it("renvoie l'étape 2 quand suivant est appelé depuis l'étape 1", () => {
      const etatEtapes =
        exEtatEtape.longueur2.etapeInitiale.suivant(donneesVides);
      attendUneEtapeCourante(etatEtapes, 2, exInformationEtape.typeStructure);
    });

    it("renvoie l'étape 1 quand precedent est appelé depuis l'étape 2", () => {
      const etatEtapes = exEtatEtape.longueur2.etapeInitiale
        .suivant(donneesVides)
        .precedent(donneesVides);

      attendUneEtapeCourante(etatEtapes, 1, exInformationEtape.localisation);
    });

    it("renvoie l'étape courante avant l'étape 1", () => {
      const etatEtapes =
        exEtatEtape.longueur2.etapeInitiale.precedent(donneesVides);
      attendUneEtapeCourante(etatEtapes, 1, exInformationEtape.localisation);
    });
  });

  describe("Sous-étapes conditionnelles", () => {
    it("renvoie l'étape 3 après l'étape 2", () => {
      const etatEtapeResultant =
        exEtatEtape.longueur3.etape2.suivant(donneesVides);

      attendUneEtapeCourante(
        etatEtapeResultant,
        3,
        exInformationEtape.tailleAvecSousEtapeActivite,
      );
    });
    it("renvoie l'étape 3 bis après l'étape 3", () => {
      const etatEtapeResultant =
        exEtatEtape.longueur3.etape3.suivant(donneesVides);

      expect(etatEtapeResultant).toStrictEqual(exEtatEtape.longueur3.etape3_1);
      attendUneEtapeCourante(
        etatEtapeResultant,
        3,
        exInformationEtape.sousEtapeActivite,
      );
    });

    it("renvoie l'étape 3 avant l'étape 3 bis", () => {
      const etatEtapeResultant =
        exEtatEtape.longueur3.etape3_1.precedent(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(exEtatEtape.longueur3.etape3);

      attendUneEtapeCourante(
        etatEtapeResultant,
        3,
        exInformationEtape.tailleAvecSousEtapeActivite,
      );
    });

    it("renvoie l'étape 2 avant l'étape 3", () => {
      const etatEtapeResultant =
        exEtatEtape.longueur3.etape3.precedent(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(exEtatEtape.longueur3.etape2);

      attendUneEtapeCourante(
        etatEtapeResultant,
        2,
        exInformationEtape.typeStructure,
      );
    });

    it("renvoie l'étape courante 3 après l'étape 3 bis", () => {
      const etatEtapeAttendue = new EtatEtapes(
        collec3EtapesAvecConditionnelleEnDernier,
        2,
        1,
      );

      const etatEtapeResultant =
        etatEtapes3SousEtapeAttendu.suivant(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(etatEtapeAttendue);

      attendUneEtapeCourante(etatEtapeResultant, 3, etapeActivite);
    });
    it("renvoie l'étape 4 après l'étape 3 bis", () => {
      const etatEtapeAttendue = exEtatEtape.longueur4.etape4;

      const etatEtapeResultant =
        exEtatEtape.longueur4.etape3_1.suivant(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(etatEtapeAttendue);

      attendUneEtapeCourante(
        etatEtapeResultant,
        4,
        exInformationEtape.typeStructure,
      );
    });
    it("renvoie l'étape 3 avant l'étape 4", () => {
      const etatEtapeAttendue = exEtatEtape.longueur4.etape3;

      const etatEtapeResultant =
        exEtatEtape.longueur4.etape4.precedent(donneesVides);
      expect(etatEtapeResultant).toStrictEqual(etatEtapeAttendue);

      attendUneEtapeCourante(
        etatEtapeResultant,
        3,
        exInformationEtape.tailleAvecSousEtapeActivite,
      );
    });
  });
});
