import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { Sectorisation } from "../../Sectorisation.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { estUnSecteurSansSousSecteur } from "../SecteurActivite/SecteurActivite.predicats";
import { estDansSecteur } from "../SousSecteurActivite/SousSecteurActivite.predicats";

export const extraitSectorisationPourSecteur =
  (sousSecteurs: SousSecteurActivite[]) =>
  (secteur: SecteurActivite): Sectorisation[] => {
    if (estUnSecteurSansSousSecteur(secteur) || sousSecteurs.length == 0)
      return [{ type: "sansSousSecteur", secteur: secteur }];
    return sousSecteurs.filter(estDansSecteur(secteur)).reduce(
      (acc, sousSecteur) => [
        ...acc,
        {
          type: "avecSousSecteur",
          secteur: secteur,
          sousSecteur: sousSecteur,
        },
      ],
      [] as Sectorisation[]
    );
  };

export const extraitSectorisationDonneesSimulateur = ({
  secteurActivite,
  sousSecteurActivite,
}: DonneesFormulaireSimulateur): Sectorisation[] =>
  secteurActivite.flatMap(extraitSectorisationPourSecteur(sousSecteurActivite));
