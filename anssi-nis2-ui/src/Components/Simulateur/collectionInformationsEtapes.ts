import { InformationsEtape } from "./informationsEtape.ts";

export class CollectionInformationsEtapes extends Array<InformationsEtape> {
  estAvantDerniereEtape(numeroEtape: number) {
    return numeroEtape >= this.length - 2;
  }

  recupereInformationsEtapeSuivante(numeroEtapeCourante: number) {
    return this[numeroEtapeCourante + 1] || "";
  }
}
