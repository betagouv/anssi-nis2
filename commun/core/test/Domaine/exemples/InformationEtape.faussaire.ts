import { vi } from "vitest";
import { fabriquesInformationsEtapes } from "../../../src/Domain/Simulateur/fabriques/InformationsEtape.fabrique";
import { TypeEtape } from "../../../src/Domain/Simulateur/InformationsEtape";
import { ValidationReponses } from "../../../src/Domain/Simulateur/services/ChampSimulateur/champs.domaine";

export const fausseValidationReponse: ValidationReponses = {
  message: "Fausse validation",
  validateur: vi.fn(),
};
export const FauxSimulateurEtapeComposant: TypeEtape =
  "designationOperateurServicesEssentiels";
export const faussaireInformationEtapeForm = ({
  titre,
  sousTitre,
}: {
  titre: string;
  sousTitre?: string;
}) => {
  const options = sousTitre
    ? {
        sousEtapeConditionnelle:
          fabriquesInformationsEtapes.sousEtapeConditionnelle(
            () => true,
            fabriquesInformationsEtapes.form(
              sousTitre,
              fausseValidationReponse,
              FauxSimulateurEtapeComposant,
            ),
          ),
      }
    : {};
  return fabriquesInformationsEtapes.form(
    titre,
    fausseValidationReponse,
    FauxSimulateurEtapeComposant,
    options,
  );
};
