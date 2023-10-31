import { vi } from "vitest";
import { ValidationReponses } from "../../../src/Domaine/Simulateur/operations/validateursChamps";
import { SimulateurEtapeNodeComponent } from "../../../src/Services/Simulateur/Props/component";
import {
  fabriqueInformationsEtapes,
  fabriqueSousEtapeConditionnelle,
} from "../../../src/Domaine/Simulateur/fabriques/InformationsEtape.fabrique";

export const fausseValidationReponse: ValidationReponses = {
  message: "Fausse validation",
  validateur: vi.fn(),
};
export const FauxSimulateurEtapeComposant: SimulateurEtapeNodeComponent =
  vi.fn();
export const faussaireInformationEtapeForm = ({
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
          fabriqueInformationsEtapes.form(
            sousTitre,
            fausseValidationReponse,
            FauxSimulateurEtapeComposant,
          ),
        ),
      }
    : {};
  return fabriqueInformationsEtapes.form(
    titre,
    fausseValidationReponse,
    FauxSimulateurEtapeComposant,
    options,
  );
};
