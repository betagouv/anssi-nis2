import { fc } from "@fast-check/vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { Eligibilite } from "../../src/Domain/Simulateur/Eligibilite.constantes";
import { ResultatEligibilite } from "../../src/Domain/Simulateur/Eligibilite.definitions";
import { calculeEligibilite } from "../../src/Domain/Simulateur/services/Eligibilite/Eligibilite.operations";
import {
  journalise,
  journalisePipe,
} from "../../src/Domain/utilitaires/journal";
import { verifieQue } from "./assure";
import { flow } from "fp-ts/lib/function";
import { ArbitraireDonneesFormulaireSimulateurNomme } from "./manipulationArbitraires.declarations";

const prefix = "___DOCUMENT___";
const fonctionJournal = () => {};
// const fonctionJournal = console.log;
const documenteP = journalisePipe(fonctionJournal)(prefix, {
  logArgs: false,
});

const documente = journalise(fonctionJournal)(prefix);

type VerifieEligibilite = Record<
  ResultatEligibilite,
  (arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>) => void
>;

const estArbitraireDonneesFormulaireSimulateurNomme = (
  arbitraire: fc.Arbitrary<DonneesFormulaireSimulateur>,
): arbitraire is ArbitraireDonneesFormulaireSimulateurNomme =>
  "nom" in arbitraire;

const getNom = <T extends fc.Arbitrary<DonneesFormulaireSimulateur>>(
  arbitraire: T,
) =>
  estArbitraireDonneesFormulaireSimulateurNomme(arbitraire)
    ? arbitraire.nom
    : "";
const nomArbitraire = <T extends fc.Arbitrary<DonneesFormulaireSimulateur>>(
  arbitraire: T,
): T => documenteP<T>(`# ${getNom(arbitraire)}`)(arbitraire);

const sample = <T extends fc.Arbitrary<DonneesFormulaireSimulateur>>(
  arbitraire: T,
): T => {
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
    documenteP("\n"),
    documenteP("## Exemples de données"),
    sample,
    documenteP("\n"),
  );
export const verifieEligibilite = Object.values(Eligibilite).reduce(
  (acc, nom) => ({
    ...acc,
    [nom]: flow(
      fluxDocumentation(nom),
      verifieQue(calculeEligibilite).renvoieToujours(Eligibilite[nom])
        .quelqueSoit,
    ),
  }),
  {},
) as VerifieEligibilite;
