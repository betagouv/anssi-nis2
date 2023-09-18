import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import { InformationEtapeForm } from "./informationsEtape.ts";
import { DonneesFormulaireSimulateur } from "./donneesFormulaire.ts";

export class EtatEtapes {
  constructor(
    public readonly collectionEtapes: CollectionInformationsEtapes,
    public readonly numeroEtapeCourante: number,
    public readonly numeroSousEtape: number = 0,
  ) {}

  contenuEtapeCourante() {
    if (this.numeroSousEtape == 0) {
      return this.collectionEtapes.recupereEtapeCourante(
        this.numeroEtapeCourante - 1,
      );
    }
    return (
      this.collectionEtapes.recupereEtapeCourante(
        this.numeroEtapeCourante - 1,
      ) as InformationEtapeForm
    ).sousEtapeConditionnelle?.sousEtape;
  }

  suivante(donneesFormulaire: DonneesFormulaireSimulateur) {
    const truc = this.collectionEtapes.recupereEtapeCourante(
      this.numeroEtapeCourante - 1,
    ) as InformationEtapeForm;

    if (truc.sousEtapeConditionnelle?.condition(donneesFormulaire)) {
      return new EtatEtapes(this.collectionEtapes, this.numeroEtapeCourante, 1);
    }
    return new EtatEtapes(this.collectionEtapes, this.numeroEtapeCourante + 1);
  }

  precedent() {
    return new EtatEtapes(this.collectionEtapes, this.numeroEtapeCourante - 1);
  }
}
