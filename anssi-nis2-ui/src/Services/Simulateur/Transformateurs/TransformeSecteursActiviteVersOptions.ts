import { SecteurActivite } from "../../../Domaine/Simulateur/SecteurActivite.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/optionChampSimulateur";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

export const getSecteurActiviteLabel = (
  value: string,
  secteurActivite: Partial<Record<SecteurActivite, string>>,
) => secteurActivite[value as SecteurActivite] || value;
export const transformeSecteursActiviteVersOptions: TransformeRecordToSelect<SecteurActivite> =
  genereTransformateurValeursVersOptions(
    getSecteurActiviteLabel,
    "secteurActivite",
  );
