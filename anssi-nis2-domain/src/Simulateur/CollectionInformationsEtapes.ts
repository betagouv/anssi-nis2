import { InformationEtapeForm, InformationsEtape } from "./InformationsEtape";
import { ConstantesEtatEtape, EtapeVide } from "./EtatEtapes";

export class CollectionInformationsEtapes<
  TypeConteneur,
  TypeSimulateurEtapeNodeComponent,
> extends Array<InformationsEtape<TypeConteneur>> {
  slice = (start?: number, end?: number) =>
    super.slice(start, end) as CollectionInformationsEtapes<
      TypeConteneur,
      TypeSimulateurEtapeNodeComponent
    >;

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

  recupereEtape = <T extends InformationsEtape<TypeConteneur>>(
    indice: number,
  ): T => this[indice] as T;

  estSurSousEtape = (indiceSousEtape: number) =>
    indiceSousEtape != ConstantesEtatEtape.indiceSousEtapeInitial;

  estSurEtapeInitiale = (indice: number) =>
    indice === ConstantesEtatEtape.indiceEtapeInitial;

  recupereInformationsEtapeSuivante = (
    indiceDepart: number,
  ): InformationsEtape<TypeConteneur> =>
    this.reduce(
      this.recuperationEtapeSuivanteOuDefaut(indiceDepart),
      EtapeVide as unknown as InformationsEtape<TypeConteneur>,
    );

  recupereSousEtape = (indice: number, indiceSousEtape: number) =>
    this.estSurSousEtape(indiceSousEtape)
      ? this.recupereEtape<
          InformationEtapeForm<TypeConteneur, TypeSimulateurEtapeNodeComponent>
        >(indice).options?.sousEtapeConditionnelle?.sousEtape
      : undefined;

  contenuEtape = (indiceEtape: number, indiceSousEtape: number) =>
    this.recupereSousEtape(indiceEtape, indiceSousEtape) ||
    this.recupereEtape<
      InformationEtapeForm<TypeConteneur, TypeSimulateurEtapeNodeComponent>
    >(indiceEtape);

  typeEtape = (indiceEtape: number, indiceSousEtape: number) =>
    this.recupereSousEtape(indiceEtape, indiceSousEtape)?.type ||
    this.recupereEtape<
      InformationEtapeForm<TypeConteneur, TypeSimulateurEtapeNodeComponent>
    >(indiceEtape).type;

  private estIndiceValide = (indice: number) =>
    indice >= 0 && indice < this.length;

  private estComptabilise = (indice: number) =>
    this[indice].longueurComptabilisee === 1;

  private recuperationEtapeSuivanteOuDefaut =
    (indiceCourant: number) =>
    (
      defaut: InformationsEtape<TypeConteneur>,
      etape: InformationsEtape<TypeConteneur>,
      indice: number,
    ) =>
      etape.longueurComptabilisee === 1 && indice > indiceCourant
        ? this[indice]
        : defaut;
}
