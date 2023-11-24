import { vi } from "vitest";
import { ValidationReponses } from "../../src/Simulateur/services/ChampsSimulateur/champs.domaine";
import { SimulateurEtapeNodeComponent } from "anssi-nis2-ui/src/Services/Simulateur/Props/component";
import { fabriquesInformationsEtapes } from "anssi-nis2-ui/src/Services/Simulateur/InformationsEtape.fabrique";

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
