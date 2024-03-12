import {
  SecteurActivite,
  SecteurComposite,
} from "./SecteurActivite.definitions";
import {
  ValeursSecteursActivites,
  ValeursSecteursComposites,
} from "./SecteurActivite.valeurs";
import { fabriqueTuplesSecteurSousSecteur } from "./services/SecteurActivite/SecteurActivite.operations";
import {
  estSecteurListe,
  estUnSecteurSansDesSousSecteurs,
} from "./services/SecteurActivite/SecteurActivite.predicats";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions";

export const ValeursSecteursSansSousSecteur: SecteurActivite[] =
  ValeursSecteursActivites.filter(estUnSecteurSansDesSousSecteurs);
export const listeTuplesSecteursSousSecteurs = ValeursSecteursComposites.filter(
  estSecteurListe,
).reduce(
  (acc: [SecteurComposite, SousSecteurActivite][], secteur) => [
    ...acc,
    ...fabriqueTuplesSecteurSousSecteur(secteur),
  ],
  [],
);
