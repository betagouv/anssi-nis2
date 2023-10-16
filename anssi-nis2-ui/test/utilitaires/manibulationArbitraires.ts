import { fc } from "@fast-check/vitest";
import {
  DonneesFormulaireSimulateur,
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { ValeurChampSimulateur } from "../../src/Domaine/Simulateur/ChampsSimulateur";

const constantArbitraire = <TypeChamp extends ValeurChampSimulateur>(
  value: TypeChamp[],
) => fc.constant(value);
export const propageBase = <
  DonneesPartielles extends
    | IDonneesBrutesFormulaireSimulateur
    | DonneesSansActivite
    | Omit<DonneesSansActivite, "trancheNombreEmployes">
    | Pick<
        IDonneesFormulaireSimulateur,
        "secteurActivite" | "sousSecteurActivite"
      >,
>(
  base: DonneesPartielles,
) =>
  Object.entries(base).reduce(
    (donneesFormArbitraires, [champ, valeurs]) => ({
      ...donneesFormArbitraires,
      [champ]: constantArbitraire(valeurs),
    }),
    {},
  ) as { [K in keyof DonneesPartielles]: fc.Arbitrary<DonneesPartielles[K]> };
export const ajouteMethodeAvec = (base: IDonneesFormulaireSimulateur) => {
  const avecMethod = (data: IDonneesFormulaireSimulateur) =>
    new DonneesFormulaireSimulateur({ ...base, ...data });
  return fc.record({ ...propageBase(base), avec: fc.constant(avecMethod) });
};
export type DonneesSansActivite = Omit<
  IDonneesBrutesFormulaireSimulateur,
  "activites"
>;
