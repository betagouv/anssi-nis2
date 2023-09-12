export type SimulateurFieldNames =
  | "etatMembre"
  | "typeStructure"
  | "trancheNombreEmployes"
  | "trancheCA"
  | "secteurActivite"
  | "sousSecteurActivite"
  | "activites";
export type SimulateurFormData = Record<SimulateurFieldNames, string[]>;
export const emptySimulateurFormData: SimulateurFormData = {
  etatMembre: [],
  secteurActivite: [],
  sousSecteurActivite: [],
  trancheCA: [],
  trancheNombreEmployes: [],
  typeStructure: [],
  activites: [],
};
