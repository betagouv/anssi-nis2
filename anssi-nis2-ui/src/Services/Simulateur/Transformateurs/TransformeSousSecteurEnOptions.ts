import { DonneesFormulaireSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { SecteurComposite } from "../../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { SimulateurContenuEtapeProps } from "../Props/simulateurEtapeProps";
import { OptionsChampSimulateur } from "../Props/optionChampSimulateur";
import { reducteurSecteursVersOptions } from "../Reducteurs.ts";
import { estUnSecteurAvecDesSousSecteurs } from "../../../../../commun/core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";

export const transformeSousSecteurEnOptions = (
  donneesFormulaire: SimulateurContenuEtapeProps["donneesFormulaire"],
  gereChangement: (event: React.ChangeEvent<HTMLInputElement>) => void,
): [SecteurComposite, OptionsChampSimulateur][] => {
  return donneesFormulaire.secteurActivite
    .filter(estUnSecteurAvecDesSousSecteurs)
    .reduce(
      reducteurSecteursVersOptions(
        gereChangement,
        donneesFormulaire as DonneesFormulaireSimulateur,
      ),
      [],
    );
};
