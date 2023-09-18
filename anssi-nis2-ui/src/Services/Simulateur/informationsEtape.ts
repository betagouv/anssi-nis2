import { SimulateurEtapeResult } from "../../Components/Simulateur/SimulateurEtapeResult.tsx";
import { SimulateurEtapeForm } from "../../Components/Simulateur/SimulateurEtapeForm.tsx";
import { DonneesFormulaireSimulateur } from "./donneesFormulaire.ts";
import {
  SimulateurEtapeNodeComponent,
  SimulateurEtapeRenderedComponent,
} from "./component.ts";

export type InformationsEtape = {
  titre: string;
  elementToRender: SimulateurEtapeRenderedComponent;
};

export class SousEtapeConditionnelle {
  constructor(
    public readonly condition: (
      formData: DonneesFormulaireSimulateur,
    ) => boolean,
    public readonly sousEtape: SimulateurEtapeNodeComponent,
  ) {}
}

export class InformationEtapeForm implements InformationsEtape {
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeForm;

  public constructor(
    public readonly titre: string,
    public readonly indicationReponses: string,
    protected readonly contenu: SimulateurEtapeNodeComponent,
    public readonly sousEtapeConditionnelle?: SousEtapeConditionnelle,
  ) {}

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

export class InformationEtapeResult implements InformationsEtape {
  public readonly elementToRender: SimulateurEtapeRenderedComponent =
    SimulateurEtapeResult;

  public constructor(public readonly titre: string) {}
}