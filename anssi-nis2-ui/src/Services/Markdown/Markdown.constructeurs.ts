import { flow } from "fp-ts/lib/function";
import { map } from "fp-ts/Array";
import { join } from "../../../../commun/utils/services/string.operations.ts";
import { ChampFrontMatter, NiveauTitre } from "./Markdown.declarations.ts";

const frontMatter = (champBrut: string) => `
---
${champBrut}
---
`;
export const champ = ([nom, contenu]: ChampFrontMatter) => `${nom}: ${contenu}`;
const champs = flow(map(champ), join("\n"));
export const titre = (niveau: NiveauTitre) => (libelle: string) =>
  `${"#".repeat(niveau)} ${libelle}`;
export const t1 = titre(1);
export const t2 = titre(2);
export const fmChamps = flow(champs, frontMatter);
export const composeMarkdown = (...s: string[]) => join("\n\n")(s) + "\n";
