import {
  InformationEtapeForm,
  SousEtapeConditionnelle,
} from "../../../../src/Services/Simulateur/InformationsEtape";
import {
  fausseValidationReponse,
  FauxSimulateurEtapeComposant,
} from "../fabriquesInformationEtape";

export const predicatVrai = () => true;
export const informationEtapeForm1 = new InformationEtapeForm(
  "Etape Form 1",
  fausseValidationReponse,
  FauxSimulateurEtapeComposant,
);
export const informationEtapeForm2 = new InformationEtapeForm(
  "Etape Form 2",
  fausseValidationReponse,
  FauxSimulateurEtapeComposant,
);
export const informationSousEtapeForm = new InformationEtapeForm(
  "Sous-étape",
  fausseValidationReponse,
  FauxSimulateurEtapeComposant,
);
const sousEtapeToujoursPresente = new SousEtapeConditionnelle(
  predicatVrai,
  informationSousEtapeForm,
);
const etapeEmployesAvecSousEtapeActivite = new InformationEtapeForm(
  "Contient une sous Etape",
  fausseValidationReponse,
  FauxSimulateurEtapeComposant,
  { sousEtapeConditionnelle: sousEtapeToujoursPresente },
);
export const exInformationEtape = {
  form1: informationEtapeForm1,
  form2: informationEtapeForm2,
  sousEtape: informationSousEtapeForm,
  etapeAvecSousEtape: etapeEmployesAvecSousEtapeActivite,
};
