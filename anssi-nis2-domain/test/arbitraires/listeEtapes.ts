import { fc } from "@fast-check/vitest";
import { arbitrairesInformationEtape } from "./informationEtape";

const farbiqueArbitraireListeEtapeEtIndices = (
  arrayOptions = {},
  arbitraireElement = arbitrairesInformationEtape.mix,
) =>
  fc.array(arbitraireElement, arrayOptions).chain((liste) =>
    fc.record({
      listeEtapes: fc.constant(liste),
      indice: fc.nat(liste.length),
    }),
  );
export const arbListeEtapesEtIndice = farbiqueArbitraireListeEtapeEtIndices();
export const arbListeFormEtResult = fc.record({
  listeEtapesForm: fc.array(arbitrairesInformationEtape.form.simple, {
    minLength: 1,
  }),
  listeEtapesResult: fc.array(arbitrairesInformationEtape.resultat, {
    minLength: 1,
  }),
});
