import {
  SecteurActivite,
  SecteurComposite,
} from "../../SecteurActivite.definitions";
import { ValeursSecteursComposites } from "../../SecteurActivite.valeurs";

export const estUnSecteurAvecDesSousSecteurs = (
  secteur: string
): secteur is SecteurComposite =>
  ValeursSecteursComposites.includes(secteur as SecteurComposite);

export const estSecteurAutre = (secteur: SecteurActivite) =>
  secteur.startsWith("autre");

export const estUnSecteurSansSousSecteur = (secteur: string) =>
  !(ValeursSecteursComposites as readonly string[]).includes(secteur);
