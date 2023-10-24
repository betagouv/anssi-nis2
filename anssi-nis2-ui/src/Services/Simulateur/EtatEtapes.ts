import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import {
  InformationEtapeForm,
  InformationsEtape,
} from "./InformationsEtape.ts";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { match } from "ts-pattern";

import { SimulateurEtapeRenderedComponent } from "./Props/component";

interface IEtatEtapes {
  readonly collectionEtapes: CollectionInformationsEtapes;
  readonly indiceEtapeCourante: number;
  readonly indiceSousEtape: number;
  readonly donneesFormulaire: DonneesFormulaireSimulateur;
  readonly indice: number;
  readonly numero: number;
  readonly contenuEtapeCourante: InformationsEtape;
  readonly titre: string;
  readonly titreSuivant: string;
  readonly conteneurElement: SimulateurEtapeRenderedComponent;
  readonly etapeSuivantExiste: boolean;
  readonly etapeCouranteEstSousEtape: boolean;
  readonly surEtapeInitiale: boolean;
  readonly rempliContitionSousEtape: boolean;
  readonly informationEtapeForm: InformationEtapeForm;
}

export class EtatEtapes implements IEtatEtapes {
  static readonly indiceEtapeInitial = 0;
  static readonly indiceSousEtapeInitial = 0;

  constructor(
    readonly collectionEtapes: CollectionInformationsEtapes,
    readonly indiceEtapeCourante: number,
    readonly indiceSousEtape: number = 0,
    readonly donneesFormulaire: DonneesFormulaireSimulateur = donneesFormulaireSimulateurVide,
  ) {}

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
    if (this.etapeCouranteEstSousEtape) {
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

  get etapeSuivantExiste() {
    return this.indiceEtapeCourante < this.collectionEtapes.length - 1;
  }

  get etapeCouranteEstSousEtape() {
    return this.indiceSousEtape == EtatEtapes.indiceSousEtapeInitial;
  }

  get surEtapeInitiale() {
    return this.indiceEtapeCourante === EtatEtapes.indiceEtapeInitial;
  }

  get rempliContitionSousEtape() {
    return this.informationEtapeForm.rempliContitionSousEtape(
      this.donneesFormulaire,
    );
  }

  get informationEtapeForm(): InformationEtapeForm {
    return this.collectionEtapes.recupereEtapeCourante(this.indice);
  }

  public construitSuccesseur(
    indiceEtape: number,
    indiceSousEtape: number,
    donneesFormulaire: DonneesFormulaireSimulateur,
  ): EtatEtapes {
    return new EtatEtapes(
      this.collectionEtapes,
      indiceEtape,
      indiceSousEtape,
      donneesFormulaire,
    );
  }

  suivant(donneesFormulaire: DonneesFormulaireSimulateur) {
    return match<IEtatEtapes>(this)
      .with(
        {
          rempliContitionSousEtape: true,
          etapeCouranteEstSousEtape: true,
        },
        () =>
          this.construitSuccesseur(
            this.indiceEtapeCourante,
            this.indiceSousEtape + 1,
            donneesFormulaire,
          ),
      )
      .with({ etapeSuivantExiste: true }, () =>
        this.construitSuccesseur(
          this.indiceEtapeCourante + 1,
          0,
          donneesFormulaire,
        ),
      )
      .otherwise(() => this);
  }

  precedent(donneesFormulaire: DonneesFormulaireSimulateur) {
    return match<IEtatEtapes>(this)
      .with({ surEtapeInitiale: true }, () => this)
      .with(
        { etapeCouranteEstSousEtape: false, rempliContitionSousEtape: true },
        () =>
          this.construitSuccesseur(
            this.indiceEtapeCourante,
            EtatEtapes.indiceSousEtapeInitial,
            donneesFormulaire,
          ),
      )
      .otherwise(() =>
        this.construitSuccesseur(
          this.indiceEtapeCourante - 1,
          0,
          donneesFormulaire,
        ),
      );
  }
}
