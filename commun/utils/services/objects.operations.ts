export const prop =
  <TypeRetour = unknown, P extends string | number | symbol = string>(p: P) =>
  <Rest, T extends Record<P, TypeRetour> & Rest>(o: T): TypeRetour =>
    o[p];
