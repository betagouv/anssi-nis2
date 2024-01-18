export type ChampFrontMatter = [string, string];
export type NiveauTitre = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type FrontMatter = { [key: string]: string };
export type StructureMarkdown = {
  sections: FrontMatter[];
};
