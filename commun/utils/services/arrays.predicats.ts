export const tous =
  <T>(predicat: (element: T) => boolean) =>
  (tableauTous: Array<T>) =>
    tableauTous.length > 0 && tableauTous.every(predicat);
