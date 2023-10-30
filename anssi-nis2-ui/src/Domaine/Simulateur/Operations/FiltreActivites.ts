import { Activite } from "../Activite.ts";
import { ValeurCleSectorielle } from "../ChampsSimulateur";
import { activitesParSecteurEtSousSecteur } from "../ActivitesParSecteurEtSousSecteur.ts";

const prefixeAutreActivite = "autreActivite";
export const estActiviteAutre = (activite: Activite) =>
  activite.startsWith(prefixeAutreActivite);
export const estActiviteListee = (activite: Activite) =>
  !activite.startsWith(prefixeAutreActivite);

export const fabriqueListeActivitesDesSecteurs = (
  secteurActivite: ValeurCleSectorielle[],
  filtreActivite: (activite: Activite) => boolean,
): Activite[] => {
  return Array.from(
    secteurActivite.reduce((ensembleActivites, secteur) => {
      activitesParSecteurEtSousSecteur[secteur]
        ?.filter(filtreActivite)
        .map((activite: Activite) => ensembleActivites.add(activite));
      return ensembleActivites;
    }, new Set<Activite>()),
  );
};
export const auMoinsUneActiviteListee = (activites: Activite[]) =>
  activites && activites.length && activites.some(estActiviteListee);
export const aucuneActiviteListee = (activites: Activite[]) =>
  activites.every(estActiviteAutre);
