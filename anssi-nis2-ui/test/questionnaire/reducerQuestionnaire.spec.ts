import { beforeEach, describe, expect, it } from "vitest";
import {
  etatParDefaut,
  EtatQuestionnaire,
  reducerQuestionnaire,
} from "../../src/questionnaire/reducerQuestionnaire";
import {
  ActionQuestionnaire,
  valideActivites,
  valideEtapeAppartenanceUE,
  valideEtapeDesignation,
  valideEtapePrealable,
  valideLocalisationEtablissementPrincipal,
  valideLocalisationServicesNumeriques,
  valideSecteursActivite,
  valideSousSecteursActivite,
  valideTailleEntitePrivee,
  valideTypeStructure,
} from "../../src/questionnaire/actions";
import { SecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions";
import { Activite } from "anssi-nis2-core/src/Domain/Simulateur/Activite.definitions";
import { AppartenancePaysUnionEuropeenne } from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions";

describe("Le reducer du Questionnaire", () => {
  it("indique l'étape « préalable » comme étape de départ", () => {
    const etat = reducerQuestionnaire(etatParDefaut, { type: "VIDE" });

    expect(etat.etapeCourante).toBe("prealable");
  });

  it("passe à l'étape « Désignation » quand l'étape préalable est validée", () => {
    const etat = reducerQuestionnaire(etatParDefaut, valideEtapePrealable());

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

  describe("à la validation de l'étape « Sous-secteurs d'activité »", () => {
    it("sauvegarde les informations de l'étape", () => {
      const etat = executer([valideSousSecteursActivite(["electricite"])]);
      expect(etat.sousSecteurActivite).toEqual(["electricite"]);
    });

    it("passe à l'etape « Résultat » si tous les secteurs & sous-secteurs sont du « Autre » (donc aucun intérêt à aller vers « Activités »)", () => {
      const etat = executer([
        valideSecteursActivite(["autreSecteurActivite"]),
        valideSousSecteursActivite(["autreSousSecteurFabrication"]),
      ]);

      expect(etat.etapeCourante).toBe("resultat");
    });

    it("passe à l'étape « Activités » s'il y a un secteur qui n'est pas du « Autre » (même si tous les sous-secteurs sont « Autres ») car on va vouloir ses activités", () => {
      const necessiteEtapeActivite = "eauxUsees";

      const avecUnSecteurATraiter = executer([
        valideSecteursActivite(["transports", necessiteEtapeActivite]),
        valideSousSecteursActivite(["autreSousSecteurTransports"]),
      ]);

      expect(avecUnSecteurATraiter.etapeCourante).toBe("activites");
    });

    it("passe à l'étape « Activités » s'il y a des sous-secteurs qui ne sont pas du « Autre »", () => {
      const etat = executer([valideSousSecteursActivite(["electricite"])]);

      expect(etat.etapeCourante).toBe("activites");
    });
  });

  describe("à la validation de l'étape « Activités »", () => {
    it("sauvegarde les informations de l'étape", () => {
      const etat = executer([valideActivites(["etablissementCredit"])]);
      expect(etat.activites).toEqual(["etablissementCredit"]);
    });

    const secteurVersLocalisationEtablissement: SecteurActivite[] = [
      "gestionServicesTic",
      "fournisseursNumeriques",
    ];
    secteurVersLocalisationEtablissement.forEach((secteur) =>
      it(`navigue vers l'étape « Localisation de l'établissement principal » si le secteur d'activité « ${secteur} est présent`, () => {
        const peuImporte = "autreActiviteHydrogene";

        const etat = executer([
          valideSecteursActivite([secteur]),
          valideActivites([peuImporte]),
        ]);

        expect(etat.etapeCourante).toBe("localisationEtablissementPrincipal");
      }),
    );

    const activitesVersLocalisationEtablissement: Activite[] = [
      "registresNomsDomainesPremierNiveau",
      "fournisseurServicesDNS",
      "fournisseurServicesInformatiqueNuage",
      "fournisseurServiceCentresDonnees",
      "fournisseurReseauxDiffusionContenu",
    ];
    activitesVersLocalisationEtablissement.forEach((activite) =>
      it(`navigue vers l'étape « Localisation de l'établissement principal » si l'activité « ${activite} » est présente`, () => {
        const etat = executer([valideActivites([activite])]);

        expect(etat.etapeCourante).toBe("localisationEtablissementPrincipal");
      }),
    );

    const activitesVersLocalisationServiceNumerique: Activite[] = [
      "fournisseurReseauxCommunicationElectroniquesPublics",
      "fournisseurServiceCommunicationElectroniquesPublics",
    ];
    activitesVersLocalisationServiceNumerique.forEach((activite) =>
      it(`navigue vers l'étape « Localisation de la fourniture des services numériques » si l'activité « ${activite} » est présente`, () => {
        const etat = executer([valideActivites([activite])]);

        expect(etat.etapeCourante).toBe(
          "localisationFournitureServicesNumeriques",
        );
      }),
    );

    it("navigue vers l'étape « Résultat » si l'activité saisie n'est pas dans les cas précédents", () => {
      const etat = executer([valideActivites(["acteurDuMarche"])]);

      expect(etat.etapeCourante).toBe("resultat");
    });
  });

  describe("à la validation de l'étape « Localisation de l'établissement principal »", () => {
    it("sauvegarde les informations de l'étape", () => {
      const etat = executer([
        valideLocalisationEtablissementPrincipal(
          ["horsue"],
          ["autre"],
          ["france"],
        ),
      ]);

      expect(etat.paysDecisionsCyber).toEqual(["horsue"]);
      expect(etat.paysOperationsCyber).toEqual(["autre"]);
      expect(etat.paysPlusGrandNombreSalaries).toEqual(["france"]);
    });

    const activitesVersLocalisationServicesNumeriques: Activite[] = [
      "fournisseurReseauxCommunicationElectroniquesPublics",
      "fournisseurServiceCommunicationElectroniquesPublics",
    ];
    activitesVersLocalisationServicesNumeriques.forEach((activite) =>
      it(`navigue vers l'étape « Localisation des services numériques » lorsque l'activité « ${activite} » est présente`, () => {
        const versEtablissementPrincipal = valideSecteursActivite([
          "gestionServicesTic",
        ]);
        const peuImporte: AppartenancePaysUnionEuropeenne[] = ["france"];
        const etat = executer([
          versEtablissementPrincipal,
          valideActivites([activite]),
          valideLocalisationEtablissementPrincipal(peuImporte, [], []),
        ]);

        expect(etat.etapeCourante).toBe(
          "localisationFournitureServicesNumeriques",
        );
      }),
    );

    it("navigue vers l'étape « Résultat » le cas échéant", () => {
      const versEtablissementPrincipal = valideSecteursActivite([
        "gestionServicesTic",
      ]);
      const peuImporte: AppartenancePaysUnionEuropeenne[] = ["france"];
      const etat = executer([
        versEtablissementPrincipal,
        valideActivites(["fournisseurServicesDNS"]),
        valideLocalisationEtablissementPrincipal(peuImporte, [], []),
      ]);

      expect(etat.etapeCourante).toBe("resultat");
    });
  });

  describe("à la validation de l'étape « Localisation des services numériques »", () => {
    it("sauvegarde les informations de l'étape", () => {
      const etat = executer([valideLocalisationServicesNumeriques(["france"])]);

      expect(etat.localisationFournitureServicesNumeriques).toEqual(["france"]);
    });

    const secteursVersEtablissementPrincipal: SecteurActivite[] = [
      "gestionServicesTic",
      "fournisseursNumeriques",
    ];
    secteursVersEtablissementPrincipal.forEach((secteur) =>
      it(`navigue vers l'étape « Localisation de l'établissement principal » si le secteur « ${secteur} » est présent`, () => {
        const peuImporte = "france";
        const etat = executer([
          valideSecteursActivite([secteur]),
          valideLocalisationServicesNumeriques([peuImporte]),
        ]);

        expect(etat.etapeCourante).toEqual(
          "localisationEtablissementPrincipal",
        );
      }),
    );

    const activitesVersEtablissementPrincipal: Activite[] = [
      "registresNomsDomainesPremierNiveau",
      "fournisseurServicesDNS",
      "fournisseurServicesInformatiqueNuage",
      "fournisseurServiceCentresDonnees",
      "fournisseurReseauxDiffusionContenu",
    ];
    activitesVersEtablissementPrincipal.forEach((activite) =>
      it(`navigue vers l'étape « Localisation de l'établissement principal » si l'activité « ${activite} » est présente`, () => {
        const peuImporte = "france";

        const etat = executer([
          valideActivites([activite]),
          valideLocalisationServicesNumeriques([peuImporte]),
        ]);

        expect(etat.etapeCourante).toBe("localisationEtablissementPrincipal");
      }),
    );

    it("navigue vers l'étape « Résultat » le cas échéant", () => {
      const etat = executer([valideLocalisationServicesNumeriques(["france"])]);

      expect(etat.etapeCourante).toBe("resultat");
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
