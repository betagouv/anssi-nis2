import { describe, expect, it } from "vitest";
import {
  archetypeReponsesPetiteEntreprise,
  combinatoireEntrepriseMoyenne,
  combinatoireGrandesEntreprises,
  DonneesFormulaireSimulateur,
} from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { Activite } from "../../src/Domaine/Simulateur/Activite";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../src/Domaine/Simulateur/resultatEligibilite";
import { suiteTestsNonOSEPriveFrancePetit } from "./Eligibilite/NonOSEPriveFrancePetit";
import { suiteTestsNonOSEPriveFranceMoyenneGrande } from "./Eligibilite/NonOSEPriveFranceMoyenneGrande";
import { SecteurActivite } from "../../src/Domaine/Simulateur/SecteursActivite";
import { libellesSecteursActivite } from "../../src/References/LibellesSecteursActivite";
import { libellesActivites } from "../../src/References/LibellesActivites";

import { listeActivitesAutre } from "../../src/Domaine/Simulateur/Operations/FiltreActivites";

describe("Calcul d'éligibilité NIS 2", () => {
  const reponseNonDesigneOSE = new DonneesFormulaireSimulateur({
    designeOperateurServicesEssentiels: ["non"],
  });
  describe.each([reponseNonDesigneOSE])("Non designe OSE NIS 1", (reponses) => {
    const reponsesFrance = reponses.avec({
      etatMembre: ["france"],
    });
    describe.each([reponsesFrance])("France", (reponses) => {
      const reponsesFrancePrive = reponses.avec({
        typeStructure: ["privee"],
      });
      describe.each([reponsesFrancePrive])("Privé", (reponses) => {
        const reponsesFrancePrivePetit = reponses.avec(
          archetypeReponsesPetiteEntreprise,
        );
        describe.each([reponsesFrancePrivePetit])(
          "Petit",
          suiteTestsNonOSEPriveFrancePetit,
        );
        //
        //     const reponsesFrancePriveMoyen = combinatoireEntrepriseMoyenne.map(
        //       (combinaison) => reponses.avec(combinaison),
        //     );
        //     describe.each(reponsesFrancePriveMoyen)(
        //       "Moyen CA$trancheCA Empl$trancheNombreEmployes",
        //       suiteTestsNonOSEPriveFranceMoyenneGrande,
        //     );
        //     const reponsesFrancePriveGrand = combinatoireGrandesEntreprises.map(
        //       (combinaison) => reponses.avec(combinaison),
        //     );
        //     describe.each(reponsesFrancePriveGrand)(
        //       "Intermediaire CA$trancheCA Empl$trancheNombreEmployes",
        //       suiteTestsNonOSEPriveFranceMoyenneGrande,
        //     );
        //   });
        // });
        // const reponsesMembreUE = reponses.avec({
        //   etatMembre: ["autre"],
        // });
        // describe.each([reponsesMembreUE])(
        //   "Autre pays Union Européenne",
        //   (reponses) => {
        //     const secteur: SecteurActivite = "infrastructureNumerique";
        //     const activite: Activite = "fournisseurPointEchangeInternet";
        //     const donneesSimu = reponses
        //       .avec({
        //         secteurActivite: [secteur],
        //         activites: [activite],
        //       })
        //       .avec({
        //         typeStructure: ["privee"],
        //       });
        //     it(
        //       `Petite entreprise privée est eligible ` +
        //         `pour le secteur '${libellesSecteursActivite[secteur]}' ` +
        //         `et l'activité '${libellesActivites[activite]}'`,
        //       () => {
        //         expect(
        //           eligibilite(donneesSimu.avec(archetypeReponsesPetiteEntreprise)),
        //         ).toStrictEqual(ResultatEligibiliteEnum.EligiblePetiteEntreprise);
        //       },
        //     );
        //     it(
        //       `Grande entreprise privée est eligible ` +
        //         `pour le secteur '${libellesSecteursActivite[secteur]}' ` +
        //         `et l'activité '${libellesActivites[activite]}'`,
        //       () => {
        //         expect(
        //           eligibilite(
        //             donneesSimu.avec({
        //               trancheCA: ["grand"],
        //               trancheNombreEmployes: ["grand"],
        //             }),
        //           ),
        //         ).toStrictEqual(
        //           ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise,
        //         );
      });
    });
  });
});
