export type NomsChampsSimulateur =
  | "designeOSE"
  | "etatMembre"
  | "typeStructure"
  | "trancheNombreEmployes"
  | "trancheCA"
  | "secteurActivite"
  | "sousSecteurActivite"
  | "activites";

export type DonneesFormulaireSimulateur = Record<
  NomsChampsSimulateur,
  string[]
>;

export const donneesFormulaireSimulateurVide: DonneesFormulaireSimulateur = {
  designeOSE: [],
  etatMembre: [],
  secteurActivite: [],
  sousSecteurActivite: [],
  trancheCA: [],
  trancheNombreEmployes: [],
  typeStructure: [],
  activites: [],
};
