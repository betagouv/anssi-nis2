import { IDonneesBrutesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "./Props/component";

import { ValidationReponses } from "../../Domaine/Simulateur/operations/validateursChamps";
import { PredicatDonneesSimulateur } from "./PredicatDonneesSimulateur.ts";

export type InformationsEtape = {
  readonly estComptabilisee: boolean;
  readonly existe: boolean;
  readonly titre: string;
  readonly conteneurElementRendu: SimulateurEtapeRenderedComponent;
};

export type CapaciteEtape = {
  readonly remplitContitionSousEtape: PredicatDonneesSimulateur;
  readonly validationReponses: ValidationReponses;
  readonly estIgnoree: (donnees: IDonneesBrutesFormulaireSimulateur) => boolean;
};

export type EtapeExistante = InformationsEtape & CapaciteEtape;

export type SousEtapeConditionnelle = {
  readonly condition: PredicatDonneesSimulateur;
  readonly sousEtape: InformationEtapeForm;
};

export type EtapePrealable = EtapeExistante;

export type EtapeResultat = EtapeExistante;

export type OptionsInformationEtapeForm = {
  readonly sousEtapeConditionnelle?: SousEtapeConditionnelle;
  readonly ignoreSi: (
    donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
  ) => boolean;
};

export type InformationEtapeForm = EtapeExistante & {
  readonly options: OptionsInformationEtapeForm;
  readonly composant: SimulateurEtapeNodeComponent;
};
