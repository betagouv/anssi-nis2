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
import { fabriqueSousEtapeConditionnelle } from "../../Domaine/Simulateur/fabriques/InformationsEtape.fabrique.ts";
import { PredicatDonneesSimulateur } from "./PredicatDonneesSimulateur.ts";

export type InformationsEtape = {
  readonly estComptabilisee: boolean;
  readonly existe: boolean;
  readonly titre: string;
  readonly conteneurElementRendu: SimulateurEtapeRenderedComponent;
  readonly remplitContitionSousEtape: PredicatDonneesSimulateur;
};

export const EtapeInexistante: InformationsEtape = {
  estComptabilisee: false,
  existe: false,
  titre: "Hors de portee",
  conteneurElementRendu: elementVide,
  remplitContitionSousEtape: () => false,
} as const;

export type EtapeExistante = InformationsEtape;

export type SousEtapeConditionnelle = {
  readonly condition: PredicatDonneesSimulateur;
  readonly sousEtape: InformationEtapeForm;
};

export class EtapePrealable implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly existe = true;
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
      EtapeInexistante as InformationEtapeForm,
    ),
  };

export class InformationEtapeForm implements EtapeExistante {
  readonly estComptabilisee = true;
  public readonly existe = true;
  readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;

  public constructor(
    public readonly titre: string,
    public readonly validationReponses: ValidationReponses,
    public readonly composant: SimulateurEtapeNodeComponent,
    public readonly options: OptionsInformationEtapeForm,
  ) {}

  public remplitContitionSousEtape(
    donnees: DonneesFormulaireSimulateur,
  ): boolean {
    return this.options.sousEtapeConditionnelle?.condition(donnees) || false;
  }
}

export class InformationEtapeResultat implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly existe = true;
  public readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}

  remplitContitionSousEtape(): boolean {
    return false;
  }
}
