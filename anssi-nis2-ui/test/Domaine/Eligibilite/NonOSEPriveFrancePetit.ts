import { describe, expect, it } from "vitest";
import { ValeursActivitesInfrastructureNumerique } from "../../../src/Domaine/Simulateur/Activite";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../../src/Domaine/Simulateur/resultatEligibilite";
import {
  filtreActivitesAutres,
  filtreActivitesListees,
} from "../../../src/Domaine/Simulateur/Operations/FiltreActivites";

export const suiteTestsNonOSEPriveFrancePetit = (reponses) => {
  const reponsesFrancePrivePetitInfraNum = reponses.avec({
    secteurActivite: ["infrastructureNumerique"],
  });
  describe.each([reponsesFrancePrivePetitInfraNum])(
    "Fournisseur Infrastructure Numérique",
    (reponses) => {
      const activitesFourniseurInfrastructureNumeriqueListees =
        filtreActivitesListees(ValeursActivitesInfrastructureNumerique);
      const activitesFourniseurInfrastructureNumeriqueAutres =
        filtreActivitesAutres(ValeursActivitesInfrastructureNumerique);
      it.each(activitesFourniseurInfrastructureNumeriqueListees)(
        `est éligible quand activité=%s`,
        (activite) => {
          const donneesSimu = reponses.avec({
            activites: [activite],
          });
          expect(eligibilite(donneesSimu)).toStrictEqual(
            ResultatEligibiliteEnum.EligiblePetiteEntreprise,
          );
        },
      );
      it.each(activitesFourniseurInfrastructureNumeriqueAutres)(
        `n'est pas éligible quand activité est %s`,
        (activite) => {
          const donneesSimu = reponses.avec({
            activites: [activite],
          });
          expect(eligibilite(donneesSimu)).toStrictEqual(
            ResultatEligibiliteEnum.NonEligible,
          );
        },
      );
    },
  );
};
