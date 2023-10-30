import { CollectionInformationsEtapes } from "../../../../src/Services/Simulateur/CollectionInformationsEtapes";
import {
  exInformationEtape,
  informationEtapeForm,
  informationEtapeResult,
} from "./informationEtape.exemples";
import { etapeInexistante } from "../../../../src/Services/Simulateur/InformationsEtape";

const collectionInformationsEtapesLongueur2Simple =
  new CollectionInformationsEtapes(
    exInformationEtape.form1,
    exInformationEtape.form2,
  );
const derniereEtapeFormEvitable = new CollectionInformationsEtapes(
  exInformationEtape.form1,
  exInformationEtape.evitable.toujours,
  exInformationEtape.form2,
);
const collec3EtapesAvecConditionnelleEnDernier =
  new CollectionInformationsEtapes(
    exInformationEtape.form1,
    exInformationEtape.form2,
    exInformationEtape.etapeAvecSousEtape,
  );

const collec4EtapesAvecConditionnelleEnAvantDernier =
  new CollectionInformationsEtapes(
    exInformationEtape.form1,
    exInformationEtape.form2,
    exInformationEtape.etapeAvecSousEtape,
    exInformationEtape.form2,
  );

export const collectionInformationsEtapesAvecInexistantes =
  new CollectionInformationsEtapes(
    informationEtapeResult,
    exInformationEtape.form1,
    informationEtapeResult,
    exInformationEtape.form2,
    informationEtapeForm,
    etapeInexistante,
  );

export const exCollectionInformationEtape = {
  longueur2: {
    simple: collectionInformationsEtapesLongueur2Simple,
  },
  longueur3: {
    avecSousEtape: { enDernier: collec3EtapesAvecConditionnelleEnDernier },
    avecEtapeEvitable: { enAvantDernier: derniereEtapeFormEvitable },
  },
  longueur4: {
    avecSousEtape: {
      enAvantDernier: collec4EtapesAvecConditionnelleEnAvantDernier,
    },
  },
};
