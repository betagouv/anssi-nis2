import {
  InformationEtapeForm,
  InformationsEtape,
} from "./InformationsEtape.ts";
import { EtapeInexistante } from "../../Domaine/Simulateur/fabriques/InformationsEtape.fabrique.ts";
import { ConstantesEtatEtape } from "./EtatEtapes.ts";

export class CollectionInformationsEtapes extends Array<InformationsEtape> {
  get nombreEtapes(): number {
    return this.filter((information) => information.estComptabilisee).length;
  }

  toString(): string {
    return this.map(
      (etape, indice) =>
        `[${indice}] => '${etape.titre}' (comptabilisé: ${etape.estComptabilisee})`,
    ).join(", ");
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
    }, EtapeInexistante);
  }

  recupereSousEtape(indiceEtapeCourante: number) {
    return this.recupereEtapeCourante<InformationEtapeForm>(indiceEtapeCourante)
      .options.sousEtapeConditionnelle?.sousEtape;
  }

  existeEtapeSuivante(indiceEtape: number): boolean {
    return indiceEtape < this.length - 1;
  }

  estSurSousEtape(indiceSousEtape: number) {
    return indiceSousEtape != ConstantesEtatEtape.indiceSousEtapeInitial;
  }

  estSurEtapeInitiale(indiceEtape: number) {
    return indiceEtape === ConstantesEtatEtape.indiceEtapeInitial;
  }

  contenuEtapeCourante(
    collectionEtapes: CollectionInformationsEtapes,
    indiceEtape: number,
    indiceSousEtape: number,
  ): InformationEtapeForm {
    const etapeCourante = collectionEtapes.recupereEtapeCourante(
      indiceEtape,
    ) as InformationEtapeForm;
    return this.estSurSousEtape(indiceSousEtape)
      ? collectionEtapes.recupereSousEtape(indiceEtape) || etapeCourante
      : etapeCourante;
  }
}
