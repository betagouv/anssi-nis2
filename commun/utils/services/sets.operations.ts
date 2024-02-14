export const ensembleNeutre = new Set();
export const ensembleNeutreDe = <T>() => new Set<T>();
export const union = <T>(set1: Set<T>, set2: Set<T>) =>
  new Set([...set1, ...set2]);

export const ens = <T>(...elements: T[]) => new Set(elements);
