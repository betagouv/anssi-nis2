import { fc } from "@fast-check/vitest";
import { faussaireInformationEtapeForm } from "../InformationEtape.faussaire";
import { fabriqueInformationsEtapes } from "../../../../src/Domaine/Simulateur/fabriques/InformationsEtape.fabrique";

export const arbInformationEtapeForm = fc
  .record({ titre: fc.string() })
  .map(faussaireInformationEtapeForm);
export const arbInformationEtapeFormAvecSousEtape = fc
  .record({ titre: fc.string(), sousTitre: fc.string() })
  .map(faussaireInformationEtapeForm);
export const arbInformationEtapeResult = fc
  .string()
  .map(fabriqueInformationsEtapes.resultat);
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
