export const join = (glue: string) => (s: ReadonlyArray<string>) =>
  s.join(glue);

export const replace =
  (searchValue: string | RegExp, replaceValue: string) => (texte: string) =>
    texte.replace(searchValue, replaceValue);

export const match = (regexp: RegExp) => (texte: string) => texte.match(regexp);

export const normalize =
  (form: "NFC" | "NFD" | "NFKC" | "NFKD") => (texte: string) =>
    texte.normalize(form);
