import { SimulateurContenuEtapeProps } from "../Props/simulateurEtapeProps";
import { SecteursAvecSousSecteurs } from "../../../../../anssi-nis2-domain/src/Simulateur/SousSecteurActivite.definitions.ts";
import { OptionsChampSimulateur } from "../Props/optionChampSimulateur";
import { reducteurSecteursVersOptions } from "../Reducteurs.ts";
import { DonneesFormulaireSimulateur } from "../../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../../../anssi-nis2-domain/src/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";

export const transformeSousSecteurEnOptions = (
  donneesFormulaire: SimulateurContenuEtapeProps["donneesFormulaire"],
  gereChangement: (event: React.ChangeEvent<HTMLInputElement>) => void,
): [SecteursAvecSousSecteurs, OptionsChampSimulateur][] => {
  return donneesFormulaire.secteurActivite
    .filter(estUnSecteurAvecDesSousSecteurs)
    .map((secteur) => secteur as SecteursAvecSousSecteurs)
    .reduce(
      reducteurSecteursVersOptions(
        gereChangement,
        donneesFormulaire as DonneesFormulaireSimulateur,
      ),
      [],
    );
};
