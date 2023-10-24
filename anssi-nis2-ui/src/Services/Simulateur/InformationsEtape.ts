import { SimulateurEtapeResult } from "../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "./Props/component";

import { ValidationReponses } from "../../Domaine/Simulateur/Operations/validateursChamps";
import { SimulateurEtapePrealable } from "../../Components/Simulateur/SimulateurEtapePrealable.tsx";

export type InformationsEtape = {
  estComptabilisee: boolean;
  titre: string;
};

export type EtapeInexistante = InformationsEtape & {
  readonly estComptabilisee: boolean;
  readonly titre: string;
};

export const etapeInexistante: EtapeInexistante = {
  estComptabilisee: false,
  titre: "Hors de portee",
} as const;

export type EtapeExistante = InformationsEtape & {
  estComptabilisee: boolean;
  conteneurElementRendu: SimulateurEtapeRenderedComponent;
  readonly titre: string;
};

type PredicatDonneesSimulateur = (
  formData: DonneesFormulaireSimulateur,
) => boolean;

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
}

export type OptionsInformationEtapeForm = {
  readonly sousEtapeConditionnelle?: SousEtapeConditionnelle;
};

export class InformationEtapeForm implements EtapeExistante {
  readonly estComptabilisee = true;
  readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;

  public constructor(
    readonly titre: string,
    public readonly validationReponses: ValidationReponses,
    public readonly composant: SimulateurEtapeNodeComponent,
    public readonly options?: OptionsInformationEtapeForm,
  ) {}
}

export class InformationEtapeResult implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}
}
