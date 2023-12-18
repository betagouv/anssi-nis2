import { SecteurActivite } from "../../../Domaine/Simulateur/SecteurActivite.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

export const getSecteurActiviteLabel = (
  value: SecteurActivite,
  secteurActivite: Record<SecteurActivite, string>,
) => secteurActivite[value];
export const transformeSecteursActiviteVersOptions: TransformeRecordToSelect<SecteurActivite> =
  genereTransformateurValeursVersOptions(
    getSecteurActiviteLabel,
    "secteurActivite",
  );
