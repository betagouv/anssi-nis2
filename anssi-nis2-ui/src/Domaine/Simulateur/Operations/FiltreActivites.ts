import { Activite, ValeursActivites } from "../Activite.ts";
import { ValeurCleSectorielle } from "../ChampsSimulateur";
import { activitesParSecteurEtSousSecteur } from "../ActivitesParSecteurEtSousSecteur.ts";

const prefixeAutreActivite = "autreActivite";
export const filtreActivitesAutres = (
  valeursActivites: string[] | readonly string[],
) =>
  valeursActivites.filter((activite) =>
    activite.startsWith(prefixeAutreActivite),
  ) as Activite[];
export const filtreActivitesListees = (
  valeursActivites: string[] | readonly string[],
) =>
  valeursActivites.filter(
    (activite) => !activite.startsWith(prefixeAutreActivite),
  ) as Activite[];
export const listeActivitesAutre: Activite[] =
  filtreActivitesAutres(ValeursActivites);
export const listeActivitesSaufAutre: Activite[] =
  filtreActivitesListees(ValeursActivites);
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
