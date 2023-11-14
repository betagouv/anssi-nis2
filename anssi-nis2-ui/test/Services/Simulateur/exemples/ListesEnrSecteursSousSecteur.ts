import {
  EnrSecteurSousSecteur,
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../../../src/Domaine/Simulateur/SousSecteurActivite.definitions";
import { ValeursSecteursAvecSousSecteurs } from "../../../../src/Domaine/Simulateur/SousSecteurActivite.valeurs";
import { SecteurActivite } from "../../../../src/Domaine/Simulateur/SecteurActivite.definitions";
import { ValeursSecteursSansSousSecteur } from "../../../../src/Domaine/Simulateur/SecteurActivite.valeurs";
import {
  fabriqueListePartielleSecteursAvecSousSecteurs,
  fabriqueTupleSecteurSousSecteurs,
} from "../../../../src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.operations";
import { estSecteurListe } from "../../../../src/Domaine/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../../src/Domaine/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";

export const listeEnrSecteursSansSousSecteur: EnrSecteurSousSecteur[] =
  ValeursSecteursSansSousSecteur.map((secteur) => ({
    secteur: secteur,
  }));
export const listeEnrSecteursEtSousSecteurs: EnrSecteurSousSecteur[] =
  ValeursSecteursAvecSousSecteurs.map(fabriqueTupleSecteurSousSecteurs).reduce(
    (
      listeTuples: {
        secteur: SecteurActivite;
        sousSecteur: SousSecteurActivite;
      }[],
      [secteur, listeSousSecteurs],
    ) => [
      ...listeTuples,
      ...fabriqueListePartielleSecteursAvecSousSecteurs(
        listeSousSecteurs,
        secteur as SecteursAvecSousSecteurs,
      ),
    ],
    [],
  );

export const listeEnrSecteursAvecLeursSousSecteurs: EnrSecteurSousSecteur[] = [
  ...listeEnrSecteursSansSousSecteur,
  ...listeEnrSecteursEtSousSecteurs,
];
export const filtreSecteurListeSecteursSousSecteurs = (secteurFiltre: string) =>
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enrSecteurSousSecteur) => enrSecteurSousSecteur.secteur == secteurFiltre,
  );

export const secteurEtSousSecteursSontListes = (enr: EnrSecteurSousSecteur) =>
  estSecteurListe(enr.secteur) && estSousSecteurListe(enr.sousSecteur);

export const listeAutresSecteursSousSecteurs =
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enr) =>
      enr.secteur.startsWith("autre") || enr.sousSecteur?.startsWith("autre"),
  );
