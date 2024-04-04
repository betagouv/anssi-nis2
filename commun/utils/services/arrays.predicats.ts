export const tous =
  <T>(predicat: (element: T) => boolean) =>
  (tableauTous: Array<T>) =>
    tableauTous.length > 0 && tableauTous.every(predicat);

export const certains =
  <T>(predicat: (element: T) => boolean) =>
  (tableauCertains: Array<T>) =>
    tableauCertains.some(predicat);
