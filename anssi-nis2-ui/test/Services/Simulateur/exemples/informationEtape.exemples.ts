import {
  fausseValidationReponse,
  FauxSimulateurEtapeComposant,
} from "../InformationEtape.faussaire";
import {
  fabriquesInformationsEtapes,
  optionsInformationEtapeFormParDefaut,
} from "../../../../src/Domaine/Simulateur/fabriques/InformationsEtape.fabrique";
import { SousEtapeConditionnelle } from "../../../../src/Domaine/Simulateur/InformationsEtape";
import { toujoursFaux } from "../../../../src/Domaine/Commun/Commun.predicats";

export const predicatVrai = () => true;
const informationEtapeResult = fabriquesInformationsEtapes.resultat("Resultat");

const fabriqueFausseInformationEtapeForm = (
  titre: string,
  options = optionsInformationEtapeFormParDefaut,
) => {
  return fabriquesInformationsEtapes.form(
    titre,
    fausseValidationReponse,
    FauxSimulateurEtapeComposant,
    options,
  );
};

const informationEtapeForm = fabriqueFausseInformationEtapeForm("Etape Form");
const informationEtapeForm1 =
  fabriqueFausseInformationEtapeForm("Etape Form 1");
const informationEtapeForm2 =
  fabriqueFausseInformationEtapeForm("Etape Form 2");

const informationEtapeFormToujoursEvitee = fabriqueFausseInformationEtapeForm(
  "Etape Form Evitée",
  {
    ignoreSi: () => true,
  },
);
const informationEtapeFormJamaisEvitee = fabriqueFausseInformationEtapeForm(
  "Etape Form Non Evitée",
  {
    ignoreSi: () => false,
  },
);

const informationSousEtapeForm =
  fabriqueFausseInformationEtapeForm("Sous-étape");
const sousEtapeToujoursPresente: SousEtapeConditionnelle = {
  condition: predicatVrai,
  sousEtape: informationSousEtapeForm,
};
const etapeEmployesAvecSousEtapeActivite = fabriqueFausseInformationEtapeForm(
  "Contient une sous Etape",
  {
    sousEtapeConditionnelle: sousEtapeToujoursPresente,
    ignoreSi: toujoursFaux,
  },
);

const infoEtapesVariantesPriveePublique = fabriquesInformationsEtapes.variantes(
  [
    {
      etape: informationEtapeForm1,
      conditions: { typeStructure: ["privee"] },
    },
    {
      etape: informationEtapeForm2,
      conditions: { typeStructure: ["publique"] },
    },
  ],
);

export const exInformationEtape = {
  form: informationEtapeForm,
  form1: informationEtapeForm1,
  form2: informationEtapeForm2,
  sousEtape: informationSousEtapeForm,
  resultat: informationEtapeResult,
  etapeAvecSousEtape: etapeEmployesAvecSousEtapeActivite,
  evitable: {
    toujours: informationEtapeFormToujoursEvitee,
    jamais: informationEtapeFormJamaisEvitee,
  },
  variante: infoEtapesVariantesPriveePublique,
};
