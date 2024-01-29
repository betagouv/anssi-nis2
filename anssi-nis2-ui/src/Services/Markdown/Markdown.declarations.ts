export type ChampFrontMatter = [string, string];
export type NiveauTitre = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type FrontMatter<T = string | number | boolean | object> = {
  [key: string]: T;
};
export type ExtractionSection = {
  titre: string;
  niveau: number;
};
export type InformationsSection<T extends object = object> =
  ExtractionSection & {
    titreCourt: string;
  } & T;
export type StructureMarkdown = {
  sections: ExtractionSection[];
};
