import { beforeEach, describe, expect, it } from "vitest";
import {
  etatParDefaut,
  EtatQuestionnaire,
  reducerQuestionnaire,
} from "../../src/questionnaire/reducerQuestionnaire";
import {
  ActionQuestionnaire,
  valideEtapeAppartenanceUE,
  valideEtapeDesignation,
  valideEtapePrealable,
  valideSecteursActivite,
  valideTailleEntitePrivee,
  valideTypeStructure,
} from "../../src/questionnaire/actions";

describe("Le reducer du Questionnaire", () => {
  it("indique l'étape « préalable » comme étape de départ", () => {
    const etat = reducerQuestionnaire(undefined, { type: "VIDE" });

    expect(etat.etapeCourante).toBe("prealable");
  });

  it("passe à l'étape « Désignation » quand l'étape préalable est validée", () => {
    const etat = reducerQuestionnaire(undefined, valideEtapePrealable());

    expect(etat.etapeCourante).toBe("designationOperateurServicesEssentiels");
  });

  describe("à la validation de l'étape « Désignation »", () => {
    let etat: EtatQuestionnaire;
    beforeEach(() => {
      etat = executer([valideEtapeDesignation(["oui"])]);
    });

    it("sauvegarde les informations de l'étape", () => {
      expect(etat.designationOperateurServicesEssentiels).toEqual(["oui"]);
    });

    it("passe à l'étape « Appartenance UE »", () => {
      expect(etat.etapeCourante).toBe("appartenanceUnionEuropeenne");
    });
  });

  describe("à la validation de l'étape « Appartenance UE »", () => {
    let etat: EtatQuestionnaire;
    beforeEach(() => {
      etat = executer([valideEtapeAppartenanceUE(["france"])]);
    });

    it("sauvegarde les informations de l'étape", () => {
      expect(etat.appartenancePaysUnionEuropeenne).toEqual(["france"]);
    });

    it("passe à l'étape « Type de structure »", () => {
      expect(etat.etapeCourante).toBe("typeStructure");
    });
  });

  describe("à la validation de l'étape « Type de structure »", () => {
    let etat: EtatQuestionnaire;
    beforeEach(() => {
      etat = executer([valideTypeStructure(["privee"])]);
    });

    it("sauvegarde les informations de l'étape", () => {
      expect(etat.typeStructure).toEqual(["privee"]);
    });

    it("passe à l'étape « Taille d'entité privée », car les structures publiques ne sont pas encore prises en charge", () => {
      expect(etat.etapeCourante).toBe("tailleEntitePrivee");
    });
  });

  describe("à la validation de l'étape « Taille d'entité privée »", () => {
    let etat: EtatQuestionnaire;
    beforeEach(() => {
      etat = executer([valideTailleEntitePrivee(["petit"], ["moyen"])]);
    });

    it("sauvegarde les informations de l'étape", () => {
      expect(etat.trancheNombreEmployes).toEqual(["petit"]);
      expect(etat.trancheChiffreAffaire).toEqual(["moyen"]);
    });

    it("passe à l'étape « Secteurs d'activité »", () => {
      expect(etat.etapeCourante).toBe("secteursActivite");
    });
  });

  describe("à la validation de l'étape « Secteurs d'activité »", () => {
    it("sauvegarde les informations de l'étape", () => {
      const etat = executer([valideSecteursActivite(["energie"])]);
      expect(etat.secteurActivite).toEqual(["energie"]);
    });

    it("passe à l'étape « Résultat » s'il n'y a que des secteurs classés « Autre »", () => {
      const etat = executer([valideSecteursActivite(["autreSecteurActivite"])]);
      expect(etat.etapeCourante).toBe("resultat");
    });

    it("passe à l'étape « Sous secteurs d'activité » si certains secteurs ont des sous-secteurs", () => {
      const etat = executer([valideSecteursActivite(["energie"])]);
      expect(etat.etapeCourante).toBe("sousSecteursActivite");
    });

    it("passe à l'étape « Activités » dans les autres cas", () => {
      const etat = executer([
        valideSecteursActivite(["banqueSecteurBancaire"]),
      ]);
      expect(etat.etapeCourante).toBe("activites");
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
