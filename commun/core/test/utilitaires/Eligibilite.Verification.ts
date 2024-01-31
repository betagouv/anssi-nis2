import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { Eligibilite } from "../../src/Domain/Simulateur/Eligibilite.constantes";
import { ResultatEligibilite } from "../../src/Domain/Simulateur/Eligibilite.definitions";
import { calculeEligibilite } from "../../src/Domain/Simulateur/services/Eligibilite/Eligibilite.operations";
import {
  logAvecPrefix,
  logPipeAvecPrefix,
} from "../../src/Domain/utilitaires/journal";
import { verifieQue } from "./assure";
import { flow } from "fp-ts/lib/function";
import {
  ArbitraireDonneesFormulaireSimulateur,
  ArbitraireDonneesFormulaireSimulateurNomme,
} from "./manipulationArbitraires.declarations";

const prefix = "___DOCUMENT___";
const documenteP = logPipeAvecPrefix(prefix, {
  logArgs: false,
});

const documente = logAvecPrefix(prefix);

const nomArbitraire = (
  arbitraire: ArbitraireDonneesFormulaireSimulateurNomme,
): ArbitraireDonneesFormulaireSimulateurNomme =>
  documenteP<ArbitraireDonneesFormulaireSimulateurNomme>(`# ${arbitraire.nom}`)(
    arbitraire,
  );
const sample = (
  arbitraire: ArbitraireDonneesFormulaireSimulateur,
): ArbitraireDonneesFormulaireSimulateur => {
  fc.sample(arbitraire, 5).map(documente);
  return arbitraire;
};

/**
 * Permet de générer la documentation des tests
 * @param nom
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fluxDocumentation = (nom: ResultatEligibilite) =>
  flow(
    nomArbitraire,
    documenteP(`renverra : ${nom}`),
    documenteP<ArbitraireDonneesFormulaireSimulateur>("\n"),
    documenteP<ArbitraireDonneesFormulaireSimulateur>("## Exemples de données"),
    sample,
    documenteP("\n"),
  );
export const VerifieEligibilite = Object.values(Eligibilite).reduce(
  (acc, nom) => ({
    ...acc,
    [nom]: flow(
      verifieQue(calculeEligibilite).renvoieToujours(Eligibilite[nom])
        .quelqueSoit,
    ),
  }),
  {},
) as Record<
  ResultatEligibilite,
  (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => void
>;
