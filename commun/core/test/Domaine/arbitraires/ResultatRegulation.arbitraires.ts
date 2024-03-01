import { fc } from "@fast-check/vitest";
import { ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement } from "../../../src/Domain/Simulateur/Eligibilite.constantes";
import {
  fabriqueRegule,
  resultatReguleOSE,
} from "../../../src/Domain/Simulateur/fabriques/ResultatRegulation.fabrique";
import { resultatIncertain } from "../../../src/Domain/Simulateur/Regulation.constantes";
import {
  CausesRegulation,
  ResultatRegulationEntite,
} from "../../../src/Domain/Simulateur/Regulation.definitions";
import { arrayOfOne } from "../../utilitaires/manipulationArbitraires";

export const generateurResultatRegulationConstants = fc.constantFrom(
  resultatIncertain,
  resultatReguleOSE,
);

export const generateurResultatRegulationInfranum = fc
  .record<CausesRegulation>({
    secteurActivite: fc.constant(["infrastructureNumerique"]),
    activites: arrayOfOne(
      ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement,
    ),
    fournitServicesUnionEuropeenne: fc.constant(["oui"]),
    localisationRepresentant: fc.constant(["france"]),
  })
  .chain((cause) =>
    fc.constant(fabriqueRegule(cause)),
  ) as fc.Arbitrary<ResultatRegulationEntite>;

export const arbitrairesResultatRegulation = fc.oneof(
  generateurResultatRegulationConstants,
  generateurResultatRegulationInfranum,
);
