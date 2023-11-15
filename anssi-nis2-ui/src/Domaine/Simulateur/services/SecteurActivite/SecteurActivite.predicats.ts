import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions";
import {
  sousSecteursParSecteur,
  ValeursSecteursAvecSousSecteurs,
} from "../../SousSecteurActivite.valeurs";

export const contientAutreSecteurActiviteUniquement = (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) =>
  donneesFormulaire.secteurActivite.length === 1 &&
  donneesFormulaire.secteurActivite[0] === "autreSecteurActivite";
export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(secteur as SecteursAvecSousSecteurs);

export const filtreSecteursAvecSousSecteurs = (secteur: SecteurActivite[]) =>
  secteur.filter(estUnSecteurAvecDesSousSecteurs) as SecteursAvecSousSecteurs[];
export const estUnSecteurSansDesSousSecteurs = (secteur: string) => {
  return !ValeursSecteursAvecSousSecteurs?.includes(
    secteur as SecteursAvecSousSecteurs,
  );
};
export const estSecteurListe = (secteur: SecteurActivite) =>
  !secteur.startsWith("autre");
export const estSecteurAutre = (secteur: SecteurActivite) =>
  secteur.startsWith("autre");
export const contientSousSecteur = (
  secteur: string,
  sousSecteur: SousSecteurActivite,
) =>
  sousSecteursParSecteur[secteur as SecteursAvecSousSecteurs].includes(
    sousSecteur,
  );
export const auMoinsUnSecteurListe = (secteurs: SecteurActivite[]) =>
  secteurs.length > 0 && secteurs.some(estSecteurListe);
export const aucunSecteurListe = (secteurs: SecteurActivite[]) =>
  !auMoinsUnSecteurListe(secteurs);
export const uniquementDesSecteursAutres = (secteurs: SecteurActivite[]) =>
  secteurs.length > 0 && secteurs.every(estSecteurAutre);

export const estUnSecteurSansSousSecteur = (secteur: string) =>
  !(ValeursSecteursAvecSousSecteurs as readonly string[]).includes(secteur);
