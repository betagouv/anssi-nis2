import { vi } from "vitest";
import { ValidationReponses } from "../../../../anssi-nis2-domain/src/Simulateur/services/ChampsSimulateur/champs.domaine";
import { SimulateurEtapeNodeComponent } from "../../../src/Services/Simulateur/Props/component";
import { fabriquesInformationsEtapes } from "../../../../anssi-nis2-domain/src/Simulateur/fabriques/InformationsEtape.fabrique";

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
