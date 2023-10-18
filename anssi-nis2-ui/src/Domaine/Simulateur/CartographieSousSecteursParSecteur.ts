import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { SecteurActivite } from "./SecteursActivite";
import { SecteursAvecSousSecteurs, SousSecteurActivite } from "./SousSecteurs";
import { sousSecteursParSecteur } from "./ValeursSousSecteursActivites.ts";

export const cartographieSousSecteursParSecteur = (
  donneesFormulaire: DonneesFormulaireSimulateur,
): Partial<Record<SecteurActivite, SousSecteurActivite[]>> => {
  const { secteurActivite, sousSecteurActivite } = donneesFormulaire;

  const secteursStructures = secteurActivite
    .filter((secteur) => !Object.keys(sousSecteursParSecteur).includes(secteur))
    .reduce((acc, currentValue) => ({ ...acc, [currentValue]: [] }), {});

  const sousSecteursStructures: Partial<
    Record<SecteurActivite, SousSecteurActivite[]>
  > = secteurActivite
    .filter((secteur) => Object.keys(sousSecteursParSecteur).includes(secteur))
    .reduce((acc, currentValue) => {
      return {
        ...acc,
        [currentValue]: sousSecteurActivite.filter((sousSecteur) =>
          sousSecteursParSecteur[
            currentValue as SecteursAvecSousSecteurs
          ].includes(sousSecteur as SousSecteurActivite),
        ),
      };
    }, {});

  return { ...secteursStructures, ...sousSecteursStructures };
};
