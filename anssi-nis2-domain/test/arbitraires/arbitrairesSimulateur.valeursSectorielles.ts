import {
  ajouteMethodeAvec,
  fabriqueArbEnrSecteurSousSecteurs,
} from "../../../anssi-nis2-ui/test/utilitaires/manipulationArbitraires";
import {
  listeAutresSecteursSousSecteurs,
  listeEnrSecteursAvecLeursSousSecteurs,
  secteurEtSousSecteursSontListes,
} from "../../../anssi-nis2-ui/test/Services/Simulateur/exemples/ListesEnrSecteursSousSecteur";
import { IDonneesFormulaireSimulateur } from "../../src/Simulateur/DonneesFormulaire";
import { auMoinsUnSecteurListe } from "../../src/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { auMoinsUnSousSecteurListe } from "../../src/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";

export const arbitraireSecteursSousSecteurs = fabriqueArbEnrSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs
)
  .filter((donnees) => donnees.secteurActivite.length > 0)
  .chain<IDonneesFormulaireSimulateur>(ajouteMethodeAvec);
export const arbSecteursSousSecteursListes = fabriqueArbEnrSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs.filter(secteurEtSousSecteursSontListes),
  { minLength: 1 }
);
export const arbTousSecteursSousSecteurs = fabriqueArbEnrSecteurSousSecteurs(
  listeEnrSecteursAvecLeursSousSecteurs,
  { minLength: 1 }
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
        auMoinsUnSousSecteurListe(enr.sousSecteurActivite))
  );
