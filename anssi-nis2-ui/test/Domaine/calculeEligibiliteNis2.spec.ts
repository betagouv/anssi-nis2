import { describe, expect, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domaine/Simulateur/DonneesFormulaire";
import {
  Activite,
  listeActivitesAutre,
} from "../../src/Domaine/Simulateur/Activite";
import {
  eligibilite,
  ResultatEligibiliteEnum,
} from "../../src/Domaine/Simulateur/resultatEligibilite";
import { suiteTestsNonOSEPriveFrancePetit } from "./Eligibilite/NonOSEPriveFrancePetit";
import { suiteTestsNonOSEPriveFranceMoyenneGrande } from "./Eligibilite/NonOSEPriveFranceMoyenneGrande";
import { SecteurActivite } from "../../src/Domaine/Simulateur/SecteursActivite";
import { libellesSecteursActivite } from "../../src/References/LibellesSecteursActivite";
import { libellesActivites } from "../../src/References/LibellesActivites";

type DonneesSimulateurTailleEntreprise = Pick<
  DonneesFormulaireSimulateur,
  "trancheCA" | "trancheNombreEmployes"
>;

const archetypeReponsesPetiteEntreprise: DonneesSimulateurTailleEntreprise = {
  trancheCA: ["petit"],
  trancheNombreEmployes: ["petit"],
};
const archetypeReponsesMoyenneEntreprise: DonneesSimulateurTailleEntreprise = {
  trancheCA: ["moyen"],
  trancheNombreEmployes: ["moyen"],
};
const archetypeReponsesGrandeEntreprise: DonneesSimulateurTailleEntreprise = {
  trancheCA: ["grand"],
  trancheNombreEmployes: ["grand"],
};

const combinatoireEntrepriseMoyenne: DonneesSimulateurTailleEntreprise[] = [
  archetypeReponsesMoyenneEntreprise,
  {
    ...archetypeReponsesMoyenneEntreprise,
    trancheCA: ["petit"],
  },
  {
    ...archetypeReponsesMoyenneEntreprise,
    trancheNombreEmployes: ["petit"],
  },
];
const combinatoireGrandesEntreprises: DonneesSimulateurTailleEntreprise[] = [
  archetypeReponsesGrandeEntreprise,
  {
    ...archetypeReponsesGrandeEntreprise,
    trancheCA: ["moyen"],
  },
  {
    ...archetypeReponsesGrandeEntreprise,
    trancheCA: ["petit"],
  },
  {
    ...archetypeReponsesGrandeEntreprise,
    trancheNombreEmployes: ["moyen"],
  },
  {
    ...archetypeReponsesGrandeEntreprise,
    trancheNombreEmployes: ["petit"],
  },
];
describe("Calcul d'éligibilité NIS 2", () => {
  const reponseDesigneOSE = new DonneesFormulaireSimulateur({
    designeOperateurServicesEssentiels: ["oui"],
  });
  const reponseNonDesigneOSE = new DonneesFormulaireSimulateur({
    designeOperateurServicesEssentiels: ["non"],
  });
  describe.each([reponseDesigneOSE])("Designe OSE NIS 1", (reponses) => {
    it.each([archetypeReponsesPetiteEntreprise])(
      "est toujours Eligible (taille=$trancheCA)",
      () => {
        expect(
          eligibilite(reponses.avec(archetypeReponsesPetiteEntreprise)),
        ).toStrictEqual(ResultatEligibiliteEnum.EligiblePetiteEntreprise);
      },
    );
    it.each([
      archetypeReponsesMoyenneEntreprise,
      archetypeReponsesGrandeEntreprise,
    ])("est toujours Eligible (taille=$trancheCA)", (taille) => {
      expect(eligibilite(reponses.avec(taille))).toStrictEqual(
        ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise,
      );
    });
  });
  describe.each([reponseNonDesigneOSE])("Non designe OSE NIS 1", (reponses) => {
    describe.each([reponseNonDesigneOSE])("Autres activités", (reponses) => {
      it.each(listeActivitesAutre)(
        "doit calculer non-eligible si la seul activité cochée est '%s'",
        (activite) => {
          const donneesSimu = reponses.avec({
            activites: [activite],
          });
          expect(eligibilite(donneesSimu)).toStrictEqual(
            ResultatEligibiliteEnum.NonEligible,
          );
        },
      );
    });
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

        const reponsesFrancePriveMoyen = combinatoireEntrepriseMoyenne.map(
          (combinaison) => reponses.avec(combinaison),
        );
        describe.each(reponsesFrancePriveMoyen)(
          "Moyen CA$trancheCA Empl$trancheNombreEmployes",
          suiteTestsNonOSEPriveFranceMoyenneGrande,
        );
        const reponsesFrancePriveGrand = combinatoireGrandesEntreprises.map(
          (combinaison) => reponses.avec(combinaison),
        );
        describe.each(reponsesFrancePriveGrand)(
          "Intermediaire CA$trancheCA Empl$trancheNombreEmployes",
          suiteTestsNonOSEPriveFranceMoyenneGrande,
        );
      });
    });
    const reponsesMembreUE = reponses.avec({
      etatMembre: ["autre"],
    });
    describe.each([reponsesMembreUE])(
      "Autre pays Union Européenne",
      (reponses) => {
        const secteur: SecteurActivite = "infrastructureNumerique";
        const activite: Activite = "fournisseurPointEchangeInternet";
        const donneesSimu = reponses
          .avec({
            secteurActivite: [secteur],
            activites: [activite],
          })
          .avec({
            typeStructure: ["privee"],
          });
        it(
          `Petite entreprise privée est eligible ` +
            `pour le secteur '${libellesSecteursActivite[secteur]}' ` +
            `et l'activité '${libellesActivites[activite]}'`,
          () => {
            expect(
              eligibilite(donneesSimu.avec(archetypeReponsesPetiteEntreprise)),
            ).toStrictEqual(ResultatEligibiliteEnum.EligiblePetiteEntreprise);
          },
        );
        it(
          `Grande entreprise privée est eligible ` +
            `pour le secteur '${libellesSecteursActivite[secteur]}' ` +
            `et l'activité '${libellesActivites[activite]}'`,
          () => {
            expect(
              eligibilite(
                donneesSimu.avec({
                  trancheCA: ["grand"],
                  trancheNombreEmployes: ["grand"],
                }),
              ),
            ).toStrictEqual(
              ResultatEligibiliteEnum.EligibleMoyenneGrandeEntreprise,
            );
          },
        );
      },
    );
  });
});
