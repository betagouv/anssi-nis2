import { Activite } from "../../Activite.definitions";
import { ValeurCleSectorielle } from "../../ValeurCleSectorielle.definitions";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations";

export const fabriqueListeActivitesDesSecteurs = (
  secteurActivite: ValeurCleSectorielle[],
  filtreActivite: (activite: Activite) => boolean,
): Activite[] =>
  Array.from(
    secteurActivite.reduce((ensembleActivites, secteur) => {
      activitesParSecteurEtSousSecteur[secteur]
        ?.filter(filtreActivite)
        .map((activite: Activite) => ensembleActivites.add(activite));
      return ensembleActivites;
    }, new Set<Activite>()),
  );