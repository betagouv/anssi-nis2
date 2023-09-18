import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.ts";

export class EtatEtapes {
  constructor(
    public readonly collectionEtapes: CollectionInformationsEtapes,
    public readonly numeroEtapeCourante: number,
  ) {}

  contenuEtapeCourante() {
    return this.collectionEtapes.recupereEtapeCourante(
      this.numeroEtapeCourante - 1,
    );
  }

  suivante() {
    return new EtatEtapes(this.collectionEtapes, this.numeroEtapeCourante + 1);
  }

  precedent() {
    return new EtatEtapes(this.collectionEtapes, this.numeroEtapeCourante - 1);
  }
}
