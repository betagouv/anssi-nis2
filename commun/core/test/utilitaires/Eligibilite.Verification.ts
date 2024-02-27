import { fc } from "@fast-check/vitest";
import { expect } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domain/Simulateur/DonneesFormulaire.definitions";
import { Eligibilite } from "../../src/Domain/Simulateur/Eligibilite.constantes";
import { ResultatEligibilite } from "../../src/Domain/Simulateur/Eligibilite.definitions";
import { calculeEligibilite } from "../../src/Domain/Simulateur/services/Eligibilite/Eligibilite.operations";
import { ConvertisseurDonneesBrutesVersEtatDonneesSimulateur } from "../../src/Domain/Simulateur/services/Eligibilite/EtatDonneesSimulateur.fabrique";
import {
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationDefinitif,
} from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions";
import { evalueEtatRegulation } from "../../src/Domain/Simulateur/services/Eligibilite/EtatRegulation.operations";
import { transformeEligibiliteEnRegulationEntite } from "../../src/Domain/Simulateur/services/Regulation/Regulation.operations";
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

const verifieResultatRegulationQualifie = (
  resultatEligibilite: ResultatEligibilite,
  arb: fc.Arbitrary<DonneesFormulaireSimulateur>,
) => {
  fc.assert(
    fc.property(arb, (donnees) => {
      const resultatEvaluationRegulation =
        ConvertisseurDonneesBrutesVersEtatDonneesSimulateur.depuisDonneesFormulaireSimulateur(
          donnees,
        ) as ResultatEvaluationRegulation;
      const resultatRegulationQualifiee = evalueEtatRegulation(
        resultatEvaluationRegulation,
      );
      expect(resultatRegulationQualifiee._resultatEvaluationRegulation).toEqual(
        "Definitif",
      );
      const resultatRegulationDefinitif =
        resultatRegulationQualifiee as ResultatEvaluationRegulationDefinitif;
      const decisionAttendue = transformeEligibiliteEnRegulationEntite(
        Eligibilite[resultatEligibilite],
      )(donnees);
      expect(resultatRegulationDefinitif.decision).toEqual(
        decisionAttendue.decision,
      );
    }),
    { verbose: true },
  );
};

export const verifieEligibilite = Object.values(Eligibilite).reduce(
  (acc, nom) => ({
    ...acc,
    [nom]: (arb: fc.Arbitrary<DonneesFormulaireSimulateur>) => {
      verifieResultatRegulationQualifie(nom, arb);

      return flow(
        fluxDocumentation(nom),
        verifieQue(calculeEligibilite).renvoieToujours(Eligibilite[nom])
          .quelqueSoit,
      )(arb);
    },
  }),
  {},
) as VerifieEligibilite;
