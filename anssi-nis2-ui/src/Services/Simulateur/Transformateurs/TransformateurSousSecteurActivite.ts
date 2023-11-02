import { GenerateurLibelle } from "../Operations/operationsLibelles";
import { SousSecteurActivite } from "../../../Domaine/Simulateur/SousSecteurActivite.definition.ts";
import { TransformeRecordToSelect } from "../Operations/optionChampSimulateur";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getSousSecteurLabel: GenerateurLibelle<SousSecteurActivite> = (
  value: string,
  sousSecteur: Partial<Record<SousSecteurActivite, string>>,
) => sousSecteur[value as SousSecteurActivite] || value;
export const transformateurSousSecteurActivite: TransformeRecordToSelect<SousSecteurActivite> =
  genereTransformateurValeursVersOptions(
    getSousSecteurLabel,
    "sousSecteurActivite",
  );
