import * as Sentry from "@sentry/react";
import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { EtatRegulationDefinitif } from "../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import { evalueEligibilite } from "../../questionnaire/specifications/EvalueEligibilite.ts";
import SpecificationsCompletes from "../../questionnaire/specifications/specifications-completes.csv?raw";

export function compareEtEnvoieVersSentry(
  reponses: DonneesFormulaireSimulateur,
  regulationV1: EtatRegulationDefinitif,
): void {
  try {
    const resultatV2 = evalueEligibilite(
      { ...reponses, etapeCourante: "resultat" },
      SpecificationsCompletes,
    );

    const estIdentique =
      resultatV2.regulation === regulationV1.decision &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      resultatV2.typeEntite === regulationV1?.typeEntite;

    const niveauLog = estIdentique ? "info" : "error";

    Sentry.captureMessage("COMPARAISON V1 & V2", {
      level: niveauLog,
      extra: { reponses, resultatV2, regulationV1 },
    });
  } catch (e) {
    Sentry.captureException(e, { extra: { reponses, regulationV1 } });
  }
}
