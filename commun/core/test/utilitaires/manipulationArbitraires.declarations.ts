import {
  DonneesSectorielles,
  DonneesFormulaireSimulateur,
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
  D extends keyof DonneesFormulaireSimulateur = keyof DonneesFormulaireSimulateur
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

export type DonneesExtensiblesAvecActivite<
  DonneesPartielles extends DonneesSectorielles
> = DonneesPartielles & Pick<DonneesFormulaireSimulateur, "activites">;
