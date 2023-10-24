import { etapeInexistante, InformationsEtape } from "./InformationsEtape.ts";

export class CollectionInformationsEtapes extends Array<InformationsEtape> {
  get nombreEtapes(): number {
    return this.filter((information) => information.estComptabilisee).length;
  }

  toString(): string {
    return this.reduce(
      (acc, etape, indice) =>
        `${acc}, [${indice}] => '${etape.titre}' (comptabilisé: ${etape.estComptabilisee})`,
      "",
    );
  }

  recupereEtapeCourante<T extends InformationsEtape>(indiceEtape: number): T {
    return this[indiceEtape] as T;
  }

  numeroCourant(indiceEtapeCourante: number): number {
    return this.reduce((nombre, etape, indiceCourant) => {
      if (!etape.estComptabilisee || indiceCourant > indiceEtapeCourante)
        return nombre;
      return nombre + 1;
    }, 0);
  }

  estPremiereEtape(indiceEtape: number): boolean {
    return (
      indiceEtape < this.length &&
      this[indiceEtape].estComptabilisee &&
      !this.slice(0, indiceEtape).some((etape) => etape.estComptabilisee)
    );
  }

  estDerniereEtape(indiceEtape: number): boolean {
    return (
      indiceEtape >= 0 &&
      this.length > 0 &&
      indiceEtape < this.length &&
      this[indiceEtape].estComptabilisee &&
      this.numeroCourant(indiceEtape) === this.nombreEtapes
    );
  }

  recupereInformationsEtapeSuivante(
    indiceEtapeCourante: number,
  ): InformationsEtape {
    return this.reduce((informationEtape, etape, indiceCourant) => {
      if (etape.estComptabilisee && indiceCourant > indiceEtapeCourante)
        return this[indiceCourant];
      return informationEtape;
    }, etapeInexistante);
  }
}
