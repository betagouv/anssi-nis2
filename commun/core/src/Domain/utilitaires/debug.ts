import { DonneesFormulaireSimulateur } from "../Simulateur/DonneesFormulaire.definitions";

export const logAvecPrefix =
  (prefix: string) =>
  (...debugMessage: unknown[]) =>
    console.log(prefix, ...debugMessage);

export const VVV = logAvecPrefix("VVV ");

export const VVValue = (...debugMessage: unknown[]) => {
  const messageTransforme: unknown[] = debugMessage.reduce<unknown[]>(
    (acc, message) =>
      acc.concat([
        typeof message === typeof ""
          ? message
          : JSON.stringify(message, null, "\t"),
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

type OptionsJournal = { logArgs: boolean };
export const logPipeAvecPrefix =
  (prefix: string, options: OptionsJournal = { logArgs: true }) =>
  <T>(...debugMessage: unknown[]) =>
  (arg: T): T => {
    const detailsArgs = options.logArgs ? [`\t--> `, arg] : [];
    logAvecPrefix(prefix)(...debugMessage, ...detailsArgs);

    return arg;
  };

export const VVVPipe = logPipeAvecPrefix("VVV ");
