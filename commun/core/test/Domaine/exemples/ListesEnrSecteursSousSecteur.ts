import {
  fabriqueListePartielleSecteursAvecSousSecteurs,
  fabriqueTupleSecteurSousSecteurs,
} from "../../../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.operations";
import {
  estSecteurListe,
  estSecteurParmi,
} from "../../../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../../../commun/core/src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { ValeursSecteursSansSousSecteur } from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import {
  SecteurActivite,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import { ValeursSecteursAvecSousSecteurs } from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import {
  EnrSecteurSousSecteur,
  SousSecteurActivite,
} from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";

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
