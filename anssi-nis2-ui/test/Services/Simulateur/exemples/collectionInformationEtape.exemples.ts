import { CollectionInformationsEtapes } from "../../../../../anssi-nis2-domain/src/Simulateur/CollectionInformationsEtapes";
import { exInformationEtape } from "./informationEtape.exemples";

import { EtapeInexistante } from "../../../../../anssi-nis2-domain/src/Simulateur/fabriques/InformationsEtape.fabrique";

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

const collec3EtapesAvecVarianteEnDeuxieme = new CollectionInformationsEtapes(
  exInformationEtape.form1,
  exInformationEtape.variante,
  exInformationEtape.form2,
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
    exInformationEtape.resultat,
    exInformationEtape.form1,
    exInformationEtape.resultat,
    exInformationEtape.form2,
    exInformationEtape.form,
    EtapeInexistante,
  );

export const exCollectionInformationEtape = {
  longueur2: {
    simple: collectionInformationsEtapesLongueur2Simple,
  },
  longueur3: {
    avecSousEtape: { enDernier: collec3EtapesAvecConditionnelleEnDernier },
    avecEtapeEvitable: { enAvantDernier: derniereEtapeFormEvitable },
    avecVariante: { enDeuxieme: collec3EtapesAvecVarianteEnDeuxieme },
  },
  longueur4: {
    avecSousEtape: {
      enAvantDernier: collec4EtapesAvecConditionnelleEnAvantDernier,
    },
  },
};
