import { SimulateurEtapeResult } from "../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "./Props/component";

import { ValidationReponses } from "../../Domaine/Simulateur/Operations/validateursChamps";
import { SimulateurEtapePrealable } from "../../Components/Simulateur/SimulateurEtapePrealable.tsx";
import { elementVide } from "../Echaffaudages/AssistantsEchaffaudages.tsx";

type PredicatDonneesSimulateur = (
  formData: DonneesFormulaireSimulateur,
) => boolean;

export type InformationsEtape = {
  readonly estComptabilisee: boolean;
  readonly titre: string;
  readonly conteneurElementRendu: SimulateurEtapeRenderedComponent;
  readonly rempliContitionSousEtape: PredicatDonneesSimulateur;
};

export type EtapeInexistante = InformationsEtape & {
  readonly estComptabilisee: boolean;
  readonly titre: string;
};

export const etapeInexistante: EtapeInexistante = {
  estComptabilisee: false,
  titre: "Hors de portee",
  conteneurElementRendu: elementVide,
  rempliContitionSousEtape: () => false,
} as const;

export type EtapeExistante = InformationsEtape & {
  estComptabilisee: boolean;
  readonly titre: string;
};

export class SousEtapeConditionnelle {
  constructor(
    public readonly condition: PredicatDonneesSimulateur,
    public readonly sousEtape: InformationEtapeForm,
  ) {}
}

export class EtapePrealable implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapePrealable;

  public constructor(public readonly titre: string) {}

  rempliContitionSousEtape(): boolean {
    return false;
  }
}

export type OptionsInformationEtapeForm = {
  readonly sousEtapeConditionnelle?: SousEtapeConditionnelle;
  readonly ignoreSi?: (
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) => boolean;
};

const optionsInformationEtapeFormParDefaut: OptionsInformationEtapeForm = {
  ignoreSi: () => false,
  sousEtapeConditionnelle: undefined,
};

export class InformationEtapeForm implements EtapeExistante {
  readonly estComptabilisee = true;
  readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;

  public constructor(
    public readonly titre: string,
    public readonly validationReponses: ValidationReponses,
    public readonly composant: SimulateurEtapeNodeComponent,
    public readonly options: OptionsInformationEtapeForm = optionsInformationEtapeFormParDefaut,
  ) {}

  public rempliContitionSousEtape(
    donnees: DonneesFormulaireSimulateur,
  ): boolean {
    return this.options.sousEtapeConditionnelle?.condition(donnees) || false;
  }
}

export class InformationEtapeResult implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}

  rempliContitionSousEtape(): boolean {
    return false;
  }
}
