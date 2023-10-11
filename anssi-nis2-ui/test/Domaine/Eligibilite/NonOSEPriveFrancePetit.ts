import { describe, expect, it } from "vitest";
import {
  listeActivitesAutre,
  listeActivitesSaufAutre,
} from "../../../src/Domaine/Simulateur/Activite";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../../src/Domaine/Simulateur/resultatEligibilite";

export const suiteTestsNonOSEPriveFrancePetit = (reponses) => {
  const reponsesFrancePrivePetitInfraNum = reponses.avec({
    secteurActivite: ["infrastructureNumerique"],
  });
  describe.each([reponsesFrancePrivePetitInfraNum])(
    "Fournisseur Infrastructure Numérique",
    (reponses) => {
      describe(`est éligible`, () => {
        it.each(listeActivitesSaufAutre)(`quand activité=%s)`, (activite) => {
          const donneesSimu = reponses.avec({
            activites: [activite],
          });
          expect(eligibilite(donneesSimu)).toStrictEqual(
            ResultatEligibiliteEnum.EligiblePetitEntreprise,
          );
        });
      });
      describe(`n'est pas éligible`, () => {
        it.each(listeActivitesAutre)(`quand activité est %s`, (activite) => {
          const donneesSimu = reponses.avec({
            activites: [activite],
          });
          expect(eligibilite(donneesSimu)).toStrictEqual(
            ResultatEligibiliteEnum.NonEligible,
          );
        });
      });
    },
  );
};
