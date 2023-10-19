import { SimulateurEtapeResult } from "../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "./Props/component";

import { ValidationReponses } from "../../Domaine/Simulateur/Operations/validateursChamps";

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

  constructor(
    public readonly titre: string,
    public readonly elementToRender: SimulateurEtapeRenderedComponent,
  ) {}
}

export class SousEtapeConditionnelle {
  constructor(
    public readonly condition: (
      formData: DonneesFormulaireSimulateur,
    ) => boolean,
    public readonly sousEtape: InformationEtapeForm,
  ) {}
}

export class InformationEtapeForm extends EtapeExistante {
  public readonly estComptabilisee = true;
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;

  public constructor(
    public readonly titre: string,
    public readonly validationReponses: ValidationReponses,
    protected readonly contenu: SimulateurEtapeNodeComponent,
    public readonly sousEtapeConditionnelle?: SousEtapeConditionnelle,
  ) {
    super(titre, SimulateurEtapeForm);
  }

  recupereContenu() {
    return this.contenu;
  }
}

export class InformationEtapeResult implements EtapeExistante {
  public readonly estComptabilisee = false;
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}
}
