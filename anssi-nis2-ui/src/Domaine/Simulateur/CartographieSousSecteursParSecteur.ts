import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { SecteurActivite } from "./SecteursActivite";
import { SousSecteurActivite } from "./SousSecteurs";
import {
  contientSousSecteur,
  estUnSecteurAvecDesSousSecteurs,
  estUnSecteurSansDesSousSecteurs,
} from "./Operations/operationsSecteurs.ts";

type SecteurEtSesSousSecteurs = Partial<
  Record<SecteurActivite, SousSecteurActivite[]>
>;
export const cartographieSousSecteursParSecteur = (
  donneesFormulaire: DonneesFormulaireSimulateur,
): SecteurEtSesSousSecteurs => {
  const { secteurActivite, sousSecteurActivite } = donneesFormulaire;

  const secteursStructures = secteurActivite
    .filter(estUnSecteurSansDesSousSecteurs)
    .reduce<SecteurEtSesSousSecteurs>(
      (acc, secteur) => ({ ...acc, [secteur]: [] }),
      {},
    );

  const sousSecteursStructures = secteurActivite
    .filter(estUnSecteurAvecDesSousSecteurs)
    .reduce<SecteurEtSesSousSecteurs>((acc, secteur) => {
      return {
        ...acc,
        [secteur]: sousSecteurActivite.filter((sousSecteur) =>
          contientSousSecteur(secteur, sousSecteur),
        ),
      };
    }, {});

  return { ...secteursStructures, ...sousSecteursStructures };
};
