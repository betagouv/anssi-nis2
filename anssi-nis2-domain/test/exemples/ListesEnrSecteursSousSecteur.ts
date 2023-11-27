import {
  EnrSecteurSousSecteur,
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../src/Simulateur/SousSecteurActivite.definitions";
import { ValeursSecteursSansSousSecteur } from "../../src/Simulateur/SecteurActivite.valeurs";
import { ValeursSecteursAvecSousSecteurs } from "../../src/Simulateur/SousSecteurActivite.valeurs";
import {
  fabriqueListePartielleSecteursAvecSousSecteurs,
  fabriqueTupleSecteurSousSecteurs,
} from "../../src/Simulateur/services/SecteurActivite/SecteurActivite.operations";
import { SecteurActivite } from "../../src";
import {
  estSecteurListe,
  estSecteurParmi,
} from "../../src/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../src/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";

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
export const filtreSecteurListeSecteursSousSecteurs = (
  secteurFiltre: SecteurActivite,
) =>
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enrSecteurSousSecteur) => enrSecteurSousSecteur.secteur == secteurFiltre,
  );

export const filtreEnrSectorielHorsSecteurs = (
  secteursFiltre: SecteurActivite[],
) =>
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enrSecteurSousSecteur) =>
      !estSecteurParmi(enrSecteurSousSecteur.secteur)(secteursFiltre),
  );

export const secteurEtSousSecteursSontListes = (enr: EnrSecteurSousSecteur) =>
  estSecteurListe(enr.secteur) && estSousSecteurListe(enr.sousSecteur);

export const listeAutresSecteursSousSecteurs =
  listeEnrSecteursAvecLeursSousSecteurs.filter(
    (enr) =>
      enr.secteur.startsWith("autre") || enr.sousSecteur?.startsWith("autre"),
  );
