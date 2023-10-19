import { SecteurActivite } from "./SecteursActivite";
import { SecteursSansSousSecteur, SousSecteurActivite } from "./SousSecteurs";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { AssociationSectorielleActivite } from "./ActivitesParSecteurEtSousSecteur.ts";

import { cartographieSousSecteursParSecteur } from "./CartographieSousSecteursParSecteur.ts";
import { estUnSecteurAvecDesSousSecteurs } from "./Operations/operationsSecteurs.ts";

function collecteTitresSecteursSimples(
  libelleSecteursActivite: string,
  secteur: SecteursSansSousSecteur,
): AssociationSectorielleActivite[] {
  return [
    {
      titreActivite: libelleSecteursActivite,
      secteurOuSousSecteur: secteur,
    },
  ];
}

export const collecteTitresPourActivite = (
  libellesSecteursActivite: Record<SecteurActivite, string>,
  libellesSousSecteursActivite: Record<SousSecteurActivite, string>,
  donneesFormulaire: DonneesFormulaireSimulateur,
): AssociationSectorielleActivite[] => {
  const cartographieSecteurs =
    cartographieSousSecteursParSecteur(donneesFormulaire);

  const collecteTitreSousSecteurs: (
    libelleSecteursActivite: string,
    listeSousSecteurs: SousSecteurActivite[],
  ) => AssociationSectorielleActivite[] = (
    libelleSecteursActivite: string,
    listeSousSecteurs: SousSecteurActivite[],
  ) =>
    listeSousSecteurs.map((sousSecteur: SousSecteurActivite) => ({
      secteurOuSousSecteur: sousSecteur,
      titreActivite: `${libelleSecteursActivite} / ${libellesSousSecteursActivite[sousSecteur]}`,
    }));

  function remplieSousSecteurs(
    listeSousSecteurs: SousSecteurActivite[],
    secteur: SecteurActivite,
    libelleSecteursActivite: string,
  ): AssociationSectorielleActivite[] {
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
      : collecteTitreSousSecteurs(libelleSecteursActivite, listeSousSecteurs);
  }

  console.log(cartographieSecteurs);
  return Object.entries(cartographieSecteurs).reduce<
    AssociationSectorielleActivite[]
  >((acc: AssociationSectorielleActivite[], [secteur, listeSousSecteurs]) => {
    const libelleSecteursActivite: string =
      libellesSecteursActivite[secteur as SecteurActivite];
    return [
      ...acc,
      ...remplieSousSecteurs(
        listeSousSecteurs,
        secteur as SecteursSansSousSecteur,
        libelleSecteursActivite,
      ),
    ];
  }, []);
};
