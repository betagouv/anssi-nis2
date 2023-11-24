import { IDonneesBrutesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { SimulateurEtapeNodeComponent } from "anssi-nis2-ui/src/Services/Simulateur/Props/component";

import { ValidationReponses } from "./services/ChampsSimulateur/champs.domaine.ts";
import { PredicatDonneesSimulateur } from "./PredicatDonneesSimulateur.ts";
import { P } from "ts-pattern";

export type InformationsEtape<TypeConteneur> = {
  readonly longueurComptabilisee: 0 | 1;
  readonly existe: boolean;
  readonly titre: string;
  readonly conteneurElementRendu: TypeConteneur;
};

export type CapaciteEtape = {
  readonly remplitContitionSousEtape: PredicatDonneesSimulateur;
  readonly validationReponses: ValidationReponses;
  readonly estIgnoree: (donnees: IDonneesBrutesFormulaireSimulateur) => boolean;
  readonly varianteAffichee: (
    donnees: IDonneesBrutesFormulaireSimulateur
  ) => number;
};

export type EtapeExistante<TypeConteneur> = InformationsEtape<TypeConteneur> &
  CapaciteEtape;

export type EtapePrealable<TypeConteneur> = EtapeExistante<TypeConteneur>;

export type EtapeResultat<TypeConteneur> = EtapeExistante<TypeConteneur>;

export type OptionsInformationEtapeForm<T> = {
  readonly sousEtapeConditionnelle?: SousEtapeConditionnelle<T>;
  readonly ignoreSi: (
    donneesFormulaire: IDonneesBrutesFormulaireSimulateur
  ) => boolean;
};

export type SousEtapeConditionnelle<T> = {
  readonly condition: PredicatDonneesSimulateur;
  readonly sousEtape: InformationEtapeForm<T>;
};

export type CapacitesEtapeFormulaire = {
  readonly fabriqueComposant: (
    donnees: IDonneesBrutesFormulaireSimulateur
  ) => SimulateurEtapeNodeComponent;
  readonly fabriqueValidationReponses: (
    donnees: IDonneesBrutesFormulaireSimulateur
  ) => ValidationReponses;
};
export type InformationEtapeForm<TypeConteneur> =
  EtapeExistante<TypeConteneur> &
    CapacitesEtapeFormulaire & {
      readonly options: OptionsInformationEtapeForm<TypeConteneur>;
      readonly composant: SimulateurEtapeNodeComponent;
    };

export type VariantesEtape<T, TypeEtape extends InformationEtapeForm<T>> = {
  conditions: P.Pattern<IDonneesBrutesFormulaireSimulateur>;
  etape: TypeEtape;
};

export type InformationsEtapesVariantes<
  TypeConteneur,
  TypeEtape extends InformationEtapeForm<TypeConteneur>
> = EtapeExistante<TypeConteneur> &
  CapacitesEtapeFormulaire & {
    readonly variantes: TypeEtape[];
  };
