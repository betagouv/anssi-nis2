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

  suivant(donneesFormulaire: DonneesFormulaireSimulateur) {
    return match<IEtatEtapes>(this)
      .with(
        {
          rempliContitionSousEtape: P.when(() =>
            this.rempliContitionSousEtape(donneesFormulaire),
          ),
          sousEtapeNonActivee: true,
        },
        this.fabriqueAvanceSousEtape(donneesFormulaire),
      )
      .with(
        { etapeSuivantExiste: true },
        this.fabriqueAvanceEtape(donneesFormulaire),
      )
      .otherwise(() => this);
  }

  precedent(donneesFormulaire: DonneesFormulaireSimulateur) {
    return match<IEtatEtapes>(this)
      .with({ surEtapeInitiale: true }, () => this)
      .with(
        {
          sousEtapeNonActivee: false,
        },
        this.fabriqueReculeEtapeParente(donneesFormulaire),
      )
      .otherwise(() => this.fabriqueReculeEtape(donneesFormulaire));
  }

  private construitSuccesseur(
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

  private fabriqueAvanceEtape(donneesFormulaire: DonneesFormulaireSimulateur) {
    return () =>
      this.construitSuccesseur(
        this.indiceEtapeCourante + 1,
        0,
        donneesFormulaire,
      );
  }

  private fabriqueAvanceSousEtape(
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) {
    return () => {
      return this.construitSuccesseur(
        this.indiceEtapeCourante,
        this.indiceSousEtape + 1,
        donneesFormulaire,
      );
    };
  }

  private fabriqueReculeEtape(donneesFormulaire: DonneesFormulaireSimulateur) {
    return this.construitSuccesseur(
      this.indiceEtapeCourante - 1,
      0,
      donneesFormulaire,
    );
  }

  private fabriqueReculeEtapeParente(
    donneesFormulaire: DonneesFormulaireSimulateur,
  ) {
    return () =>
      this.construitSuccesseur(
        this.indiceEtapeCourante,
        EtatEtapes.indiceSousEtapeInitial,
        donneesFormulaire,
      );
  }
}
