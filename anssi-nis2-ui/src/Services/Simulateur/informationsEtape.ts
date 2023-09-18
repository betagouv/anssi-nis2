import { SimulateurEtapeResult } from "../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { DonneesFormulaireSimulateur } from "./donneesFormulaire.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "./component.ts";

export enum EtapeInexistante {
  HorsDePortee = "Hors de portee",
}

export class EtapeExistante {
  constructor(
    public readonly titre: string,
    public readonly elementToRender: SimulateurEtapeRenderedComponent,
  ) {}
}

export type InformationsEtape = EtapeExistante | EtapeInexistante;

export class SousEtapeConditionnelle {
  constructor(
    public readonly condition: (
      formData: DonneesFormulaireSimulateur,
    ) => boolean,
    public readonly sousEtape: SimulateurEtapeNodeComponent,
  ) {}
}

export class InformationEtapeForm extends EtapeExistante {
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;

  public constructor(
    public readonly titre: string,
    public readonly indicationReponses: string,
    protected readonly contenu: SimulateurEtapeNodeComponent,
    public readonly sousEtapeConditionnelle?: SousEtapeConditionnelle,
  ) {
    super(titre, SimulateurEtapeForm);
  }

  recupereContenuOuSousElement(
    donneeesFormulaire: DonneesFormulaireSimulateur,
  ) {
    if (this.sousEtapeConditionnelle?.condition(donneeesFormulaire)) {
      return this.sousEtapeConditionnelle.sousEtape;
    }
    return this.contenu;
  }

  recupereContenu() {
    return this.contenu;
  }
}

export class InformationEtapeResult implements EtapeExistante {
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}
}
