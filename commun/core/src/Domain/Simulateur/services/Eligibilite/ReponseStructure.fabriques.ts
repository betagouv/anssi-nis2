import {
  CategorieTaille,
  CategoriseTaille,
} from "./ReponseStructure.definitions";

export const fabriqueCategorieTaille = <T extends CategorieTaille>(
  taille: `${T}`,
): CategoriseTaille<T> => ({
  _categorieTaille: taille,
});
