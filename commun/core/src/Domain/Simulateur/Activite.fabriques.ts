import { Activite } from "./Activite.definitions";
import { SecteurSimple } from "./SecteurActivite.definitions";
import { SousSecteurActivite } from "./SousSecteurActivite.definitions";
import { activitesParSecteurEtSousSecteur } from "./Activite.operations";

export const fabriqueListeActivitesDesSecteurs = (
  secteurActivite: (SecteurSimple | SousSecteurActivite)[],
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
