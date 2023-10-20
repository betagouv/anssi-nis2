import { SimulateurEtapeResult } from "../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "./Props/component";

import { ValidationReponses } from "../../Domaine/Simulateur/Operations/validateursChamps";
import { SimulateurEtapePrealable } from "../../Components/Simulateur/SimulateurEtapePrealable.tsx";

export interface InformationsEtape {
  estComptabilisee: boolean;
  titre: string;
}

export class EtapeInexistante implements InformationsEtape {
  public readonly estComptabilisee = false;
  public readonly titre = "Hors de portee";
}

export const etapeInexistante = new EtapeInexistante();

export abstract class EtapeExistante implements InformationsEtape {
  public abstract readonly estComptabilisee: boolean;
  public abstract readonly conteneurElementRendu: SimulateurEtapeRenderedComponent;

  protected constructor(public readonly titre: string) {}
}

export class SousEtapeConditionnelle {
  constructor(
    public readonly condition: (
      formData: DonneesFormulaireSimulateur,
    ) => boolean,
    public readonly sousEtape: InformationEtapeForm,
  ) {}
}

export class EtapePrealable implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapePrealable;

  public constructor(public readonly titre: string) {}
}

export class InformationEtapeForm extends EtapeExistante {
  public readonly estComptabilisee = true;
  public readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;

  public constructor(
    public readonly titre: string,
    public readonly validationReponses: ValidationReponses,
    public readonly composant: SimulateurEtapeNodeComponent,
    public readonly sousEtapeConditionnelle?: SousEtapeConditionnelle,
  ) {
    super(titre);
  }
}

export class InformationEtapeResult implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly conteneurElementRendu: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}
}
