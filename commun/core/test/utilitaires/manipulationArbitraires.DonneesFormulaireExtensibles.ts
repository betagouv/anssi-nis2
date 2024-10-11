import { fc } from "@fast-check/vitest";
import { UnionPetitMoyenGrand, ValeurChampSimulateur } from "../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursPetitMoyenGrand } from "../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  DonneesFormulaireSimulateur,
} from "../../src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";

import {
  DonneesFormulaireExtensibles,
  DonneesFormulairesAvanttrancheChiffreAffaire,
} from "./manipulationArbitraires.declarations";
import { fabriqueArbSingleton } from "./manipulationArbitraires.fabriques";

export const constantArbitraire = <TypeChamp extends ValeurChampSimulateur>(
  value: TypeChamp[]
) => fc.constant(value);

export const propageBase = <
  DonneesPartielles extends DonneesFormulaireExtensibles
>(
  base: DonneesPartielles
) =>
  Object.entries(base).reduce(
    (donneesFormArbitraires, [champ, valeurs]) =>
      Object.assign({}, donneesFormArbitraires, {
        [champ]: constantArbitraire(valeurs),
      }),
    {}
  ) as { [K in keyof DonneesPartielles]: fc.Arbitrary<DonneesPartielles[K]> };






export const contrainteTranchesSansDoublonSurValeur = <
  T extends DonneesFormulairesAvanttrancheChiffreAffaire = DonneesFormulaireSimulateur
>(
  base: T,
  valeurExclusive: UnionPetitMoyenGrand
) =>
  fabriqueArbSingleton(ValeursPetitMoyenGrand).filter(
    (tranche) =>
      tranche[0] !== valeurExclusive ||
      base.trancheChiffreAffaire[0] !== valeurExclusive
  );



