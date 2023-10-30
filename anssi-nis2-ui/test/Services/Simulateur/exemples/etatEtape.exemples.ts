import { EtatEtapesManipulable } from "../../../../src/Services/Simulateur/EtatEtapes";
import { exCollectionInformationEtape } from "./collectionInformationEtape.exemples";

const indiceEtapeInitiale = 0;
const etatEtapesInitial = new EtatEtapesManipulable(
  exCollectionInformationEtape.longueur2.simple,
  indiceEtapeInitiale,
);

const avantDerniereEtapeEvitable = new EtatEtapesManipulable(
  exCollectionInformationEtape.longueur3.avecEtapeEvitable.enAvantDernier,
  indiceEtapeInitiale,
);

const avantDerniereEtapeEvitable_etatDerniereEtape = new EtatEtapesManipulable(
  exCollectionInformationEtape.longueur3.avecEtapeEvitable.enAvantDernier,
  2,
);

const etatEtapes2AvecConditionnelle3 = new EtatEtapesManipulable(
  exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
  1,
);
const etatEtapes3 = new EtatEtapesManipulable(
  exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
  2,
);
const etatEtapes3avantDernier = new EtatEtapesManipulable(
  exCollectionInformationEtape.longueur4.avecSousEtape.enAvantDernier,
  2,
  0,
);
const etatEtapes3_1avantDernier = new EtatEtapesManipulable(
  exCollectionInformationEtape.longueur4.avecSousEtape.enAvantDernier,
  2,
  1,
);
const etatEtapes4avantDernier = new EtatEtapesManipulable(
  exCollectionInformationEtape.longueur4.avecSousEtape.enAvantDernier,
  3,
  0,
);
const etatEtapes3SousEtapeAttendu = new EtatEtapesManipulable(
  exCollectionInformationEtape.longueur3.avecSousEtape.enDernier,
  2,
  1,
);

export const exEtatEtape = {
  longueur2: {
    etapeInitiale: etatEtapesInitial,
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
