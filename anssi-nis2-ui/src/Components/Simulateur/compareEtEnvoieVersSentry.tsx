import * as Sentry from "@sentry/react";
import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { EtatRegulationDefinitif } from "../../../../commun/core/src/Domain/Simulateur/services/Eligibilite/EtatRegulation.definitions.ts";
import { evalueEligibilite } from "../../questionnaire/specifications/evalueEligibilite.ts";
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

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const typeEntiteV1 = regulationV1?.typeEntite;

    const estNonRegulee =
      regulationV1.decision === "NonRegule" &&
      resultatV2.resultat.regulation === "NonRegule";

    const estIdentique =
      resultatV2.resultat.regulation === regulationV1.decision &&
      resultatV2.resultat.typeEntite === typeEntiteV1;

    const niveauLog = estIdentique || estNonRegulee ? "info" : "error";

    const titre = estIdentique
      ? "MATCH COMPARAISON V1 & V2"
      : "DIFFÉRENCE COMPARAISON V1 & V2";

    Sentry.captureMessage(titre, {
      level: niveauLog,
      extra: { reponses, resultatV2, regulationV1 },
    });
  } catch (e) {
    Sentry.captureException(e, { extra: { reponses, regulationV1 } });
  }
}
