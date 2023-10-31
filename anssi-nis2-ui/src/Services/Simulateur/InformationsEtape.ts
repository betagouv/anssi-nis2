import { SimulateurEtapeResult } from "../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "./Props/component";

import { ValidationReponses } from "../../Domaine/Simulateur/operations/validateursChamps";
import { SimulateurEtapePrealable } from "../../Components/Simulateur/SimulateurEtapePrealable.tsx";
import { elementVide } from "../Echaffaudages/AssistantsEchaffaudages.tsx";

type PredicatDonneesSimulateur = (
  formData: DonneesFormulaireSimulateur,
) => boolean;

export type InformationsEtape = {
  readonly estComptabilisee: boolean;
  readonly titre: string;
  readonly conteneurElementRendu: SimulateurEtapeRenderedComponent;
  readonly remplitContitionSousEtape: PredicatDonneesSimulateur;
};

export type EtapeInexistante = InformationsEtape & {
  readonly estComptabilisee: boolean;
  readonly titre: string;
};

export const etapeInexistante: EtapeInexistante = {
  estComptabilisee: false,
  titre: "Hors de portee",
  conteneurElementRendu: elementVide,
  remplitContitionSousEtape: () => false,
} as const;

export type EtapeExistante = InformationsEtape & {
  estComptabilisee: boolean;
  readonly titre: string;
};

export type SousEtapeConditionnelle = {
  readonly condition: PredicatDonneesSimulateur;
  readonly sousEtape: InformationEtapeForm;
};

export const fabriqueSousEtapeConditionnelle: (
  condition: PredicatDonneesSimulateur,
  sousEtape: InformationEtapeForm,
) => SousEtapeConditionnelle = (condition, sousEtape) => ({
  condition: condition,
  sousEtape: sousEtape,
});

export class EtapePrealable implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapePrealable;

  public constructor(public readonly titre: string) {}

  remplitContitionSousEtape(): boolean {
    return false;
  }
}

export type OptionsInformationEtapeForm = {
  readonly sousEtapeConditionnelle?: SousEtapeConditionnelle;
  readonly ignoreSi: (
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) => boolean;
};

export const optionsInformationEtapeFormParDefaut: OptionsInformationEtapeForm =
  {
    ignoreSi: () => false,
    sousEtapeConditionnelle: fabriqueSousEtapeConditionnelle(
      () => false,
      etapeInexistante as InformationEtapeForm,
    ),
  };

export class InformationEtapeForm implements EtapeExistante {
  readonly estComptabilisee = true;
  readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;
  public readonly options: OptionsInformationEtapeForm;

  public constructor(
    public readonly titre: string,
    public readonly validationReponses: ValidationReponses,
    public readonly composant: SimulateurEtapeNodeComponent,
    options: Partial<OptionsInformationEtapeForm> = optionsInformationEtapeFormParDefaut,
  ) {
    this.options = { ...optionsInformationEtapeFormParDefaut, ...options };
  }

  public remplitContitionSousEtape(
    donnees: DonneesFormulaireSimulateur,
  ): boolean {
    return this.options.sousEtapeConditionnelle?.condition(donnees) || false;
  }
}

export class InformationEtapeResultat implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}

  remplitContitionSousEtape(): boolean {
    return false;
  }
}
