import { exCollectionInformationEtape } from "./collectionInformationEtape.exemples";
import { fabriqueEtatEtape } from "../../../../src/Domaine/Simulateur/fabriques/fabriqueEtatEtape";

const indiceEtapeInitiale = 0;
const etatEtapesInitial = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur2.simple,
  indiceEtapeInitiale,
);
const etatEtapes2 = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur2.simple,
  1,
);

const avantDerniereEtapeEvitable = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur3.avecEtapeEvitable.enAvantDernier,
  indiceEtapeInitiale,
);

const avantDerniereEtapeEvitable_etatDerniereEtape = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur3.avecEtapeEvitable.enAvantDernier,
  2,
);

const etatEtapes2AvecConditionnelle3 = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
  1,
);
const etatEtapes3 = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
  2,
);
const etatEtapes3avantDernier = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur4.avecSousEtape.enAvantDernier,
  2,
  0,
);
const etatEtapes3_1avantDernier = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur4.avecSousEtape.enAvantDernier,
  2,
  1,
);
const etatEtapes4avantDernier = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur4.avecSousEtape.enAvantDernier,
  3,
  0,
);
const etatEtapes3SousEtapeAttendu = fabriqueEtatEtape(
  exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
  2,
  1,
);

export const exEtatEtape = {
  longueur2: {
    etapeInitiale: etatEtapesInitial,
    etape2: etatEtapes2,
  },
  longueur3: {
    etape2: etatEtapes2AvecConditionnelle3,
    etape3: etatEtapes3,
    etape3_1: etatEtapes3SousEtapeAttendu,
    avantDerniereEtapeEvitable: {
      etapeInitiale: avantDerniereEtapeEvitable,
      etape3: avantDerniereEtapeEvitable_etatDerniereEtape,
    },
  },
  longueur4: {
    etape3: etatEtapes3avantDernier,
    etape3_1: etatEtapes3_1avantDernier,
    etape4: etatEtapes4avantDernier,
  },
};
