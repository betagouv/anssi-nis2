import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import { EtapeExistante, InformationEtapeForm } from "./informationsEtape.ts";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";

import { SimulateurEtapeRenderedComponent } from "./Props/component";
import { VVV } from "../../utilitaires/debug.ts";

export class EtatEtapes {
  static readonly indiceSousEtapeInitial = 0;

  get indiceCourant(): number {
    return this.indiceEtapeCourante;
  }

  get numeroCourant(): number {
    return this.collectionEtapes.numeroCourante(this.indiceCourant);
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
          this.indiceEtapeCourante - 1,
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
        EtatEtapes.indiceSousEtapeInitial + 1,
      );
    }
    if (this.indiceEtapeCourante < this.collectionEtapes.length) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.indiceEtapeCourante + 1,
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
    VVV("infoirmations etape : ", this.indiceCourant);
    VVV("collectionEtapes : ", this.collectionEtapes);
    return this.collectionEtapes.recupereEtapeCourante(
      this.indiceCourant,
    ) as InformationEtapeForm;
  }
}
