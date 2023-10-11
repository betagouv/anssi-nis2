import { describe, expect, it } from "vitest";
import { ValeursSecteursSansSousSecteur } from "../../../src/Domaine/Simulateur/ValeursSecteursActivites";
import {
  listeActivitesAutre,
  listeActivitesSaufAutre,
} from "../../../src/Domaine/Simulateur/Activite";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../../src/Domaine/Simulateur/resultatEligibilite";

export const suiteTestsNonOSEPriveFranceMoyenneGrande = (reponses) => {
  const reponsesFrancePrivePetitInfraNum = ValeursSecteursSansSousSecteur.map(
    (secteur) =>
      reponses.avec({
        secteurActivite: [secteur],
      }),
  );
  describe.each(reponsesFrancePrivePetitInfraNum)(
    "Le secteur d'activité $secteurActivite",
    (reponses) => {
      describe(`est éligible`, () => {
        it.each(listeActivitesSaufAutre)(`quand activité=%s`, (activite) => {
          const donneesSimu = reponses.avec({
            activites: [activite],
          });
          expect(eligibilite(donneesSimu)).toStrictEqual(
            ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise,
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
