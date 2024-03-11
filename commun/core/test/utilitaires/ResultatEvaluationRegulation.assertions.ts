import { fc } from "@fast-check/vitest";
import { expect } from "vitest";
import { fabriqueRegule } from "../../src/Domain/Simulateur/fabriques/ResultatRegulation.fabrique";
import { resultatNonRegule } from "../../src/Domain/Simulateur/Regulation.constantes";
import { CausesRegulation } from "../../src/Domain/Simulateur/Regulation.definitions";
import type { TypeEntite } from "../../src/Domain/Simulateur/Regulation.definitions";
import {
  EtatRegulation,
  EtatRegulationDefinitif,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { evalueRegulationEtatReponseInformationsSecteur } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations";
import { propReponseEtat } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseEtat.operations";

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

export const assertionArbitraire =
  (
    arbitraire: fc.Arbitrary<EtatRegulation>,
    verification: (args: EtatRegulation) => boolean | void,
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
export const verificationReponseNonRegule = (reponse: EtatRegulation) => {
  const resultatAttendu: EtatRegulationDefinitif = {
    _resultatEvaluationRegulation: "Definitif",
    etapeEvaluee: "InformationsSecteur",
    ...resultatNonRegule,
  };

  const resultatObtenu =
    evalueRegulationEtatReponseInformationsSecteur(reponse);
  expect(
    resultatObtenu,
    afficheDifferences(resultatAttendu, resultatObtenu),
  ).toStrictEqual(resultatAttendu);
};
export const verificationReponseDefinitivementIncertainAutrePaysUE = (
  reponse: EtatRegulation,
) => {
  const resultatAttendu: EtatRegulationDefinitif = {
    _resultatEvaluationRegulation: "Definitif",
    etapeEvaluee: "InformationsSecteur",
    decision: "Incertain",
    causes: { _tag: "DefiniDansUnAutreEtatMembre" },
  };

  const resultatObtenu =
    evalueRegulationEtatReponseInformationsSecteur(reponse);
  expect(
    resultatObtenu,
    afficheDifferences(resultatAttendu, resultatObtenu),
  ).toStrictEqual(resultatAttendu);
};
export const fabriqueVerificationReponseDefinitivementRegule =
  (typeEntite: TypeEntite) => (reponse: EtatRegulation) => {
    const causes: CausesRegulation = {
      ...propReponseEtat(reponse)("Structure"),
      ...propReponseEtat(reponse)("InformationsSecteur"),
    };
    const resultatAttendu: EtatRegulationDefinitif = {
      _resultatEvaluationRegulation: "Definitif",
      etapeEvaluee: "InformationsSecteur",
      ...fabriqueRegule(causes, typeEntite),
    };

    const resultatObtenu =
      evalueRegulationEtatReponseInformationsSecteur(reponse);
    expect(
      resultatObtenu,
      afficheDifferences(resultatAttendu, resultatObtenu),
    ).toStrictEqual(resultatAttendu);
  };
