import { beforeEach, describe, expect, it } from "vitest";
import {
  autresActivites,
  CasDeTest,
  energie,
  fabrication,
  fournisseursNumeriques,
  gestionDesServicesTIC,
  infrastructureNumerique,
} from "./casDeTests.activites";
import {
  EtatQuestionnaire,
  EtatQuestionnaireVide,
} from "../../../src/Domain/Questionnaire/EtatQuestionnaire";
import {
  PointsAttentionPrecis,
  ResultatEligibilite,
  ResumesPointsAttention,
} from "../../../src/Domain/Simulateur/Regulation.definitions";
import { FabriqueDeSpecifications } from "../../../src/Domain/Questionnaire/FabriqueDeSpecifications";
import { Specifications } from "../../../src/Domain/Questionnaire/Specifications";
import {
  AppartenancePaysUnionEuropeenne,
  UnionPetitMoyenGrand,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { SecteurActivite } from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import { SousSecteurActivite } from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import { SpecificationTexte } from "../../../src/Domain/Questionnaire/FormatDesSpecificationsCSV";
import { libellesSecteursActivite } from "../../../src/Domain/Simulateur/LibellesSecteursActivite";
import { libellesSousSecteursActivite } from "../../../src/Domain/Simulateur/LibellesSousSecteursActivite";

describe("La fabrique de spécifications", () => {
  let fabrique: FabriqueDeSpecifications;

  beforeEach(() => {
    fabrique = new FabriqueDeSpecifications();
  });

  it("préserve le code des spécifications", () => {
    const avecUnCode = uneSpecification({
      Code: "R1255",
      Resultat: "Régulée EE",
    });

    const specs = fabrique.transforme(avecUnCode);

    expect(specs.code).toBe("R1255");
  });

  describe("pour la règle « d'entité OSE »", () => {
    const entiteOui: EtatQuestionnaire = {
      ...EtatQuestionnaireVide,
      designationOperateurServicesEssentiels: ["oui"],
    };
    const entiteNon: EtatQuestionnaire = {
      ...EtatQuestionnaireVide,
      designationOperateurServicesEssentiels: ["non"],
    };
    const entiteNeSaitPas: EtatQuestionnaire = {
      ...EtatQuestionnaireVide,
      designationOperateurServicesEssentiels: ["nsp"],
    };

    it("sait instancier une règle « Oui »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ "Designation OSE": "Oui", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteOui)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteNon)).toBe(undefined);
      expect(specs.evalue(entiteNeSaitPas)).toBe(undefined);
    });

    it("sait instancier une règle « Non »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ "Designation OSE": "Non", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteOui)).toBe(undefined);
      expect(specs.evalue(entiteNon)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteNeSaitPas)).toBe(undefined);
    });

    it("sait instancier une règle « Ne sait pas »", () => {
      const specs = fabrique.transforme(
        uneSpecification({
          "Designation OSE": "Ne sait pas",
          Resultat: "Régulée EE",
        }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteOui)).toBe(undefined);
      expect(specs.evalue(entiteNon)).toBe(undefined);
      expect(specs.evalue(entiteNeSaitPas)).toMatchObject(reguleEE());
    });

    it("sait instancier une règle « Non [OU] Ne sait pas »", () => {
      const specs = fabrique.transforme(
        uneSpecification({
          "Designation OSE": "Non [OU] Ne sait pas",
          Resultat: "Régulée EE",
        }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteOui)).toBe(undefined);
      expect(specs.evalue(entiteNon)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteNeSaitPas)).toMatchObject(reguleEE());
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() =>
        fabrique.transforme(
          uneSpecification({ "Designation OSE": "Mauvaise valeur" }),
        ),
      ).toThrowError("Mauvaise valeur");
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specifications = fabrique.transforme(
        uneSpecification({ "Designation OSE": "", Resultat: "Régulée EE" }),
      );

      expect(specifications.nombreDeRegles()).toBe(0);
    });
  });

  describe("pour la règle de « Localisation »", () => {
    const entiteFrance: EtatQuestionnaire = {
      ...EtatQuestionnaireVide,
      appartenancePaysUnionEuropeenne: ["france"],
    };
    const entiteAutre: EtatQuestionnaire = {
      ...EtatQuestionnaireVide,
      appartenancePaysUnionEuropeenne: ["autre"],
    };

    it("sait instancier une règle « France »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ Localisation: "France", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteFrance)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteAutre)).toBe(undefined);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() =>
        fabrique.transforme(uneSpecification({ Localisation: "12345" })),
      ).toThrowError("12345");
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specifications = fabrique.transforme(
        uneSpecification({ Localisation: "-", Resultat: "Régulée EE" }),
      );

      expect(specifications.nombreDeRegles()).toBe(0);
    });
  });

  describe("pour la règle « Type de structure »", () => {
    const privee: EtatQuestionnaire = {
      ...EtatQuestionnaireVide,
      typeStructure: ["privee"],
    };
    const publique: EtatQuestionnaire = {
      ...EtatQuestionnaireVide,
      typeStructure: ["publique"],
    };

    it("instancie une règle « Entreprise privée ou publique »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({
          "Type de structure": "Entreprise privée ou publique",
          Resultat: "Régulée EE",
        }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(privee)).toMatchObject(reguleEE());
      expect(specs.evalue(publique)).toBe(undefined);
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({
          "Type de structure": "-",
          Resultat: "Régulée EE",
        }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({
            "Type de structure": "X",
            Resultat: "Régulée EE",
          }),
        );
      }).toThrowError("X");
    });
  });

  describe("pour la règle « Taille »", () => {
    const entiteDeTaille = (taille: UnionPetitMoyenGrand) => ({
      ...EtatQuestionnaireVide,
      trancheNombreEmployes: [taille],
      trancheChiffreAffaire: [taille],
    });

    const petiteEntite: EtatQuestionnaire = entiteDeTaille("petit");
    const entiteMoyenne: EtatQuestionnaire = entiteDeTaille("moyen");
    const grandeEntite: EtatQuestionnaire = entiteDeTaille("grand");

    it("sait instancier une règle « Petite »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ Taille: "Petite", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(petiteEntite)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteMoyenne)).toBe(undefined);
      expect(specs.evalue(grandeEntite)).toBe(undefined);
    });

    it("sait instancier une règle « Moyenne »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ Taille: "Moyenne", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(petiteEntite)).toBe(undefined);
      expect(specs.evalue(entiteMoyenne)).toMatchObject(reguleEE());
      expect(specs.evalue(grandeEntite)).toBe(undefined);
    });

    it("sait instancier une règle « Grande »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ Taille: "Grande", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(petiteEntite)).toBe(undefined);
      expect(specs.evalue(entiteMoyenne)).toBe(undefined);
      expect(specs.evalue(grandeEntite)).toMatchObject(reguleEE());
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Taille: "-", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({ Taille: "XXL", Resultat: "Régulée EE" }),
        );
      }).toThrowError("XXL");
    });
  });

  describe("pour la règle « Secteurs »", () => {
    const entiteDuSecteur = (secteur: SecteurActivite): EtatQuestionnaire => ({
      ...EtatQuestionnaireVide,
      secteurActivite: [secteur],
    });
    const entiteDesSecteurs = (
      secteurs: SecteurActivite[],
    ): EtatQuestionnaire => ({
      ...EtatQuestionnaireVide,
      secteurActivite: secteurs,
    });

    const tousLesSecteurs = Object.entries(libellesSecteursActivite).map(
      ([id, libelle]) => ({ id, libelle }),
    );

    it.each(tousLesSecteurs)(
      "sait instancier une règle pour le secteur $libelle",
      ({ id, libelle }: { id: string; libelle: string }) => {
        const entite = entiteDuSecteur(id as SecteurActivite);
        const specs = fabrique.transforme(
          uneSpecification({ Secteurs: libelle, Resultat: "Régulée EE" }),
        );

        expect(specs.nombreDeRegles()).toBe(1);
        expect(specs.evalue(entite)).toMatchObject(reguleEE());
      },
    );

    it("ne matche pas un secteur qui n'est pas celui de la règle", () => {
      const banque = entiteDuSecteur("banqueSecteurBancaire");
      const specsEnergie = fabrique.transforme(
        uneSpecification({ Secteurs: "Énergie", Resultat: "Régulée EE" }),
      );

      const resultat = specsEnergie.evalue(banque);

      expect(resultat).toBe(undefined);
    });

    it("matche dès qu'un secteur est parmi ceux de la règle", () => {
      const banqueEtEnergie = entiteDesSecteurs([
        "banqueSecteurBancaire",
        "energie",
      ]);
      const specsEnergie = fabrique.transforme(
        uneSpecification({ Secteurs: "Énergie", Resultat: "Régulée EE" }),
      );

      const resultat = specsEnergie.evalue(banqueEtEnergie);

      expect(resultat).toMatchObject(reguleEE());
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Secteurs: "-", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({ Secteurs: "Tennis", Resultat: "Régulée EE" }),
        );
      }).toThrowError("Tennis");
    });
  });

  describe("pour la règle « Sous-secteurs »", () => {
    const entiteDuSousSecteur = (
      sousSecteur: SousSecteurActivite,
    ): EtatQuestionnaire => ({
      ...EtatQuestionnaireVide,
      sousSecteurActivite: [sousSecteur],
    });

    const entiteDesSousSecteur = (
      sousSecteurs: SousSecteurActivite[],
    ): EtatQuestionnaire => ({
      ...EtatQuestionnaireVide,
      sousSecteurActivite: sousSecteurs,
    });

    const tousSaufAutres = Object.entries(libellesSousSecteursActivite)
      .filter(([, libelle]) => libelle !== "Autre sous-secteur")
      .map(([id, libelle]) => ({ id, libelle }));

    it.each(tousSaufAutres)(
      "sait instancier une règle pour le sous-secteur $libelle",
      ({ id, libelle }: { id: string; libelle: string }) => {
        const entite = entiteDuSousSecteur(id as SousSecteurActivite);
        const specs = fabrique.transforme(
          uneSpecification({
            "Sous-secteurs": libelle,
            Resultat: "Régulée EE",
          }),
        );

        expect(specs.nombreDeRegles()).toBe(1);
        expect(specs.evalue(entite)).toMatchObject(reguleEE());
      },
    );

    it("ne matche pas un sous-secteur qui n'est pas celui de la règle", () => {
      const gaz = entiteDuSousSecteur("gaz");
      const transportAerien = fabrique.transforme(
        uneSpecification({
          "Sous-secteurs": "Aériens",
          Resultat: "Régulée EE",
        }),
      );

      const resultat = transportAerien.evalue(gaz);

      expect(resultat).toBe(undefined);
    });

    it("matche dès qu'un secteur est parmi ceux de la règle", () => {
      const aeriensEtFerroviaires = entiteDesSousSecteur([
        "transportsAeriens",
        "transportsFerroviaires",
      ]);
      const specsFeroviaires = fabrique.transforme(
        uneSpecification({
          "Sous-secteurs": "Ferroviaires",
          Resultat: "Régulée EE",
        }),
      );

      const resultat = specsFeroviaires.evalue(aeriensEtFerroviaires);

      expect(resultat).toMatchObject(reguleEE());
    });

    describe("quand il s'agit de la valeur « Autre sous-secteur »", () => {
      it("sait instancier une règle pour le « Autre » du secteur Énergie", () => {
        const autreDeEnergie: EtatQuestionnaire = {
          ...entiteDuSousSecteur("autreSousSecteurEnergie"),
          secteurActivite: ["energie"],
        };

        const specsAutreEnergie = fabrique.transforme(
          uneSpecification({
            Secteurs: "Énergie",
            "Sous-secteurs": "Autre sous-secteur",
            Resultat: "Régulée EE",
          }),
        );

        expect(specsAutreEnergie.nombreDeRegles()).toBe(2);
        expect(specsAutreEnergie.evalue(autreDeEnergie)).toMatchObject(
          reguleEE(),
        );
      });

      it("sait instancier une règle pour le « Autre » du secteur Fabrication", () => {
        const autreDeFabrication: EtatQuestionnaire = {
          ...entiteDuSousSecteur("autreSousSecteurFabrication"),
          secteurActivite: ["fabrication"],
        };

        const specsAutreFabrication = fabrique.transforme(
          uneSpecification({
            Secteurs: "Fabrication",
            "Sous-secteurs": "Autre sous-secteur",
            Resultat: "Régulée EE",
          }),
        );

        expect(specsAutreFabrication.nombreDeRegles()).toBe(2);
        expect(specsAutreFabrication.evalue(autreDeFabrication)).toMatchObject(
          reguleEE(),
        );
      });

      it("sait instancier une règle pour le « Autre » du secteur Transports", () => {
        const autreDeTransports: EtatQuestionnaire = {
          ...entiteDuSousSecteur("autreSousSecteurTransports"),
          secteurActivite: ["transports"],
        };

        const specsAutreFabrication = fabrique.transforme(
          uneSpecification({
            Secteurs: "Transports",
            "Sous-secteurs": "Autre sous-secteur",
            Resultat: "Régulée EE",
          }),
        );

        expect(specsAutreFabrication.nombreDeRegles()).toBe(2);
        expect(specsAutreFabrication.evalue(autreDeTransports)).toMatchObject(
          reguleEE(),
        );
      });

      it("jette une erreur si le secteur parent n'a pas de sous-secteur connu", () => {
        expect(() => {
          fabrique.transforme(
            uneSpecification({
              "Sous-secteurs": "Autre sous-secteur",
              Secteurs: "Gestion des services TIC", // Ce secteur n'a pas de sous-secteur
              Resultat: "Régulée EE",
            }),
          );
        }).toThrowError("Autre sous-secteur");
      });
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ "Sous-secteurs": "-", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({
            "Sous-secteurs": "Parachute",
            Resultat: "Régulée EE",
          }),
        );
      }).toThrowError("Parachute");
    });
  });

  describe("pour la règle « Activités »", () => {
    const casDeTest: CasDeTest[] = [
      ...infrastructureNumerique,
      ...gestionDesServicesTIC,
      ...fournisseursNumeriques,
      ...fabrication,
      ...energie,
      ...autresActivites,
    ];

    it.each(casDeTest)(
      `sait instancier la règle $libelleActivite du secteur $libelleSecteur`,
      ({
        libelleActivite,
        activite,
        libelleSecteur,
        secteur,
        libelleSousSecteur = "-",
        sousSecteur,
      }) => {
        const specs: Specifications = fabrique.transforme(
          uneSpecification({
            Activités: libelleActivite,
            Secteurs: libelleSecteur,
            "Sous-secteurs": libelleSousSecteur,
            Resultat: "Régulée EE",
          }),
        );

        const reponse: EtatQuestionnaire = {
          ...EtatQuestionnaireVide,
          secteurActivite: [secteur],
          sousSecteurActivite: [sousSecteur!],
          activites: [activite],
        };

        expect(specs.evalue(reponse)).toMatchObject(reguleEE());
      },
    );

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Activités: "-", Resultat: "Régulée EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({ Activités: "Volley", Resultat: "Régulée EE" }),
        );
      }).toThrowError("Volley");
    });
  });

  describe("pour la règle « Extra - Fourniture de service »", () => {
    const entiteQuiFournitEn = (
      localisations: AppartenancePaysUnionEuropeenne[],
    ): EtatQuestionnaire => ({
      ...EtatQuestionnaireVide,
      localisationFournitureServicesNumeriques: localisations,
    });

    it("instancie une règle pour la valeur « France »", () => {
      const specsFrance: Specifications = fabrique.transforme(
        uneSpecification({
          "Extra - Fourniture de service": "France",
          Resultat: "Régulée EE",
        }),
      );

      const enFrance = entiteQuiFournitEn(["france"]);

      expect(specsFrance.nombreDeRegles()).toBe(1);
      expect(specsFrance.evalue(enFrance)).toMatchObject(reguleEE());
    });

    it("instancie une règle pour la valeur « Autres États membres de l'Union Européenne »", () => {
      const specsAutreDansUE: Specifications = fabrique.transforme(
        uneSpecification({
          "Extra - Fourniture de service":
            "Autres États membres de l'Union Européenne",
          Resultat: "Régulée EE",
        }),
      );

      const autreEnUE = entiteQuiFournitEn(["autre"]);

      expect(specsAutreDansUE.nombreDeRegles()).toBe(1);
      expect(specsAutreDansUE.evalue(autreEnUE)).toMatchObject(reguleEE());
    });

    it("instancie une règle pour la valeur « Autres États hors Union Européenne »", () => {
      const specsHorsUE: Specifications = fabrique.transforme(
        uneSpecification({
          "Extra - Fourniture de service": "Autres États hors Union Européenne",
          Resultat: "Régulée EE",
        }),
      );

      const horsUE = entiteQuiFournitEn(["horsue"]);

      expect(specsHorsUE.nombreDeRegles()).toBe(1);
      expect(specsHorsUE.evalue(horsUE)).toMatchObject(reguleEE());
    });

    describe("lorsque la valeur est un cumul de réponses", () => {
      it("instancie une règle qui match si les réponses sont exactement la combinaison des valeurs individuelles attendues", () => {
        const specsFranceEtAutreUE = fabrique.transforme(
          uneSpecification({
            "Extra - Fourniture de service":
              "France + Autres États membres de l'Union Européenne",
            Resultat: "Régulée EE",
          }),
        );

        expect(specsFranceEtAutreUE.nombreDeRegles()).toBe(1);

        expect(
          specsFranceEtAutreUE.evalue(entiteQuiFournitEn(["france", "autre"])),
        ).toMatchObject(reguleEE());

        expect(
          specsFranceEtAutreUE.evalue(entiteQuiFournitEn(["france"])),
        ).toBe(undefined);
        expect(specsFranceEtAutreUE.evalue(entiteQuiFournitEn(["autre"]))).toBe(
          undefined,
        );
        expect(
          specsFranceEtAutreUE.evalue(entiteQuiFournitEn(["france", "horsue"])),
        ).toBe(undefined);
        expect(
          specsFranceEtAutreUE.evalue(entiteQuiFournitEn(["horsue"])),
        ).toBe(undefined);
      });
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({
          "Extra - Fourniture de service": "-",
          Resultat: "Régulée EE",
        }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({
            "Extra - Fourniture de service": "Jardin",
            Resultat: "Régulée EE",
          }),
        );
      }).toThrowError("Jardin");
    });
  });

  describe("pour la règle « Extra - Établissement principal »", () => {
    const entiteAvecDecisionEn = (
      pays: AppartenancePaysUnionEuropeenne,
    ): EtatQuestionnaire => ({
      ...EtatQuestionnaireVide,
      paysDecisionsCyber: [pays],
    });

    const entiteQuiOpereEn = (
      pays: AppartenancePaysUnionEuropeenne,
    ): EtatQuestionnaire => ({
      ...EtatQuestionnaireVide,
      paysOperationsCyber: [pays],
    });

    const entiteAvecSalariesBasesEn = (
      pays: AppartenancePaysUnionEuropeenne,
    ): EtatQuestionnaire => ({
      ...EtatQuestionnaireVide,
      paysPlusGrandNombreSalaries: [pays],
    });

    it("instancie la règle « France »", () => {
      expect(() =>
        fabrique.transforme(
          uneSpecification({
            "Extra - Établissement principal": "France",
            Resultat: "Régulée EE",
          }),
        ),
      ).not.toThrowError();
    });

    it("instancie la règle « Autres États membres de l'Union Européenne »", () => {
      expect(() =>
        fabrique.transforme(
          uneSpecification({
            "Extra - Établissement principal":
              "Autres États membres de l'Union Européenne",
            Resultat: "Régulée EE",
          }),
        ),
      ).not.toThrowError();
    });

    it("est un match dès qu'un pays de la réponse correspond au pays de la règle", () => {
      const specsFrance: Specifications = fabrique.transforme(
        uneSpecification({
          "Extra - Établissement principal": "France",
          Resultat: "Régulée EE",
        }),
      );

      const decisionFr = entiteAvecDecisionEn("france");
      expect(specsFrance.evalue(decisionFr)).toMatchObject(reguleEE());

      const operationFr = entiteQuiOpereEn("france");
      expect(specsFrance.evalue(operationFr)).toMatchObject(reguleEE());

      const salariesFr = entiteAvecSalariesBasesEn("france");
      expect(specsFrance.evalue(salariesFr)).toMatchObject(reguleEE());
    });

    it("ne match pas si aucun pays de la réponse ne correspond à celui de la règle", () => {
      const specsFrance: Specifications = fabrique.transforme(
        uneSpecification({
          "Extra - Établissement principal": "France",
          Resultat: "Régulée EE",
        }),
      );

      const decisionAutreUE = entiteAvecDecisionEn("autre");

      expect(specsFrance.evalue(decisionAutreUE)).toBe(undefined);
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({
          "Extra - Établissement principal": "-",
          Resultat: "Régulée EE",
        }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({
            "Extra - Établissement principal": "Jardin",
            Resultat: "Régulée EE",
          }),
        );
      }).toThrowError("Jardin");
    });
  });

  describe("pour le résultat", () => {
    it("sait instancier un résultat « Régulée EE»", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Régulée EE" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("EntiteEssentielle");
    });

    it("sait instancier un résultat « Régulée EI »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Régulée EI" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("EntiteImportante");
    });

    it("sait instancier un résultat « Régulée, enregistrement seul »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Régulée, enregistrement seul" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("EnregistrementUniquement");
    });

    it("sait instancier un résultat « Régulée, sans précision EE/EI »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Régulée, sans précision EE/EI" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("AutreEtatMembreUE");
    });

    it("sait instancier un résultat « Non regulée »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Non régulée" }),
      );

      expect(specs.resultat().regulation).toBe("NonRegule");
    });

    it("sait instancier un résultat « Incertain »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Incertain" }),
      );

      expect(specs.resultat().regulation).toBe("Incertain");
      expect(specs.resultat().typeEntite).toBe("AutreEtatMembreUE");
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() =>
        fabrique.transforme(uneSpecification({ Resultat: "X" })),
      ).toThrowError("X");
    });
  });

  describe("pour les « Points d'attention »", () => {
    const tousLesResumes: [string, ResumesPointsAttention][] = [
      ["#NumeriqueUE", "NumeriqueUE"],
      ["#EtabliUE", "EtabliUE"],
      ["#RepresentantUE", "RepresentantUE"],
    ];

    it.each(tousLesResumes)(
      `comprend le résumé %s`,
      (cleCsv, resumeAttendu) => {
        const specs: Specifications = fabrique.transforme(
          uneSpecification({
            Resultat: "Régulée EE",
            "Points d'attention": cleCsv,
          }),
        );

        const { resumes } = specs.resultat().pointsAttention;

        expect(resumes).toEqual([resumeAttendu]);
      },
    );

    const toutesLesPrecisions: [string, PointsAttentionPrecis][] = [
      [
        "#MecanismeExemptionSecuriteNationale",
        "MecanismeExemptionSecuriteNationale",
      ],
      ["#ResilienceEntiteCritique", "ResilienceEntiteCritique"],
      ["#DORA", "DORA"],
      ["#TelecomFranceEtAutresEMdelUE", "TelecomFranceEtAutresEMdelUE"],
      ["#TelecomAutresEMdelUEUniquement", "TelecomAutresEMdelUEUniquement"],
      ["#NumeriqueEtabliEMUEhorsFrance", "NumeriqueEtabliEMUEhorsFrance"],
      ["#EnregistrementNomsDeDomaine", "EnregistrementNomsDeDomaine"],
      ["#CriteresDePossibleInclusion", "CriteresDePossibleInclusion"],
      ["#OSE", "OSE"],
    ];
    it.each(toutesLesPrecisions)(
      "comprend la précision %s",
      (cleCsv, precisionAttendue) => {
        const specs: Specifications = fabrique.transforme(
          uneSpecification({
            Resultat: "Régulée EE",
            "Points d'attention": cleCsv,
          }),
        );

        const { precisions } = specs.resultat().pointsAttention;

        expect(precisions).toEqual([precisionAttendue]);
      },
    );

    it("sait répartir entre les résumés et les précisions", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({
          Resultat: "Régulée EE",
          "Points d'attention": "#NumeriqueUE, #DORA",
        }),
      );

      const { resumes, precisions } = specs.resultat().pointsAttention;

      expect(resumes).toEqual(["NumeriqueUE"]);
      expect(precisions).toEqual(["DORA"]);
    });

    it("ne fait rien s'il n'y a pas de points d'attention", () => {
      const specs = fabrique.transforme(
        uneSpecification({
          Resultat: "Régulée EE",
          "Points d'attention": "-",
        }),
      );

      const { resumes, precisions } = specs.resultat().pointsAttention;

      expect(resumes).toEqual([]);
      expect(precisions).toEqual([]);
    });

    it("lève une exception si un point d'attention est inconnu", () => {
      expect(() =>
        fabrique.transforme(
          uneSpecification({
            Resultat: "Régulée EE",
            "Points d'attention": "#Train",
          }),
        ),
      ).toThrowError("Train");
    });
  });
});

function uneSpecification(
  surcharge: Partial<SpecificationTexte>,
): SpecificationTexte {
  return {
    "Designation OSE": "",
    Localisation: "-",
    "Type de structure": "-",
    Taille: "-",
    Secteurs: "-",
    "Sous-secteurs": "-",
    Activités: "-",
    "Extra - Fourniture de service": "-",
    "Extra - Établissement principal": "-",
    Resultat: "CHAQUE TEST DOIT LE DÉFINIR",
    "Points d'attention": "-",
    Code: "",
    ...surcharge,
  };
}

export function reguleEE(): Partial<ResultatEligibilite> {
  return {
    regulation: "Regule",
    typeEntite: "EntiteEssentielle",
  };
}
