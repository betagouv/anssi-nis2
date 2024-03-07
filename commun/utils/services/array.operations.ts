import { P } from "ts-pattern";

export const exactementUnElement = <T extends string>(a: T[]) => a.length === 1;
export const auMoinsUnElement = <T extends string>(a: T[]) => a.length >= 1;
export const fabriquePatternExactementUnElement = <T extends string>(
  ...champs: T[]
) =>
  champs.reduce(
    (patt, champ) => ({
      ...patt,
      [champ]: P.when<string[], (a: string[]) => boolean>(exactementUnElement),
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
      [champ]: P.when<string[], (a: string[]) => boolean>(auMoinsUnElement),
    }),
    {} as {
      [k in T]: ReturnType<typeof P.when<string[], (a: string[]) => boolean>>;
    }
  );
