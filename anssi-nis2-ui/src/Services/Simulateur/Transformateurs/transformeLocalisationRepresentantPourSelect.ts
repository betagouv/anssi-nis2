import { AppartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getPaysUnionEuropeenneElement = (
  value: string,
  paysUnionEuropeenne: Record<AppartenancePaysUnionEuropeenne, string>,
) => paysUnionEuropeenne[value as AppartenancePaysUnionEuropeenne];
export const transformeLocalisationRepresentantPourSelect: TransformeRecordToSelect<AppartenancePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    getPaysUnionEuropeenneElement,
    "localisationRepresentant",
  );
