import { auMoinsUnSecteurListe } from "../../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { auMoinsUnSousSecteurListe } from "../../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";

import { fabriqueArbEnrSecteurSousSecteurs } from "../../../utilitaires/manipulationArbitraires.fabriques";
import {
  listeAutresSecteursSousSecteurs,
  listeEnrSecteursAvecLeursSousSecteurs,
  secteurEtSousSecteursSontListes,
} from "../../exemples/ListesEnrSecteursSousSecteur";

export const arbitraireSecteursSousSecteurs = fabriqueArbEnrSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs,
).filter((donnees) => donnees.secteurActivite.length > 0);
export const arbSecteursSousSecteursListes = fabriqueArbEnrSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs.filter(secteurEtSousSecteursSontListes),
  { minLength: 1 },
);
export const arbTousSecteursSousSecteurs = fabriqueArbEnrSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs,
  { minLength: 1 },
);
export const arbEnrAutresSecteursSousSecteurs =
  fabriqueArbEnrSecteurSousSecteurs(listeAutresSecteursSousSecteurs, {
    minLength: 1,
  });
export const arbSecteursEtSousSecteursListes =
  arbTousSecteursSousSecteurs.filter(
    (enr) =>
      (enr.sousSecteurActivite.length == 0 &&
        auMoinsUnSecteurListe(enr.secteurActivite)) ||
      (auMoinsUnSecteurListe(enr.secteurActivite) &&
        auMoinsUnSousSecteurListe(enr.sousSecteurActivite)),
  );
