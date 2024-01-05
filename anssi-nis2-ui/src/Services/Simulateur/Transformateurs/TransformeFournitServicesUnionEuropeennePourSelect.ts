import { FournitServicesUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { TransformeRecordToSelect } from "../Operations/OptionsChampsSimulateur.declarations.ts";
import { genereTransformateurValeursVersOptions } from "../genereTransformateurValeursVersOptions.ts";

const recupereLibelleFournitServicesUnionEuropeenne = (
  value: string,
  reponsesFournitServicesUnionEuropeenne: Record<
    FournitServicesUnionEuropeenne,
    string
  >,
) =>
  reponsesFournitServicesUnionEuropeenne[
    value as FournitServicesUnionEuropeenne
  ];

export const transformeFournitServicesUnionEuropeennePourSelect: TransformeRecordToSelect<FournitServicesUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    recupereLibelleFournitServicesUnionEuropeenne,
    "fournitServicesUnionEuropeenne",
  );
