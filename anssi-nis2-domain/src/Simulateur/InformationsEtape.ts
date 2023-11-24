import { IDonneesBrutesFormulaireSimulateur } from "./DonneesFormulaire";

import { ValidationReponses } from "./services/ChampsSimulateur/champs.domaine";
import { PredicatDonneesSimulateur } from "./PredicatDonneesSimulateur";
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
    donnees: IDonneesBrutesFormulaireSimulateur,
  ) => number;
};

export type EtapeExistante<TypeConteneur> = InformationsEtape<TypeConteneur> &
  CapaciteEtape;

export type EtapePrealable<TypeConteneur> = EtapeExistante<TypeConteneur>;

export type EtapeResultat<TypeConteneur> = EtapeExistante<TypeConteneur>;

export type OptionsInformationEtapeForm<T, TypeSimulateurEtapeNodeComponent> = {
  readonly sousEtapeConditionnelle?: SousEtapeConditionnelle<
    T,
    TypeSimulateurEtapeNodeComponent
  >;
  readonly ignoreSi: (
    donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
  ) => boolean;
};

export type SousEtapeConditionnelle<
  TypeConteneur,
  TypeSimulateurEtapeNodeComponent,
> = {
  readonly condition: PredicatDonneesSimulateur;
  readonly sousEtape: InformationEtapeForm<
    TypeConteneur,
    TypeSimulateurEtapeNodeComponent
  >;
};

export type CapacitesEtapeFormulaire = {
  readonly fabriqueComposant: <TypeSimulateurEtapeNodeComponent>(
    donnees: IDonneesBrutesFormulaireSimulateur,
  ) => TypeSimulateurEtapeNodeComponent;
  readonly fabriqueValidationReponses: (
    donnees: IDonneesBrutesFormulaireSimulateur,
  ) => ValidationReponses;
};
export type InformationEtapeForm<
  TypeConteneur,
  TypeSimulateurEtapeNodeComponent,
> = EtapeExistante<TypeConteneur> &
  CapacitesEtapeFormulaire & {
    readonly options: OptionsInformationEtapeForm<
      TypeConteneur,
      TypeSimulateurEtapeNodeComponent
    >;
    readonly composant: TypeSimulateurEtapeNodeComponent;
  };

export type VariantesEtape<
  TypeConteneur,
  TypeSimulateurEtapeNodeComponent,
  TypeEtape extends InformationEtapeForm<
    TypeConteneur,
    TypeSimulateurEtapeNodeComponent
  >,
> = {
  conditions: P.Pattern<IDonneesBrutesFormulaireSimulateur>;
  etape: TypeEtape;
};

export type InformationsEtapesVariantes<
  TypeConteneur,
  TypeSimulateurEtapeNodeComponent,
  TypeEtape extends InformationEtapeForm<
    TypeConteneur,
    TypeSimulateurEtapeNodeComponent
  >,
> = EtapeExistante<TypeConteneur> &
  CapacitesEtapeFormulaire & {
    readonly variantes: TypeEtape[];
  };
