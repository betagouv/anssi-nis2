import {
  EtapeExistante,
  EtapeInexistante,
  InformationsEtape,
} from "./informationsEtape.ts";
import { dansIntervalle } from "../../utilitaires/calculs.ts";

export class CollectionInformationsEtapes extends Array<InformationsEtape> {
  recupereEtapeCourante<T extends InformationsEtape>(numeroEtape: number): T {
    return this[numeroEtape] as T;
  }

  siExiste(numeroEtape: number, action: (val: number) => void) {
    if (dansIntervalle(numeroEtape, 0, this.length - 1)) {
      action(numeroEtape);
    }
  }

  numeroCourante(numeroEtapeCourante: number) {
    return numeroEtapeCourante + 1;
  }

  estAvantDerniereEtape(numeroEtape: number): boolean {
    return numeroEtape == this.length - 2;
  }

  recupereInformationsEtapeSuivante(
    numeroEtapeCourante: number,
  ): InformationsEtape {
    return this[numeroEtapeCourante + 1] || EtapeInexistante.HorsDePortee;
  }

  recupereElement(numeroEtapeCourante: number) {
    const informationsEtape = this[numeroEtapeCourante];
    return (informationsEtape as EtapeExistante).elementToRender;
  }
}
