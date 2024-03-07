import { fc } from "@fast-check/vitest";
import { fabriqueCollectionInformationsEtapes } from "../../../src/Domain/Simulateur/CollectionInformationsEtapes.fabriques";
import { arbitrairesInformationEtape } from "./informationEtape.arbitraires";
import { arbListeFormEtResult } from "./listeEtapes";

export const arbRecListeEtapesCommencantParNForm = arbListeFormEtResult.chain(
  (tuple) =>
    fc.record({
      nombreEtapesForm: fc.constant(tuple.listeEtapesForm.length),
      collection: fc.constant(
        fabriqueCollectionInformationsEtapes(
          tuple.listeEtapesForm,
          tuple.listeEtapesResult,
        ),
      ),
    }),
);
export const arbRecListeEtapesCommencantParNResult = arbListeFormEtResult.chain(
  (tuple) =>
    fc.record({
      nombreEtapesForm: fc.constant(tuple.listeEtapesForm.length),
      nombreEtapesResult: fc.constant(tuple.listeEtapesResult.length),
      collection: fc.constant(
        fabriqueCollectionInformationsEtapes(
          tuple.listeEtapesResult,
          tuple.listeEtapesForm,
        ),
      ),
    }),
);
export const arbitrairesCollectionEtape = {
  resultPuisForm: {
    liste: arbRecListeEtapesCommencantParNResult.map((arb) => arb.collection),
    avecNombre: arbRecListeEtapesCommencantParNResult,
  },
  formPuisResult: arbRecListeEtapesCommencantParNForm,
  form: fc
    .array(arbitrairesInformationEtape.form.simple)
    .map(fabriqueCollectionInformationsEtapes),
};
