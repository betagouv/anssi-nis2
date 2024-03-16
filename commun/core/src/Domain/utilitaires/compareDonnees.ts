import { DonneesFormulaireSimulateur } from "../Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";

const compareDonnees = (
  [champGauche, valeursGauche]: [string, string[]],
  [champDroite, valeursDroite]: [string, string[]],
): boolean =>
  champGauche == champDroite && valeursGauche.every(valeursDroite.includes);
export const seulementAGauche = (
  gauche: DonneesFormulaireSimulateur,
  droite: DonneesFormulaireSimulateur,
) =>
  Object.entries(gauche).filter(
    (leftValue) =>
      !Object.entries(droite).some((rightValue) =>
        compareDonnees(leftValue, rightValue),
      ),
  );
