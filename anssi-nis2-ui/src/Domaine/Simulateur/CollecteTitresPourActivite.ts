import { SecteurActivite } from "./SecteursActivite";
import { SousSecteurActivite } from "./SousSecteurs";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { AssociationSectorielleActivite } from "./ActivitesParSecteurEtSousSecteur.ts";

import { cartographieSousSecteursParSecteur } from "./CartographieSousSecteursParSecteur.ts";

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

  return Object.entries(cartographieSecteurs).reduce(
    (acc: AssociationSectorielleActivite[], [secteur, listeSousSecteurs]) => {
      const libelleSecteursActivite: string =
        libellesSecteursActivite[secteur as SecteurActivite];
      return [
        ...acc,
        ...(listeSousSecteurs.length === 0
          ? [
              {
                secteurOuSousSecteur: secteur,
                titreActivite: libelleSecteursActivite,
              },
            ]
          : collecteTitreSousSecteurs(
              libelleSecteursActivite,
              listeSousSecteurs,
            )),
      ];
    },
    [],
  );
};
