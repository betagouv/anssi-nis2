import { Predicat } from "./predicats.declarations";

/**
 * Fabrique un prédicat d'égalité sur une valeur
 * @param cherche
 */
export const est: <T>(cherche: T) => (compare: T) => boolean =
  <T>(cherche: T) =>
  (compare: T) =>
    compare === cherche;
/**
 * Fabrique un prédicat d'égalité sur une liste de valeurs
 * @param listeCherche
 */
export const estParmi: <T>(...listeCherche: T[]) => (compare: T) => boolean =
  <T>(...listeCherche: T[]) =>
  (compare: T) =>
    listeCherche.includes(compare);

/**
 * Fabrique un prédicat d'égalité sur une liste de valeurs
 * @param listeCherche
 */
export const contientUnParmi: <T>(
  ...listeCherche: T[]
) => (listeCompare: T[]) => boolean =
  <T>(...listeCherche: T[]) =>
  (listeCompare: T[]) =>
    listeCompare.some((compare) => listeCherche.includes(compare));

/**
 * Inverse logique d'une fonction
 * "non" logique
 * @param predicat
 * @return predicat inverse
 */
export const non: <T>(
  ...predicats: Array<Predicat<T>>
) => (donnees: T) => boolean =
  <T>(predicat: Predicat<T>) =>
  (donnees: T) =>
    !predicat(donnees);

/**
 * Et logique sur un ensemble de prédicats
 * Equivalent de Array.every en point free (composable)
 * @param predicats
 */
export const et: <T>(
  ...predicats: Array<Predicat<T>>
) => (donnees: T) => boolean =
  <T>(...predicats: Array<Predicat<T>>) =>
  (donnees: T) =>
    predicats.every((p) => p(donnees));

/**
 * "Ou" logique sur un ensemble de prédicats
 * Equivalent de Array.some en point free (composable)
 * @param predicats
 */
export const ou: <T>(
  ...predicats: Array<Predicat<T>>
) => (donnees: T) => boolean =
  <T>(...predicats: Array<Predicat<T>>) =>
  (donnees: T) =>
    predicats.some((p) => p(donnees));
