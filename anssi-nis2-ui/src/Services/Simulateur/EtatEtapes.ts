import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import { EtapeExistante, InformationEtapeForm } from "./informationsEtape.ts";
import { DonneesFormulaireSimulateur } from "./donneesFormulaire.ts";

export class EtatEtapes {
  static readonly numeroSousEtapeInitial = 0;

  get indiceCourant(): number {
    return this.numeroEtapeCourante - 1;
  }

  constructor(
    public readonly collectionEtapes: CollectionInformationsEtapes,
    public readonly numeroEtapeCourante: number,
    public readonly numeroSousEtape: number = 0,
  ) {}

  contenuEtapeCourante(): EtapeExistante {
    if (this.numeroSousEtape === EtatEtapes.numeroSousEtapeInitial) {
      return this.collectionEtapes.recupereEtapeCourante(this.indiceCourant);
    }
    return (
      (
        this.collectionEtapes.recupereEtapeCourante(
          this.numeroEtapeCourante - 1,
        ) as InformationEtapeForm
      ).sousEtapeConditionnelle?.sousEtape ||
      this.collectionEtapes.recupereEtapeCourante(this.indiceCourant)
    );
  }

  suivant(donneesFormulaire: DonneesFormulaireSimulateur) {
    const informationsEtape = this.informationEtapeForm();

    if (
      this.numeroSousEtape == EtatEtapes.numeroSousEtapeInitial &&
      informationsEtape.sousEtapeConditionnelle?.condition(donneesFormulaire)
    ) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.numeroEtapeCourante,
        EtatEtapes.numeroSousEtapeInitial + 1,
      );
    }
    if (this.collectionEtapes.length > this.numeroEtapeCourante) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.numeroEtapeCourante + 1,
      );
    }
    return this;
  }

  precedent(donneesFormulaire: DonneesFormulaireSimulateur) {
    const informationsEtape = this.informationEtapeForm();
    if (this.numeroEtapeCourante === 1) {
      return this;
    }

    if (
      this.numeroSousEtape != EtatEtapes.numeroSousEtapeInitial &&
      informationsEtape.sousEtapeConditionnelle?.condition(donneesFormulaire)
    ) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.numeroEtapeCourante,
        EtatEtapes.numeroSousEtapeInitial,
      );
    }

    return new EtatEtapes(this.collectionEtapes, this.numeroEtapeCourante - 1);
  }

  private informationEtapeForm() {
    return this.collectionEtapes.recupereEtapeCourante(
      this.indiceCourant,
    ) as InformationEtapeForm;
  }
}
