import { appartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getPaysUnionEuropeenneElement = (
  value: string,
  paysUnionEuropeenne: Record<appartenancePaysUnionEuropeenne, string>,
) => paysUnionEuropeenne[value as appartenancePaysUnionEuropeenne];
export const transformeLocalisationRepresentantPourSelect: TransformeRecordToSelect<appartenancePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    getPaysUnionEuropeenneElement,
    "localisationRepresentant",
  );
