import { vi } from "vitest";
import { ValidationReponses } from "../../../src/Domaine/Simulateur/operations/validateursChamps";
import { SimulateurEtapeNodeComponent } from "../../../src/Services/Simulateur/Props/component";
import {
  fabriqueSousEtapeConditionnelle,
  InformationEtapeForm,
} from "../../../src/Services/Simulateur/InformationsEtape";

export const fausseValidationReponse: ValidationReponses = {
  message: "Fausse validation",
  validateur: vi.fn(),
};
export const FauxSimulateurEtapeComposant: SimulateurEtapeNodeComponent =
  vi.fn();
export const fabriqueInformationEtapeForm = ({
  titre,
  sousTitre,
}: {
  titre: string;
  sousTitre?: string;
}) => {
  const options = sousTitre
    ? {
        sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle(
          () => true,
          new InformationEtapeForm(
            sousTitre,
            fausseValidationReponse,
            FauxSimulateurEtapeComposant,
          ),
        ),
      }
    : {};
  return new InformationEtapeForm(
    titre,
    fausseValidationReponse,
    FauxSimulateurEtapeComposant,
    options,
  );
};
