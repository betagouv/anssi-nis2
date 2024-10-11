import { SecteurActivite } from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { sousSecteursParSecteur } from "../../SousSecteurActivite.valeurs";


export const secteurDe = (recherche: SousSecteurActivite): SecteurActivite => {
  const tupleDuSecteur = Object.entries(sousSecteursParSecteur).find(
    ([, sousSecteurs]) => sousSecteurs.includes(recherche)
  );

  return tupleDuSecteur![0] as SecteurActivite;
};
