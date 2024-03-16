import { P } from "ts-pattern";
import { estNonVide, estSingleton } from "./commun.predicats";

export const fabriquePatternExactementUnElement = <T extends string>(
  ...champs: T[]
) =>
  champs.reduce(
    (patt, champ) => ({
      ...patt,
      [champ]: P.when<string[], (a: string[]) => boolean>(estSingleton),
    }),
    {} as {
      [k in T]: ReturnType<typeof P.when<string[], (a: string[]) => boolean>>;
    }
  );
export const fabriquePatternAuMoinsUnElement = <T extends string>(
  ...champs: T[]
) =>
  champs.reduce(
    (patt, champ) => ({
      ...patt,
      [champ]: P.when<string[], (a: string[]) => boolean>(estNonVide),
    }),
    {} as {
      [k in T]: ReturnType<typeof P.when<string[], (a: string[]) => boolean>>;
    }
  );
