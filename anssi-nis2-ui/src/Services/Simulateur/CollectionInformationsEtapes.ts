import { etapeInexistante, InformationsEtape } from "./informationsEtape.ts";

export class CollectionInformationsEtapes extends Array<InformationsEtape> {
  get nombreEtapes(): number {
    return this.filter((information) => information.estComptabilisee).length;
  }

  recupereEtapeCourante<T extends InformationsEtape>(indiceEtape: number): T {
    return this[indiceEtape] as T;
  }

  numeroCourante(indiceEtapeCourante: number) {
    return indiceEtapeCourante + 1;
  }

  estDerniereEtape(indiceEtape: number): boolean {
    return indiceEtape == this.length - 1;
  }

  recupereInformationsEtapeSuivante(
    indiceEtapeCourante: number,
  ): InformationsEtape {
    return this[indiceEtapeCourante + 1] || etapeInexistante;
  }
}
