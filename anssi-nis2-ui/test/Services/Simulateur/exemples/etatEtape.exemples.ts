import { EtatEtapes } from "../../../../src/Services/Simulateur/EtatEtapes";
import { exCollectionInformationEtape } from "./collectionInformationEtape.exemples";

const indiceEtapeInitiale = 0;
const etatEtapesInitial = new EtatEtapes(
  exCollectionInformationEtape.longueur2.simple,
  indiceEtapeInitiale,
);

const derniereEtapeEvitable = new EtatEtapes(
  exCollectionInformationEtape.longueur2.derniereEtapeEvitable,
  indiceEtapeInitiale,
);

const etatEtapes2AvecConditionnelle3 = new EtatEtapes(
  exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
  1,
);
const etatEtapes3 = new EtatEtapes(
  exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
  2,
);
const etatEtapes3avantDernier = new EtatEtapes(
  exCollectionInformationEtape.longueur4.avecSousEtape.enAvantDernier,
  2,
  0,
);
const etatEtapes3_1avantDernier = new EtatEtapes(
  exCollectionInformationEtape.longueur4.avecSousEtape.enAvantDernier,
  2,
  1,
);
const etatEtapes4avantDernier = new EtatEtapes(
  exCollectionInformationEtape.longueur4.avecSousEtape.enAvantDernier,
  3,
  0,
);
const etatEtapes3SousEtapeAttendu = new EtatEtapes(
  exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
  2,
  1,
);

export const exEtatEtape = {
  longueur2: {
    etapeInitiale: etatEtapesInitial,
    derniereEtapeEvitable: derniereEtapeEvitable,
  },
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
