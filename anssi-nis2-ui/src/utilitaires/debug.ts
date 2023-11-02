import { DonneesFormulaireSimulateur } from "../Domaine/Simulateur/DonneesFormulaire.ts";

export const VVV = (...debugMessage: unknown[]) =>
  console.log("VVV ", ...debugMessage);
export const VVValue = (...debugMessage: unknown[]) => {
  const messageTransforme: unknown[] = debugMessage.reduce<unknown[]>(
    (acc, message) =>
      acc.concat([
        typeof message === typeof "" ? message : JSON.stringify(message),
      ]),
    [],
  );
  console.log("VVV ", ...messageTransforme);
};

function compareDonnees(
  [champGauche, valeursGauche]: [string, string[]],
  [champDroite, valeursDroite]: [string, string[]],
): boolean {
  return (
    champGauche == champDroite && valeursGauche.every(valeursDroite.includes)
  );
}

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
