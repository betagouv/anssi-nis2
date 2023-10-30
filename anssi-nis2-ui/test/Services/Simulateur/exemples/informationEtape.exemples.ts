import {
  InformationEtapeForm,
  InformationEtapeResultat,
  OptionsInformationEtapeForm,
  optionsInformationEtapeFormParDefaut,
  SousEtapeConditionnelle,
} from "../../../../src/Services/Simulateur/InformationsEtape";
import {
  fausseValidationReponse,
  FauxSimulateurEtapeComposant,
} from "../fabriquesInformationEtape";

export const predicatVrai = () => true;
export const informationEtapeResult = new InformationEtapeResultat("Resultat");

const fabriqueFausseInformationEtapeForm = (
  titre: string,
  options: OptionsInformationEtapeForm = optionsInformationEtapeFormParDefaut,
) =>
  new InformationEtapeForm(
    titre,
    fausseValidationReponse,
    FauxSimulateurEtapeComposant,
    options,
  );

export const informationEtapeForm =
  fabriqueFausseInformationEtapeForm("Etape Form");
export const informationEtapeForm1 =
  fabriqueFausseInformationEtapeForm("Etape Form 1");
export const informationEtapeForm2 =
  fabriqueFausseInformationEtapeForm("Etape Form 2");

export const informationEtapeFormToujoursEvitee =
  fabriqueFausseInformationEtapeForm("Etape Form Evitée", {
    ignoreSi: () => true,
  });
export const informationEtapeFormJamaisEvitee =
  fabriqueFausseInformationEtapeForm("Etape Form Non Evitée", {
    ignoreSi: () => false,
  });

export const informationSousEtapeForm =
  fabriqueFausseInformationEtapeForm("Sous-étape");
const sousEtapeToujoursPresente = new SousEtapeConditionnelle(
  predicatVrai,
  informationSousEtapeForm,
);
const etapeEmployesAvecSousEtapeActivite = fabriqueFausseInformationEtapeForm(
  "Contient une sous Etape",
  { sousEtapeConditionnelle: sousEtapeToujoursPresente },
);

export const exInformationEtape = {
  form1: informationEtapeForm1,
  form2: informationEtapeForm2,
  sousEtape: informationSousEtapeForm,
  etapeAvecSousEtape: etapeEmployesAvecSousEtapeActivite,
  evitable: {
    toujours: informationEtapeFormToujoursEvitee,
    jamais: informationEtapeFormJamaisEvitee,
  },
};
