import { estChaineNonVide } from "../../../../../../utils/services/string.operations";
import { DonneesFormulaireSimulateur, NomsChampsSimulateur } from "../DonneesFormulaire/DonneesFormulaire.definitions";


export const auMoinsN = (
  n: number,
  nomChamp: NomsChampsSimulateur,
  fonctionNommee = `auMoinsN_${n}_${nomChamp}`
) =>
  ({
    [fonctionNommee]: (donnees: DonneesFormulaireSimulateur) =>
      donnees[nomChamp].filter(estChaineNonVide).length > n - 1,
  }[fonctionNommee]);

export const auMoinsUn = (nomChamp: NomsChampsSimulateur) =>
  auMoinsN(1, nomChamp);
