import { CollectionInformationsEtapes } from "../../../../src/Services/Simulateur/CollectionInformationsEtapes";
import { exInformationEtape } from "./informationEtapeForm.exemples";
import {
  etapeInexistante,
  InformationEtapeForm,
  InformationEtapeResult,
} from "../../../../src/Services/Simulateur/InformationsEtape";
import {
  fausseValidationReponse,
  FauxSimulateurEtapeComposant,
} from "../fabriquesInformationEtape";

const collectionInformationsEtapesLongueur2Simple =
  new CollectionInformationsEtapes(
    exInformationEtape.form1,
    exInformationEtape.form2,
  );

const derniereEtapeEvitable = new CollectionInformationsEtapes(
  exInformationEtape.form1,
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
    new InformationEtapeResult(""),
    exInformationEtape.form1,
    new InformationEtapeResult(""),
    exInformationEtape.form2,
    new InformationEtapeForm(
      "",
      fausseValidationReponse,
      FauxSimulateurEtapeComposant,
    ),
    etapeInexistante,
  );

export const exCollectionInformationEtape = {
  longueur2: {
    simple: collectionInformationsEtapesLongueur2Simple,
    derniereEtapeEvitable: derniereEtapeEvitable,
  },
  longueur3: {
    avecSousEtape: { enDernier: collec3EtapesAvecConditionnelleEnDernier },
  },
  longueur4: {
    avecSousEtape: {
      enAvantDernier: collec4EtapesAvecConditionnelleEnAvantDernier,
    },
  },
};
