import { fc } from "@fast-check/vitest";
import {
  DonneesFormulaireSimulateur,
  DonneesSectorielles,
} from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";

export type DonneesFormulaireExtensibles =
  | DonneesFormulaireSimulateur
  | DonneesSansActivite
  | DonneesBrutesSansActivite
  | DonneesSectorielles
  | Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">
  | Omit<
      DonneesFormulaireSimulateur,
      | "typeEntitePublique"
      | "fournitServicesUnionEuropeenne"
      | "localisationRepresentant"
    >;

export type PiocheDonneesForm<T extends keyof DonneesFormulaireSimulateur> =
  Pick<DonneesFormulaireSimulateur, T>;

export type DonneesAjout<
  D extends
    keyof DonneesFormulaireSimulateur = keyof DonneesFormulaireSimulateur,
> = D extends infer U extends keyof DonneesFormulaireSimulateur
  ? PiocheDonneesForm<U>
  : never;

export type DonneesBrutesSansActivite = Omit<
  DonneesFormulaireSimulateur,
  "activites"
>;

export type DonneesSansActivite = Omit<
  DonneesFormulaireSimulateur,
  "activites"
>;

export type ArbitraireDonneesFormulaireSimulateur =
  fc.Arbitrary<DonneesFormulaireSimulateur>;

export type ArbitraireDonneesFormulaireSimulateurNomme =
  ArbitraireDonneesFormulaireSimulateur & { nom: string };

export type DonneesExtensiblesAvecActivite<
  DonneesPartielles extends DonneesSectorielles,
> = DonneesPartielles & Pick<DonneesFormulaireSimulateur, "activites">;
export type ArbitraireEnrichi = ArbitraireDonneesFormulaireSimulateurNomme & {
  sansBesoinLocalisation: ArbitraireDonneesFormulaireSimulateurNomme;
  neFournitPasServiceUe: ArbitraireDonneesFormulaireSimulateurNomme;
  avecLocalisationRepresentant: ArbitraireDonneesFormulaireSimulateurNomme;
  avecLocalisationRepresentantFrance: ArbitraireDonneesFormulaireSimulateurNomme;
};
