import { ValeurChampSimulateur } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import {
  DonneesFormulaireSimulateur,
  NomsChampsSimulateur,
} from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { GestionValeursFormulaire } from "./Props/gestionValeursFormulaire";

export const gestionValeursSimples = (value: ValeurChampSimulateur) => [value];

export const genereGestionValeursMultiples = (name: NomsChampsSimulateur) => {
  function gestionValeursMultiples(
    value: ValeurChampSimulateur,
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) {
    const valeursChampFormulaire: ValeurChampSimulateur[] =
      donneesFormulaire[name];
    if (valeursChampFormulaire.indexOf(value) === -1) {
      return [...valeursChampFormulaire, value];
    }
    return valeursChampFormulaire.filter((content) => content !== value);
  }

  return gestionValeursMultiples;
};

export const gestionnairesDeChamp: Record<
  NomsChampsSimulateur,
  GestionValeursFormulaire
> = {
  designationOperateurServicesEssentiels: gestionValeursSimples,
  appartenancePaysUnionEuropeenne: gestionValeursSimples,
  secteurActivite: genereGestionValeursMultiples("secteurActivite"),
  sousSecteurActivite: genereGestionValeursMultiples("sousSecteurActivite"),
  activites: genereGestionValeursMultiples("activites"),
  trancheChiffreAffaire: gestionValeursSimples,
  trancheNombreEmployes: gestionValeursSimples,
  typeStructure: gestionValeursSimples,
  typeEntitePublique: gestionValeursSimples,
  localisationFournitureServicesNumeriques: genereGestionValeursMultiples(
    "localisationFournitureServicesNumeriques",
  ),
  paysDecisionsCyber: gestionValeursSimples,
  paysOperationsCyber: gestionValeursSimples,
  paysPlusGrandNombreSalaries: gestionValeursSimples,
};

export const gestionnairesPourChamps = (
  name: NomsChampsSimulateur,
): GestionValeursFormulaire => gestionnairesDeChamp[name];
