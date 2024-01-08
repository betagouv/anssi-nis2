import {
  DonneesSectorielles,
  IDonneesBrutesFormulaireSimulateur,
} from "../../src/Domain/Simulateur/DonneesFormulaire";

export type DonneesFormulaireExtensibles =
  | IDonneesBrutesFormulaireSimulateur
  | DonneesSansActivite
  | DonneesBrutesSansActivite
  | DonneesSectorielles
  | Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">
  | Omit<
      IDonneesBrutesFormulaireSimulateur,
      | "typeEntitePublique"
      | "fournitServicesUnionEuropeenne"
      | "localisationRepresentant"
    >;

export type PiocheDonneesForm<
  T extends keyof IDonneesBrutesFormulaireSimulateur
> = Pick<IDonneesBrutesFormulaireSimulateur, T>;

export type DonneesAjout<
  D extends keyof IDonneesBrutesFormulaireSimulateur = keyof IDonneesBrutesFormulaireSimulateur
> = D extends infer U extends keyof IDonneesBrutesFormulaireSimulateur
  ? PiocheDonneesForm<U>
  : never;

export type DonneesBrutesSansActivite = Omit<
  IDonneesBrutesFormulaireSimulateur,
  "activites"
>;

export type DonneesSansActivite = Omit<
  IDonneesBrutesFormulaireSimulateur,
  "activites"
>;

export type DonneesExtensiblesAvecActivite<
  DonneesPartielles extends DonneesSectorielles
> = DonneesPartielles & Pick<IDonneesBrutesFormulaireSimulateur, "activites">;
