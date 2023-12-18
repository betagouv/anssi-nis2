import { fc } from "@fast-check/vitest";
import { IDonneesFormulaireSimulateur, IDonneesBrutesFormulaireSimulateur, DonneesSectorielles } from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { ArbitraireOptionsActivites } from "../Domaine/arbitraires/arbitraireOptions";

export type DonneesFormulaireExtensibles =
    | IDonneesBrutesFormulaireSimulateur
    | DonneesSansActivite
    | DonneesBrutesSansActivite
    | DonneesSectorielles
    | Omit<DonneesBrutesSansActivite, "trancheNombreEmployes">;

export type PiocheDonneesForm<T extends keyof IDonneesBrutesFormulaireSimulateur> =
    Pick<IDonneesBrutesFormulaireSimulateur, T>

export type DonneesAjout1 =
    | PiocheDonneesForm<"trancheCA">
    | PiocheDonneesForm<"fournitServicesUnionEuropeenne" | "localisationRepresentant">
    | PiocheDonneesForm<"fournitServicesUnionEuropeenne">
    | PiocheDonneesForm<"designeOperateurServicesEssentiels" | "etatMembre">
    | PiocheDonneesForm<
        | "designeOperateurServicesEssentiels"
        | "typeStructure"
        | "trancheCA"
        | "trancheNombreEmployes"
        | "etatMembre"
    >
    | PiocheDonneesForm<
        | "designeOperateurServicesEssentiels"
        | "typeStructure"
        | "typeEntitePublique"
        | "trancheCA"
        | "trancheNombreEmployes"
        | "etatMembre"
    >

export type DonneesAjout<D extends keyof IDonneesBrutesFormulaireSimulateur = keyof IDonneesBrutesFormulaireSimulateur> =
    D extends infer U extends keyof IDonneesBrutesFormulaireSimulateur | keyof IDonneesBrutesFormulaireSimulateur
    ? PiocheDonneesForm<U>
    : never

export type DonneesBrutesSansActivite = Omit<
    IDonneesBrutesFormulaireSimulateur,
    "activites"
>;

export type DonneesSansActivite = Omit<
    IDonneesFormulaireSimulateur,
    "activites"
>;

export type DonneesExtensiblesAvecActivite<
    DonneesPartielles extends DonneesSectorielles,
> = DonneesPartielles & Pick<IDonneesBrutesFormulaireSimulateur, "activites">;
export type OperationAjouteArbitraireActivites = <
    DonneesPartielles extends DonneesSectorielles,
>(
    base: DonneesPartielles,
    options?: ArbitraireOptionsActivites,
) => fc.Arbitrary<DonneesExtensiblesAvecActivite<DonneesPartielles>>;

export type Arbitrarise<T> = { [K in keyof T]: fc.Arbitrary<T[K]> };