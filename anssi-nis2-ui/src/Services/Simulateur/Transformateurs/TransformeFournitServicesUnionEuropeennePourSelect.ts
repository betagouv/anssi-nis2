import { DesignationOperateurServicesEssentiels, FournitServicesUnionEuropeenne } from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/optionChampSimulateur";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const recupereLibelleFournitServicesUnionEuropeenne = (
  value: string,
  reponsesFournitServicesUnionEuropeenne: Partial<
    Record<FournitServicesUnionEuropeenne, string>
  >,
) =>
  reponsesFournitServicesUnionEuropeenne[value as FournitServicesUnionEuropeenne] || value;
  
export const transformeFournitServicesUnionEuropeennePourSelect: TransformeRecordToSelect<DesignationOperateurServicesEssentiels> =
  genereTransformateurValeursVersOptions(
    recupereLibelleFournitServicesUnionEuropeenne,
    "fournitServicesUnionEuropeenne",
  );
