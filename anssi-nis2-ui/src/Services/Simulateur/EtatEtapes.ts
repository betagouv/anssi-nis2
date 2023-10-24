import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import { EtapeExistante, InformationEtapeForm } from "./informationsEtape.ts";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";

import { SimulateurEtapeRenderedComponent } from "./Props/component";

export class EtatEtapes {
  static readonly indiceSousEtapeInitial = 0;

  get indiceCourant(): number {
    return this.indiceEtapeCourante;
  }

  get numeroCourant(): number {
    return this.collectionEtapes.numeroCourant(this.indiceCourant);
  }

  constructor(
    public readonly collectionEtapes: CollectionInformationsEtapes,
    public readonly indiceEtapeCourante: number,
    public readonly indiceSousEtape: number = 0,
  ) {}

  contenuEtapeCourante(): EtapeExistante {
    if (this.indiceSousEtape === EtatEtapes.indiceSousEtapeInitial) {
      return this.collectionEtapes.recupereEtapeCourante(this.indiceCourant);
    }
    return (
      (
        this.collectionEtapes.recupereEtapeCourante(
          this.indiceEtapeCourante,
        ) as InformationEtapeForm
      ).options?.sousEtapeConditionnelle?.sousEtape ||
      this.collectionEtapes.recupereEtapeCourante(this.indiceCourant)
    );
  }

  get conteneurElementCourant(): SimulateurEtapeRenderedComponent {
    return this.contenuEtapeCourante().conteneurElementRendu;
  }

  suivant(donneesFormulaire: DonneesFormulaireSimulateur) {
    const informationsEtape = this.informationEtapeForm();
    if (
      this.indiceSousEtape == EtatEtapes.indiceSousEtapeInitial &&
      informationsEtape.options?.sousEtapeConditionnelle?.condition(
        donneesFormulaire,
      )
    ) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.indiceEtapeCourante,
        this.indiceSousEtape + 1,
      );
    }
    if (this.indiceEtapeCourante < this.collectionEtapes.length - 1) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.indiceEtapeCourante + 1,
        0,
      );
    }
    return this;
  }

  get titreSuivant(): string {
    return this.suivant(donneesFormulaireSimulateurVide).contenuEtapeCourante()
      .titre;
  }

  precedent(donneesFormulaire: DonneesFormulaireSimulateur) {
    const informationsEtape = this.informationEtapeForm();
    if (this.indiceEtapeCourante === 0) {
      return this;
    }

    if (
      this.indiceSousEtape != EtatEtapes.indiceSousEtapeInitial &&
      informationsEtape.options?.sousEtapeConditionnelle?.condition(
        donneesFormulaire,
      )
    ) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.indiceEtapeCourante,
        EtatEtapes.indiceSousEtapeInitial,
      );
    }

    return new EtatEtapes(this.collectionEtapes, this.indiceEtapeCourante - 1);
  }

  private informationEtapeForm() {
    return this.collectionEtapes.recupereEtapeCourante(
      this.indiceCourant,
    ) as InformationEtapeForm;
  }
}
