import { GenerateurLibelle } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { SousSecteurActivite } from "../../../Domaine/Simulateur/SousSecteurActivite.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const getSousSecteurLabel: GenerateurLibelle<SousSecteurActivite> = (
  value: string,
  sousSecteur: Record<SousSecteurActivite, string>,
) => sousSecteur[value as SousSecteurActivite] || value;
export const transformateurSousSecteurActivite: TransformeRecordToSelect<SousSecteurActivite> =
  genereTransformateurValeursVersOptions(
    getSousSecteurLabel,
    "sousSecteurActivite",
  );
