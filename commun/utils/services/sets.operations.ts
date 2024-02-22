export const ensembleNeutre = new Set();
export const ensembleNeutreDe = <T>() => new Set<T>();
export const union = <T>(set1: Set<T>, set2: Set<T>) =>
  new Set([...set1, ...set2]);

export const ens = <T>(...elements: T[]) => new Set(elements);
export const fromArray = <T>(elements: T[]) => ens(...elements);

export const tous =
  <T>(predicat: (element: T) => boolean) =>
  (set: Set<T>) =>
    set.size > 0 && [...set].every(predicat);
