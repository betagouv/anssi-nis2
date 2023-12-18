import { DesignationOperateurServicesEssentiels } from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const recupereLibelleReponseOSE = (
  value: DesignationOperateurServicesEssentiels,
  reponsesDesigneOse: Record<DesignationOperateurServicesEssentiels, string>,
) => reponsesDesigneOse[value];
export const transformeReponsesDesigneOSEPourSelect: TransformeRecordToSelect<DesignationOperateurServicesEssentiels> =
  genereTransformateurValeursVersOptions(
    recupereLibelleReponseOSE,
    "designeOperateurServicesEssentiels",
  );
