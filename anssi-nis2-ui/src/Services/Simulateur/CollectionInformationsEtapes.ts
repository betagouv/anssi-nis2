import { etapeInexistante, InformationsEtape } from "./informationsEtape.ts";
import { dansIntervalle } from "../../utilitaires/calculs.ts";

export class CollectionInformationsEtapes extends Array<InformationsEtape> {
  get nombreEtapes(): number {
    return this.length - 1;
  }

  recupereEtapeCourante<T extends InformationsEtape>(indiceEtape: number): T {
    return this[indiceEtape] as T;
  }

  siExiste(indiceEtape: number, action: (val: number) => void) {
    if (dansIntervalle(indiceEtape, 0, this.length - 1)) {
      action(indiceEtape);
    }
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
