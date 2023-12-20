import { AppartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

export const transformePaysUnionEuropeennePourSelect: TransformeRecordToSelect<AppartenancePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    (
      value: string,
      paysUnionEuropeenne: Record<AppartenancePaysUnionEuropeenne, string>,
    ) => paysUnionEuropeenne[value as AppartenancePaysUnionEuropeenne],
    "etatMembre",
  );
