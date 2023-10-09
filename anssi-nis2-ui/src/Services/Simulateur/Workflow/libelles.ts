export const getValueContent = (group: string | undefined, key: string) =>
  group ? `${group}[${key}]` : key;
export type GenerateurLibelle<T extends string, P = string> = (
  value: string,
  valeursMetier: Partial<Record<T, P>>,
) => string;