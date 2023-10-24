import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import {
  InformationEtapeForm,
  InformationsEtape,
} from "./InformationsEtape.ts";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";

import { SimulateurEtapeRenderedComponent } from "./Props/component";

export class EtatEtapes {
  static readonly indiceEtapeInitial = 0;
  static readonly indiceSousEtapeInitial = 0;

  get indice(): number {
    return this.indiceEtapeCourante;
  }

  get numero(): number {
    return this.collectionEtapes.numeroCourant(this.indice);
  }

  get contenuEtapeCourante(): InformationsEtape {
    const etapeCourante = this.collectionEtapes.recupereEtapeCourante(
      this.indiceEtapeCourante,
    );
    if (this.surSousEtapeInitiale()) {
      return etapeCourante;
    }
    return (
      this.collectionEtapes.recupereSousEtape(this.indiceEtapeCourante) ||
      etapeCourante
    );
  }

  get titre(): string {
    return this.contenuEtapeCourante.titre;
  }

  get titreSuivant(): string {
    return this.suivant(donneesFormulaireSimulateurVide).contenuEtapeCourante
      .titre;
  }

  get conteneurElement(): SimulateurEtapeRenderedComponent {
    return this.contenuEtapeCourante.conteneurElementRendu;
  }

  constructor(
    public readonly collectionEtapes: CollectionInformationsEtapes,
    public readonly indiceEtapeCourante: number,
    public readonly indiceSousEtape: number = 0,
  ) {}

  suivant(donneesFormulaire: DonneesFormulaireSimulateur) {
    const informationsEtape = this.informationEtapeForm();
    if (
      this.surSousEtapeInitiale() &&
      informationsEtape.rempliContitionSousEtape(donneesFormulaire)
    ) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.indiceEtapeCourante,
        this.indiceSousEtape + 1,
      );
    }
    if (this.existeEtapeSuivante()) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.indiceEtapeCourante + 1,
        0,
      );
    }
    return this;
  }

  precedent(donneesFormulaire: DonneesFormulaireSimulateur) {
    const informationsEtape = this.informationEtapeForm();
    if (this.surEtapeInitiale()) {
      return this;
    }

    if (
      !this.surSousEtapeInitiale() &&
      informationsEtape.rempliContitionSousEtape(donneesFormulaire)
    ) {
      return new EtatEtapes(
        this.collectionEtapes,
        this.indiceEtapeCourante,
        EtatEtapes.indiceSousEtapeInitial,
      );
    }

    return new EtatEtapes(this.collectionEtapes, this.indiceEtapeCourante - 1);
  }

  private existeEtapeSuivante() {
    return this.indiceEtapeCourante < this.collectionEtapes.length - 1;
  }

  private surSousEtapeInitiale() {
    return this.indiceSousEtape == EtatEtapes.indiceSousEtapeInitial;
  }

  private surEtapeInitiale() {
    return this.indiceEtapeCourante === EtatEtapes.indiceEtapeInitial;
  }

  private informationEtapeForm(): InformationEtapeForm {
    return this.collectionEtapes.recupereEtapeCourante(this.indice);
  }
}
