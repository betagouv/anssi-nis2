import { fc } from "@fast-check/vitest";
import {
  IDonneesBrutesFormulaireSimulateur,
  IDonneesFormulaireSimulateur,
} from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { ArbitraireOptionsActivites } from "anssi-nis2-domain/test/arbitraires/arbitraireOptions";

export type ManipulationArbitrairesDeclarations = Omit<
  IDonneesBrutesFormulaireSimulateur,
  "activites"
>;
export type DonneesSansActivite = Omit<
  IDonneesFormulaireSimulateur,
  "activites"
>;
export type DonneesSectorielles = Pick<
  IDonneesFormulaireSimulateur,
  "secteurActivite" | "sousSecteurActivite"
>;
export type DonneesFormulaireExtensibles =
  | IDonneesBrutesFormulaireSimulateur
  | DonneesSansActivite
  | ManipulationArbitrairesDeclarations
  | DonneesSectorielles
  | Omit<ManipulationArbitrairesDeclarations, "trancheNombreEmployes">;
type DonneesExtensiblesAvecActivite<
  DonneesPartielles extends DonneesSectorielles,
> = DonneesPartielles & Pick<IDonneesBrutesFormulaireSimulateur, "activites">;
export type OperationAjouteArbitraireActivites = <
  DonneesPartielles extends DonneesSectorielles,
>(
  base: DonneesPartielles,
  options?: ArbitraireOptionsActivites,
) => fc.Arbitrary<DonneesExtensiblesAvecActivite<DonneesPartielles>>;
export type AjoutADonneesFormulaire = Partial<{
  [K in keyof IDonneesBrutesFormulaireSimulateur]: fc.Arbitrary<
    IDonneesBrutesFormulaireSimulateur[K]
  >;
}>;

export type AjouteDesDonneesFormulaire = <
  ChampsAbsents extends keyof IDonneesBrutesFormulaireSimulateur,
  DonneesPartielles extends Omit<
    IDonneesBrutesFormulaireSimulateur,
    ChampsAbsents
  > &
    DonneesSectorielles,
>(
  base: DonneesPartielles,
) => fc.Arbitrary<DonneesPartielles>;
