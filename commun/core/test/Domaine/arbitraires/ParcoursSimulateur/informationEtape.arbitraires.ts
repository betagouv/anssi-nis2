import { fc } from "@fast-check/vitest";
import { fabriquesInformationsEtapes } from "../../../../src/Domain/Simulateur/InformationsEtape.fabrique";
import { faussaireInformationEtapeForm } from "../../exemples/InformationEtape.faussaire";

export const arbInformationEtapeForm = fc
  .record({ titre: fc.string() })
  .map(faussaireInformationEtapeForm);
export const arbInformationEtapeFormAvecSousEtape = fc
  .record({ titre: fc.string(), sousTitre: fc.string() })
  .map(faussaireInformationEtapeForm);
export const arbInformationEtapeResult = fc
  .string()
  .map(fabriquesInformationsEtapes.resultat);
export const arbEtapeFormOuResult = fc.oneof(
  arbInformationEtapeForm,
  arbInformationEtapeResult,
);
export const arbitrairesInformationEtape = {
  form: {
    simple: arbInformationEtapeForm,
    avecSousEtape: arbInformationEtapeFormAvecSousEtape,
  },
  resultat: arbInformationEtapeResult,
  mix: arbEtapeFormOuResult,
};
