import { InformationsEtape } from "./informationsEtape.ts";
import { dansIntervalle } from "../../utilitaires/calculs.ts";

export class CollectionInformationsEtapes extends Array<InformationsEtape> {
  estAvantDerniereEtape(numeroEtape: number) {
    return numeroEtape >= this.length - 2;
  }

  recupereInformationsEtapeSuivante(numeroEtapeCourante: number) {
    return this[numeroEtapeCourante + 1] || "";
  }

  siExiste(numeroEtape: number, action: (val: number) => void) {
    if (dansIntervalle(numeroEtape, 0, this.length - 1)) {
      action(numeroEtape);
    }
  }

  recupereEtapeCourante<T extends InformationsEtape>(numeroEtape: number): T {
    return this[numeroEtape] as T;
  }

  numeroCourante(numeroEtapeCourante: number) {
    return numeroEtapeCourante + 1;
  }

  recupereElement(numeroEtapeCourante: number) {
    const informationsEtape = this[numeroEtapeCourante];
    return informationsEtape.elementToRender;
  }
}
