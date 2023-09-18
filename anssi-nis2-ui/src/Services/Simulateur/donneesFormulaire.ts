export type NomsChampsSimulateur =
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
  etatMembre: [],
  secteurActivite: [],
  sousSecteurActivite: [],
  trancheCA: [],
  trancheNombreEmployes: [],
  typeStructure: [],
  activites: [],
};
