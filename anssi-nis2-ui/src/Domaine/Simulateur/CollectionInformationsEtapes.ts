import { InformationEtapeForm, InformationsEtape } from "./InformationsEtape";
import { InformationsEtapeVide } from "./EtatEtapes";
import { ConstantesEtatEtape } from "./EtatEtape.constantes";

export class CollectionInformationsEtapes extends Array<InformationsEtape> {
  slice = (start?: number, end?: number) =>
    super.slice(start, end) as CollectionInformationsEtapes;

  get nombreEtapes(): number {
    return this.reduce(
      (somme, etape) => somme + etape.longueurComptabilisee,
      0,
    );
  }

  numero = (indice: number): number =>
    this.reduce(
      (nombre, etape, indiceCourant) =>
        indiceCourant > indice ? nombre : nombre + etape.longueurComptabilisee,
      0,
    );

  estPremiereEtape = (indice: number): boolean =>
    this.estIndiceValide(indice) &&
    this.estComptabilise(indice) &&
    this.slice(0, indice).nombreEtapes === 0;

  estDerniereEtape = (indice: number): boolean =>
    this.length > 0 &&
    this.estIndiceValide(indice) &&
    this.estComptabilise(indice) &&
    this.numero(indice) === this.nombreEtapes;

  existeEtapeSuivante = (indice: number): boolean => indice < this.length - 1;

  recupereEtape = <T extends InformationsEtape>(indice: number): T =>
    this[indice] as T;

  estSurSousEtape = (indiceSousEtape: number) =>
    indiceSousEtape != ConstantesEtatEtape.indiceSousEtapeInitial;

  estSurEtapeInitiale = (indice: number) =>
    indice === ConstantesEtatEtape.indiceEtapeInitial;

  recupereInformationsEtapeSuivante = (
    indiceDepart: number,
  ): InformationsEtape =>
    this.reduce(
      this.recuperationEtapeSuivanteOuDefaut(indiceDepart),
      InformationsEtapeVide as unknown as InformationsEtape,
    );

  recupereSousEtape = (indice: number, indiceSousEtape: number) =>
    this.estSurSousEtape(indiceSousEtape)
      ? this.recupereEtape<InformationEtapeForm>(indice).options
          ?.sousEtapeConditionnelle?.sousEtape
      : undefined;

  contenuEtape = (indiceEtape: number, indiceSousEtape: number) =>
    this.recupereSousEtape(indiceEtape, indiceSousEtape) ||
    this.recupereEtape<InformationEtapeForm>(indiceEtape);

  typeEtape = (indiceEtape: number, indiceSousEtape: number) =>
    this.recupereSousEtape(indiceEtape, indiceSousEtape)?.type ||
    this.recupereEtape<InformationEtapeForm>(indiceEtape).type;

  private estIndiceValide = (indice: number) =>
    indice >= 0 && indice < this.length;

  private estComptabilise = (indice: number) =>
    this[indice].longueurComptabilisee === 1;

  private recuperationEtapeSuivanteOuDefaut =
    (indiceCourant: number) =>
    (defaut: InformationsEtape, etape: InformationsEtape, indice: number) =>
      etape.longueurComptabilisee === 1 && indice > indiceCourant
        ? this[indice]
        : defaut;
}
