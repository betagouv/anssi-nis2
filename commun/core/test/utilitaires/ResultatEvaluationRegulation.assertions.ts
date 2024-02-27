import { fc } from "@fast-check/vitest";
import { prop } from "../../../utils/services/objects.operations";
import { ResultatEvaluationRegulation } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { expect } from "vitest";

export const afficheDifferences = (
  resultatAttendu: ResultatEvaluationRegulation,
  resultatObtenu: ResultatEvaluationRegulation,
) =>
  `
  Resultat Attendu: 
  
  ${JSON.stringify(resultatAttendu, null, 2)}
  
  
  Resultat Obtenu: 
  
  ${JSON.stringify(resultatObtenu, null, 2)}
  `;

export const assertionArbitraire =
  (
    arbitraire: fc.Arbitrary<ResultatEvaluationRegulation>,
    verification: (args: ResultatEvaluationRegulation) => boolean | void,
  ) =>
  () =>
    fc.assert(fc.property(arbitraire, verification), { verbose: true });

export const assertion = {
  propriete: <Ts extends [unknown, ...unknown[]]>(
    ...args: [
      ...arbitraries: {
        [K in keyof Ts]: fc.Arbitrary<Ts[K]>;
      },
      predicate: (...args: Ts) => boolean | void,
    ]
  ): void => fc.assert(fc.property(...args), { verbose: true }),

  // TODO : tester plus profondément
  exclusifs: <T>(arbA: fc.Arbitrary<T>, arbB: fc.Arbitrary<T>) =>
    assertion.propriete(arbA, arbB, (a, b) => a !== b),
  // expect(a).not.toStrictEqual(b);
  // ),

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

  tousExclusifs: <T>(...arbs: fc.Arbitrary<T>[]) =>
    arbs.map((arbA) =>
      arbs
        .filter((a) => a != arbA)
        .map((arbB) => assertion.exclusifs(arbA, arbB)),
    ),
};
