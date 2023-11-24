import { DesignationOperateurServicesEssentiels } from "../../../../../anssi-nis2-domain/src/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/optionChampSimulateur";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const recupereLibelleReponseOSE = (
  value: string,
  reponsesDesigneOse: Partial<
    Record<DesignationOperateurServicesEssentiels, string>
  >,
) =>
  reponsesDesigneOse[value as DesignationOperateurServicesEssentiels] || value;
export const transformeReponsesDesigneOSEPourSelect: TransformeRecordToSelect<DesignationOperateurServicesEssentiels> =
  genereTransformateurValeursVersOptions(
    recupereLibelleReponseOSE,
    "designeOperateurServicesEssentiels",
  );
