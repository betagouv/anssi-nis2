import { beforeEach, describe, expect, it } from "vitest";
import {
  etatParDefaut,
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
import { EtatQuestionnaire } from "anssi-nis2-core/src/Domain/Questionnaire/EtatQuestionnaire";

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
      etat = executer([
        valideTailleEntitePrivee(["petit"], ["moyen"], ["grand"]),
      ]);
    });

    it("sauvegarde les informations de l'étape", () => {
      expect(etat.trancheNombreEmployes).toEqual(["petit"]);
      expect(etat.trancheChiffreAffaire).toEqual(["moyen"]);
      expect(etat.trancheBilanFinancier).toEqual(["grand"]);
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
      const secteurSansSousSecteur = "sante";
      const secteurAvecSousSecteur = "energie";
      const etat = executer([
        valideSecteursActivite([
          secteurSansSousSecteur,
          secteurAvecSousSecteur,
        ]),
      ]);
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
      const secteurAvecSousSecteur = "fabrication";
      const etat = executer([
        valideSecteursActivite([
          "autreSecteurActivite",
          secteurAvecSousSecteur,
        ]),
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

    describe("navigue vers l'étape « Localisation de l'établissement principal » ...", () => {
      const secteurVersLocalisationEtablissement: SecteurActivite[] = [
        "gestionServicesTic",
        "fournisseursNumeriques",
      ];
      it.each(secteurVersLocalisationEtablissement)(
        `... si le secteur d'activité « %s » est présent`,
        (secteur) => {
          const peuImporte = "autreActiviteHydrogene";

          const etat = executer([
            valideSecteursActivite([secteur]),
            valideActivites([peuImporte]),
          ]);

          expect(etat.etapeCourante).toBe("localisationEtablissementPrincipal");
        },
      );

      const activitesVersLocalisationEtablissement: Activite[] = [
        "registresNomsDomainesPremierNiveau",
        "fournisseurServicesDNS",
        "fournisseurServicesInformatiqueNuage",
        "fournisseurServiceCentresDonnees",
        "fournisseurReseauxDiffusionContenu",
        "fournisseurServicesEnregristrementNomDomaine",
      ];
      it.each(activitesVersLocalisationEtablissement)(
        `... si l'activité « %s » est présente`,
        (activite) => {
          const etat = executer([valideActivites([activite])]);

          expect(etat.etapeCourante).toBe("localisationEtablissementPrincipal");
        },
      );
    });

    describe("navigue vers l'étape « Localisation de la fourniture des services numériques »", () => {
      const activitesVersLocalisationServiceNumerique: Activite[] = [
        "fournisseurReseauxCommunicationElectroniquesPublics",
        "fournisseurServiceCommunicationElectroniquesPublics",
      ];
      it.each(activitesVersLocalisationServiceNumerique)(
        `... si l'activité « %s » est présente`,
        (activite) => {
          const etat = executer([valideActivites([activite])]);

          expect(etat.etapeCourante).toBe(
            "localisationFournitureServicesNumeriques",
          );
        },
      );
    });

    it("navigue en priorité vers l'étape « Location de l'établissement principal » si les 2 étapes de localisation sont possibles", () => {
      const versLocalisationServiceNumerique =
        "fournisseurReseauxCommunicationElectroniquesPublics";
      const versLocalisationEtablissementPrincipal =
        "registresNomsDomainesPremierNiveau";

      const etat = executer([
        valideActivites([
          versLocalisationServiceNumerique,
          versLocalisationEtablissementPrincipal,
        ]),
      ]);

      expect(etat.etapeCourante).toBe("localisationEtablissementPrincipal");
    });

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

    describe("navigue vers l'étape « Localisation de la fourniture des services numériques »", () => {
      const activitesVersLocalisationServiceNumerique: Activite[] = [
        "fournisseurReseauxCommunicationElectroniquesPublics",
        "fournisseurServiceCommunicationElectroniquesPublics",
      ];
      it.each(activitesVersLocalisationServiceNumerique)(
        `... si l'activité « %s » est présente car elle a été sélectionnée à l'étape « Activités »`,
        (activite) => {
          const activitesNecessitantLesDeuxEtapesExtra: Activite[] = [
            "fournisseurServicesDNS", // Fournisseur DNS fait passer par « Établissement principal activite »
            activite, // … puis on ajoute l'activité qui doit faire passer par « Fourniture des services numériques »
          ];
          const etat = executer([
            valideActivites(activitesNecessitantLesDeuxEtapesExtra),
            valideLocalisationEtablissementPrincipal(["france"], [], []),
          ]);

          expect(etat.etapeCourante).toBe(
            "localisationFournitureServicesNumeriques",
          );
        },
      );
    });

    it("autrement, navigue vers l'étape « Résultat »", () => {
      const etat = executer([
        valideLocalisationEtablissementPrincipal(["france"], [], []),
      ]);

      expect(etat.etapeCourante).toBe("resultat");
    });
  });

  describe("à la validation de l'étape « Localisation des services numériques »", () => {
    it("sauvegarde les informations de l'étape", () => {
      const etat = executer([valideLocalisationServicesNumeriques(["france"])]);

      expect(etat.localisationFournitureServicesNumeriques).toEqual(["france"]);
    });

    it("navigue vers l'étape « Résultat »", () => {
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
