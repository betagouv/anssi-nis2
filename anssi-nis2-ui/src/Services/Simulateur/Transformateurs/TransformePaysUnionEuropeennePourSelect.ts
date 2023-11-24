import { AppartenancePaysUnionEuropeenne } from "../../../../../anssi-nis2-domain/src/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/optionChampSimulateur";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getPaysUnionEuropeenneElement = (
  value: string,
  paysUnionEuropeenne: Partial<Record<AppartenancePaysUnionEuropeenne, string>>,
) => paysUnionEuropeenne[value as AppartenancePaysUnionEuropeenne] || value;
export const transformePaysUnionEuropeennePourSelect: TransformeRecordToSelect<AppartenancePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    getPaysUnionEuropeenneElement,
    "etatMembre",
  );
