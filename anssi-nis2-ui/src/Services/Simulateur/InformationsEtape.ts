import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
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
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) => boolean;
};

export interface InformationEtapeForm extends EtapeExistante {
  readonly validationReponses: ValidationReponses;
  readonly options: OptionsInformationEtapeForm;
  readonly composant: SimulateurEtapeNodeComponent;
}
