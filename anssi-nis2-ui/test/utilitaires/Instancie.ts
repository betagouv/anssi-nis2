export const instancie =
  <T, C extends { new (chaine: T) }>(c: C) =>
  (chaine: T) =>
    new c(chaine);
