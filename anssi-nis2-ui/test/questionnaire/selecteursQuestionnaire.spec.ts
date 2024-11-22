import { describe, expect, it } from "vitest";
import {
  etatParDefaut,
  reducerQuestionnaire,
} from "../../src/questionnaire/reducerQuestionnaire";
import {
  ActionQuestionnaire,
  valideSecteursActivite,
  valideSousSecteursActivite,
} from "../../src/questionnaire/actions";
import { selectSecteursPourSaisieActivites } from "../../src/questionnaire/selecteursQuestionnaire";
import { EtatQuestionnaire } from "../../../commun/core/src/Domain/Questionnaire/EtatQuestionnaire";

describe("Les sélecteurs sur l'etat du questionnaire", () => {
  describe("le sélecteur qui retourne les secteurs/sous-secteurs dont on veut connaître les activités", () => {
    it("renvoie le secteur lorsque celui-ci n'a pas de sous-secteur", () => {
      const sansSousSecteur = executer([
        valideSecteursActivite(["banqueSecteurBancaire"]),
      ]);

      const resultat = selectSecteursPourSaisieActivites(sansSousSecteur);

      expect(resultat).toEqual(["banqueSecteurBancaire"]);
    });

    it("renvoie le sous-secteur lorsque c'en est un", () => {
      const unSousSecteur = executer([
        valideSousSecteursActivite(["fabricationDispositifsMedicaux"]),
      ]);

      const resultat = selectSecteursPourSaisieActivites(unSousSecteur);

      expect(resultat).toEqual(["fabricationDispositifsMedicaux"]);
    });

    it("ignore les secteurs qui possèdent un sous-secteur (c'est-à-dire les secteurs composites)", () => {
      const avecUnComposite = executer([valideSecteursActivite(["energie"])]);

      const resultat = selectSecteursPourSaisieActivites(avecUnComposite);

      expect(resultat).toEqual([]);
    });

    it("gère le panachage de secteur / sous-secteurs", () => {
      const panachage = executer([
        valideSecteursActivite(["eauxUsees", "energie"]),
        valideSousSecteursActivite(["electricite"]),
      ]);

      const resultat = selectSecteursPourSaisieActivites(panachage);

      expect(resultat).toEqual(["eauxUsees", "electricite"]);
    });
  });
});

function executer(actions: ActionQuestionnaire[]): EtatQuestionnaire {
  return actions.reduce(
    (etat: EtatQuestionnaire, action: ActionQuestionnaire) =>
      reducerQuestionnaire(etat, action),
    etatParDefaut,
  );
}
