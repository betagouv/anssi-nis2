type Predicat<T> = (donnees: T) => boolean;
export const appliquePredicat: <T>(
  donnees: T
) => (predicat: Predicat<T>) => boolean =
  <T>(donnees: T) =>
  (predicat: Predicat<T>) =>
    predicat(donnees);

export const et: <T>(
  ...predicats: Array<Predicat<T>>
) => (donnees: T) => boolean =
  <T>(...predicats: Array<Predicat<T>>) =>
  (donnees: T) =>
    predicats.every((p) => p(donnees));
export const ou: <T>(
  ...predicats: Array<Predicat<T>>
) => (donnees: T) => boolean =
  <T>(...predicats: Array<Predicat<T>>) =>
  (donnees: T) =>
    predicats.some((p) => p(donnees));
