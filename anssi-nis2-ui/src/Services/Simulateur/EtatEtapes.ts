import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";
import {
  InformationEtapeForm,
  InformationsEtape,
} from "./InformationsEtape.ts";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
  IDonneesFormulaireSimulateur,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { match, P } from "ts-pattern";

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
  readonly sousEtapeNonActivee: boolean;
  readonly surEtapeInitiale: boolean;
  readonly rempliContitionSousEtape: (
    donnees: IDonneesFormulaireSimulateur,
  ) => boolean;
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
    if (this.sousEtapeNonActivee) {
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
    return this.suivant(this.donneesFormulaire).contenuEtapeCourante.titre;
  }

  get conteneurElement(): SimulateurEtapeRenderedComponent {
    return (this.contenuEtapeCourante as InformationEtapeForm)
      .conteneurElementRendu;
  }

  get etapeSuivantExiste() {
    return this.indiceEtapeCourante < this.collectionEtapes.length - 1;
  }

  get sousEtapeNonActivee() {
    return this.indiceSousEtape == EtatEtapes.indiceSousEtapeInitial;
  }

  get surEtapeInitiale() {
    return this.indiceEtapeCourante === EtatEtapes.indiceEtapeInitial;
  }

  get informationEtapeForm(): InformationEtapeForm {
    return this.collectionEtapes.recupereEtapeCourante(this.indice);
  }

  rempliContitionSousEtape(donneesFormulaire: DonneesFormulaireSimulateur) {
    return this.informationEtapeForm.rempliContitionSousEtape(
      donneesFormulaire,
    );
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
    const avanceEtape = () =>
      this.construitSuccesseur(
        this.indiceEtapeCourante + 1,
        0,
        donneesFormulaire,
      );
    const avanceSousEtape = () => {
      return this.construitSuccesseur(
        this.indiceEtapeCourante,
        this.indiceSousEtape + 1,
        donneesFormulaire,
      );
    };
    const resteEtape = () => this;
    return match<IEtatEtapes>(this)
      .with(
        {
          rempliContitionSousEtape: P.when(() =>
            this.rempliContitionSousEtape(donneesFormulaire),
          ),
          sousEtapeNonActivee: true,
        },
        avanceSousEtape,
      )
      .with({ etapeSuivantExiste: true }, avanceEtape)
      .otherwise(resteEtape);
  }

  precedent(donneesFormulaire: DonneesFormulaireSimulateur) {
    const reculeEtapeParente = () =>
      this.construitSuccesseur(
        this.indiceEtapeCourante,
        EtatEtapes.indiceSousEtapeInitial,
        donneesFormulaire,
      );
    const reculeEtape = this.construitSuccesseur(
      this.indiceEtapeCourante - 1,
      0,
      donneesFormulaire,
    );
    const resteEtape = () => this;
    return match<IEtatEtapes>(this)
      .with({ surEtapeInitiale: true }, resteEtape)
      .with(
        {
          sousEtapeNonActivee: false,
        },
        reculeEtapeParente,
      )
      .otherwise(() => reculeEtape);
  }
}
