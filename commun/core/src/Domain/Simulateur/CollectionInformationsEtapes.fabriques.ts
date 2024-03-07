import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.definitions";
import { InformationsEtape } from "./InformationsEtape";

export const fabriqueCollectionInformationsEtapes = (
  ...listes: InformationsEtape[][]
) => {
  const informationsEtapes = listes.reduce(
    (listeResultat, listeCourante) => listeResultat.concat(...listeCourante),
    [],
  );
  return new CollectionInformationsEtapes(...informationsEtapes);
};