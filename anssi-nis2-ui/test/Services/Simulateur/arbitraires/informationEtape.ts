import { fc } from "@fast-check/vitest";
import { instancie } from "../../../utilitaires/Instancie";
import { InformationEtapeResultat } from "../../../../src/Services/Simulateur/InformationsEtape";
import { fabriqueInformationEtapeForm } from "../fabriquesInformationEtape";

export const arbInformationEtapeForm = fc
  .record({ titre: fc.string() })
  .map(fabriqueInformationEtapeForm);
export const arbInformationEtapeFormAvecSousEtape = fc
  .record({ titre: fc.string(), sousTitre: fc.string() })
  .map(fabriqueInformationEtapeForm);
export const arbInformationEtapeResult = fc
  .string()
  .map(instancie(InformationEtapeResultat));
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
