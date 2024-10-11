import { fc } from "@fast-check/vitest";
import { expect } from "vitest";


export const assertion = {
  propriete: <Ts extends [unknown, ...unknown[]]>(
    ...args: [
      ...arbitraries: {
        [K in keyof Ts]: fc.Arbitrary<Ts[K]>;
      },
      predicate: (...args: Ts) => boolean | void,
    ]
  ): void => fc.assert(fc.property(...args), { verbose: true }),

  exclusifs: <T>(arbA: fc.Arbitrary<T>, arbB: fc.Arbitrary<T>) =>
    assertion.propriete(arbA, arbB, (a, b) => a !== b),

  nonVide: <T>(arb: fc.Arbitrary<T>) =>
    assertion.propriete(arb, (a) => {
      expect(a).not.toBeUndefined();
      expect(a).not.toBeNull();
    }),

  neContientPas:
    <T>(valeur: T) =>
    (arb: fc.Arbitrary<T>) =>
      assertion.propriete(arb, (a) => {
        expect(a).not.toStrictEqual(valeur);
      }),
};
