type Predicat<T> = (donnees: T) => boolean;

export const et: <T>(
  ...predicats: Array<Predicat<T>>
) => (donnees: T) => boolean =
  <T>(...predicats: Array<Predicat<T>>) =>
  (donnees: T) =>
    predicats.every((p) => p(donnees));

export const est: <T>(cherche: T) => (compare: T) => boolean =
  <T>(cherche: T) =>
  (compare: T) =>
    compare === cherche;
export const ou: <T>(
  ...predicats: Array<Predicat<T>>
) => (donnees: T) => boolean =
  <T>(...predicats: Array<Predicat<T>>) =>
  (donnees: T) =>
    predicats.some((p) => p(donnees));

export const non: <T>(
  ...predicats: Array<Predicat<T>>
) => (donnees: T) => boolean =
  <T>(predicat: Predicat<T>) =>
  (donnees: T) =>
    !predicat(donnees);
