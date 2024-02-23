import { CategorieTaille, CategoriseTaille } from "./Reponse.definitions";

export const fabriqueCategorieTaille = <T extends CategorieTaille>(
  taille: T,
): CategoriseTaille<T> => ({
  _categorieTaille: taille as unknown as `${T}`,
});