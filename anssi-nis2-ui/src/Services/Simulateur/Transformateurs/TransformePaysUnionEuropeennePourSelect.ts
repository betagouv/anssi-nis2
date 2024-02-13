import { appartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

export const transformePaysUnionEuropeennePourSelect: TransformeRecordToSelect<appartenancePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    (
      value: string,
      paysUnionEuropeenne: Record<appartenancePaysUnionEuropeenne, string>,
    ) => paysUnionEuropeenne[value as appartenancePaysUnionEuropeenne],
    "appartenancePaysUnionEuropeenne",
  );
