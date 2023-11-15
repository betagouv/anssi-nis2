import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-ui/src/Domaine/Simulateur/DonneesFormulaire";

export type SimulateurFormData = IDonneesBrutesFormulaireSimulateur;
export const donneesSimulateurVide: IDonneesBrutesFormulaireSimulateur = {
  activites: [],
  designeOperateurServicesEssentiels: [],
  sousSecteurActivite: [],
  typeEntitePublique: [],
  etatMembre: [],
  secteurActivite: [],
  trancheCA: [],
  trancheNombreEmployes: [],
  typeStructure: [],
};
