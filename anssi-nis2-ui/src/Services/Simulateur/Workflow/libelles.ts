export type GenerateurLibelle<T extends string, P = string> = (
  value: string,
  valeursMetier: Partial<Record<T, P>>,
) => string;
