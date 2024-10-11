import { SecteurActivite, SecteurComposite } from "../../SecteurActivite.definitions";
import { SousSecteurActivite, SousSecteurAutre } from "../../SousSecteurActivite.definitions";
import { groupementsSecteursParSousSecteurs } from "../../SousSecteurActivite.valeurs";
import { estUnSecteurAvecDesSousSecteurs } from "../SecteurActivite/SecteurActivite.predicats";

export const estSousSecteurListe = (
  sousSecteur?: SousSecteurActivite | SecteurActivite,
) => !sousSecteur?.startsWith("autre");
export const estSousSecteurAutre = (
  sousSecteur?: SousSecteurActivite,
): sousSecteur is SousSecteurAutre => !!sousSecteur?.startsWith("autre");


export const estDansSecteur =
  (secteur: SecteurActivite) => (sousSecteur: SousSecteurActivite) => {
    return (
      estUnSecteurAvecDesSousSecteurs(secteur) &&
      groupementsSecteursParSousSecteurs[secteur as SecteurComposite].includes(
        sousSecteur,
      )
    );
  };
