import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";
import { SecteurActivite } from "../../SecteurActivite.definitions.ts";
import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../SousSecteurActivite.definitions.ts";
import {
  sousSecteursParSecteur,
  ValeursSecteursAvecSousSecteurs,
} from "../../SousSecteurActivite.valeurs.ts";

export const contientAutreSecteurActiviteUniquement = (
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
) =>
  donneesFormulaire.secteurActivite.length === 1 &&
  donneesFormulaire.secteurActivite[0] === "autreSecteurActivite";
export const estUnSecteurAvecDesSousSecteurs = (secteur: string) =>
  ValeursSecteursAvecSousSecteurs.includes(secteur as SecteursAvecSousSecteurs);
export const estUnSecteurSansDesSousSecteurs = (secteur: string) => {
  return !ValeursSecteursAvecSousSecteurs?.includes(
    secteur as SecteursAvecSousSecteurs,
  );
};
export const estSecteurListe = (secteur: SecteurActivite) =>
  !secteur.startsWith("autre");
export const contientSousSecteur = (
  secteur: string,
  sousSecteur: SousSecteurActivite,
) =>
  sousSecteursParSecteur[secteur as SecteursAvecSousSecteurs].includes(
    sousSecteur,
  );
export const auMoinsUnSecteurListe = (secteurs: SecteurActivite[]) =>
  secteurs.some(estSecteurListe);
export const estUnSecteurSansSousSecteur = (secteur: string) =>
  !(ValeursSecteursAvecSousSecteurs as readonly string[]).includes(secteur);
