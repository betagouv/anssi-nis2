import { fc } from "@fast-check/vitest";
import { fabriquesInformationsEtapes } from "anssi-nis2-ui/src/Services/Simulateur/InformationsEtape.fabrique";
import { InformationsEtape } from "../../src/Simulateur/InformationsEtape";
import { faussaireInformationEtapeForm } from "../utilitaires/InformationEtape.faussaire";

export const arbInformationEtapeForm = fc
  .record({ titre: fc.string() })
  .map(faussaireInformationEtapeForm);
export const arbInformationEtapeFormAvecSousEtape: fc.Arbitrary<
  InformationsEtape<unknown>
> = fc
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
