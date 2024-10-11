import { fc } from "@fast-check/vitest";
import { expect } from "vitest";
import { EtatRegulation } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";

export const afficheDifferences = (
  resultatAttendu: EtatRegulation,
  resultatObtenu: EtatRegulation,
) =>
  `
  Resultat Attendu: 
  
  ${JSON.stringify(resultatAttendu, null, 2)}
  
  
  Resultat Obtenu: 
  
  ${JSON.stringify(resultatObtenu, null, 2)}
  `;

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
