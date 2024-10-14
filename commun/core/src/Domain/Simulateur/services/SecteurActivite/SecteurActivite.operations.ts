import { SecteurActivite, SecteurComposite } from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { sousSecteursParSecteur } from "../../SousSecteurActivite.valeurs";

export const fabriqueTupleSecteurSousSecteurs: (
  secteur: SecteurComposite,
) => [SecteurActivite, Readonly<SousSecteurActivite[]>] = (secteur) => [
  secteur,
  sousSecteursParSecteur[secteur],
];
