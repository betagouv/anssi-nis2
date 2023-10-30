import { SecteurActivite } from "./SecteursActivite";
import { SecteursSansSousSecteur, SousSecteurActivite } from "./SousSecteurs";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { AssociationSectorielleActivite } from "./ActivitesParSecteurEtSousSecteur.ts";

import { cartographieSousSecteursParSecteur } from "./CartographieSousSecteursParSecteur.ts";
import { estUnSecteurAvecDesSousSecteurs } from "./operations/operationsSecteurs.ts";

const collecteTitresSecteursSimples = (
  libelleSecteursActivite: string,
  secteur: SecteursSansSousSecteur,
): AssociationSectorielleActivite[] => [
  {
    titreActivite: libelleSecteursActivite,
    secteurOuSousSecteur: secteur,
  },
];

const collecteTitreSousSecteurs: (
  libelleSecteursActivite: string,
  listeSousSecteurs: SousSecteurActivite[],
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
) => AssociationSectorielleActivite[] = (
  libelleSecteursActivite: string,
  listeSousSecteurs: SousSecteurActivite[],
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
) =>
  listeSousSecteurs.map((sousSecteur: SousSecteurActivite) => ({
    secteurOuSousSecteur: sousSecteur,
    titreActivite: `${libelleSecteursActivite} / ${libellesSousSecteursActivite[sousSecteur]}`,
  }));
const rempliSousSecteurs = (
  listeSousSecteurs: SousSecteurActivite[],
  secteur: SecteurActivite,
  libelleSecteursActivite: string,
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
): AssociationSectorielleActivite[] => {
  if (
    estUnSecteurAvecDesSousSecteurs(secteur) &&
    listeSousSecteurs.length === 0
  )
    throw Error(
      `Houla! un secteur avec sous secteurs n'en n'a pas ! ${secteur}`,
    );
  return listeSousSecteurs.length === 0
    ? collecteTitresSecteursSimples(
        libelleSecteursActivite,
        secteur as SecteursSansSousSecteur,
      )
    : collecteTitreSousSecteurs(
        libelleSecteursActivite,
        listeSousSecteurs,
        libellesSousSecteursActivite,
      );
};

export const collecteTitresPourActivite: (
  libellesSecteursActivite: Record<SecteurActivite, string>,
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
  donneesFormulaire: DonneesFormulaireSimulateur,
) => AssociationSectorielleActivite[] = (
  libellesSecteursActivite,
  libellesSousSecteursActivite,
  donneesFormulaire,
) =>
  cartographieSousSecteursParSecteur(donneesFormulaire).reduce<
    AssociationSectorielleActivite[]
  >((acc: AssociationSectorielleActivite[], [secteur, listeSousSecteurs]) => {
    return acc.concat(
      rempliSousSecteurs(
        listeSousSecteurs,
        secteur,
        libellesSecteursActivite[secteur],
        libellesSousSecteursActivite,
      ),
    );
  }, []);
