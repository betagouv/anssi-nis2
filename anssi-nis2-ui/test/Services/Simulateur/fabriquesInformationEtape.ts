import { vi } from "vitest";
import { ValidationReponses } from "../../../src/Domaine/Simulateur/Operations/validateursChamps";
import { SimulateurEtapeNodeComponent } from "../../../src/Services/Simulateur/Props/component";
import {
  InformationEtapeForm,
  SousEtapeConditionnelle,
} from "../../../src/Services/Simulateur/InformationsEtape";

export const fausseValidationReponse: ValidationReponses = {
  message: "Fausse validation",
  validateur: vi.fn(),
};
export const FauxSimulateurEtapeComposant: SimulateurEtapeNodeComponent =
  vi.fn();
export const fabriqueInformationEtapeForm = ({ titre, sousTitre }) => {
  const sousEtapeConditionnelle =
    sousTitre &&
    new SousEtapeConditionnelle(
      () => true,
      new InformationEtapeForm(
        sousTitre,
        fausseValidationReponse,
        FauxSimulateurEtapeComposant,
      ),
    );
  return new InformationEtapeForm(
    titre,
    fausseValidationReponse,
    FauxSimulateurEtapeComposant,
    sousEtapeConditionnelle,
  );
};
