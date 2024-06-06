import { beforeEach, describe, expect, it } from "vitest";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../../src/questionnaire/reducerQuestionnaire";
import { FabriqueDeSpecifications } from "../../../src/questionnaire/specifications/FabriqueDeSpecifications";
import { SpecificationTexte } from "../../../src/questionnaire/specifications/FormatDesSpecificationsCSV";
import { Specifications } from "../../../src/questionnaire/specifications/Specifications";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions";
import { UnionPetitMoyenGrand } from "../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions";
import { SecteurActivite } from "../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions";
import { libellesSecteursActivite } from "../../../src/References/LibellesSecteursActivite";
import { SousSecteurActivite } from "../../../../commun/core/src/Domain/Simulateur/SousSecteurActivite.definitions";
import { libellesSousSecteursActivite } from "../../../src/References/LibellesSousSecteursActivite";
import { Activite } from "../../../../commun/core/src/Domain/Simulateur/Activite.definitions";

describe("La fabrique de spécifications", () => {
  let fabrique: FabriqueDeSpecifications;

  beforeEach(() => {
    fabrique = new FabriqueDeSpecifications();
  });

  describe("pour la règle « d'entité OSE »", () => {
    const entiteOui: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["oui"],
    };
    const entiteNon: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["non"],
    };
    const entiteNeSaitPas: EtatQuestionnaire = {
      ...etatParDefaut,
      designationOperateurServicesEssentiels: ["nsp"],
    };

    it("sait instancier une règle « Oui »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ "Designation OSE": "Oui", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(entiteOui)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteNon)).toBe(undefined);
      expect(specs.evalue(entiteNeSaitPas)).toBe(undefined);
    });

    it("sait instancier une règle « Non / Ne sait pas »", () => {
      const specs = fabrique.transforme(
        uneSpecification({
          "Designation OSE": "Non / Ne sait pas",
          Resultat: "Regule EE",
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
        uneSpecification({ "Designation OSE": "", Resultat: "Regule EE" }),
      );

      expect(specifications.nombreDeRegles()).toBe(0);
    });
  });

  describe("pour la règle de « Localisation »", () => {
    const entiteFrance: EtatQuestionnaire = {
      ...etatParDefaut,
      appartenancePaysUnionEuropeenne: ["france"],
    };
    const entiteAutre: EtatQuestionnaire = {
      ...etatParDefaut,
      appartenancePaysUnionEuropeenne: ["autre"],
    };

    it("sait instancier une règle « France »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ Localisation: "France", Resultat: "Regule EE" }),
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
        uneSpecification({ Localisation: "", Resultat: "Regule EE" }),
      );

      expect(specifications.nombreDeRegles()).toBe(0);
    });
  });

  describe("pour la règle « Type de structure »", () => {
    const privee: EtatQuestionnaire = {
      ...etatParDefaut,
      typeStructure: ["privee"],
    };
    const publique: EtatQuestionnaire = {
      ...etatParDefaut,
      typeStructure: ["publique"],
    };

    it("instancie une règle « Entreprise privee ou publique »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({
          "Type de structure": "Entreprise privee ou publique",
          Resultat: "Regule EE",
        }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(privee)).toMatchObject(reguleEE());
      expect(specs.evalue(publique)).toBe(undefined);
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({
          "Type de structure": "",
          Resultat: "Regule EE",
        }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({ "Type de structure": "X", Resultat: "Regule EE" }),
        );
      }).toThrowError("X");
    });
  });

  describe("pour la règle « Taille »", () => {
    const entiteDeTaille = (taille: UnionPetitMoyenGrand) => ({
      ...etatParDefaut,
      trancheNombreEmployes: [taille],
      trancheChiffreAffaire: [taille],
    });

    const petiteEntite: EtatQuestionnaire = entiteDeTaille("petit");
    const entiteMoyenne: EtatQuestionnaire = entiteDeTaille("moyen");
    const grandeEntite: EtatQuestionnaire = entiteDeTaille("grand");

    it("sait instancier une règle « Petite »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ Taille: "Petite", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(petiteEntite)).toMatchObject(reguleEE());
      expect(specs.evalue(entiteMoyenne)).toBe(undefined);
      expect(specs.evalue(grandeEntite)).toBe(undefined);
    });

    it("sait instancier une règle « Moyenne »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ Taille: "Moyenne", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(petiteEntite)).toBe(undefined);
      expect(specs.evalue(entiteMoyenne)).toMatchObject(reguleEE());
      expect(specs.evalue(grandeEntite)).toBe(undefined);
    });

    it("sait instancier une règle « Grande »", () => {
      const specs = fabrique.transforme(
        uneSpecification({ Taille: "Grande", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(1);
      expect(specs.evalue(petiteEntite)).toBe(undefined);
      expect(specs.evalue(entiteMoyenne)).toBe(undefined);
      expect(specs.evalue(grandeEntite)).toMatchObject(reguleEE());
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Taille: "", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({ Taille: "XXL", Resultat: "Regule EE" }),
        );
      }).toThrowError("XXL");
    });
  });

  describe("pour la règle « Secteurs »", () => {
    const entiteDuSecteur = (secteur: SecteurActivite): EtatQuestionnaire => ({
      ...etatParDefaut,
      secteurActivite: [secteur],
    });
    const entiteDesSecteurs = (
      secteurs: SecteurActivite[],
    ): EtatQuestionnaire => ({
      ...etatParDefaut,
      secteurActivite: secteurs,
    });

    const tousLesSecteurs = Object.entries(libellesSecteursActivite).map(
      ([id, libelle]) => ({ id, libelle }),
    );

    it.each(tousLesSecteurs)(
      "sait instancier une règle pour le secteur $libelle",
      ({ id, libelle }: { id: SecteurActivite; libelle: string }) => {
        const entite = entiteDuSecteur(id);
        const specs = fabrique.transforme(
          uneSpecification({ Secteurs: libelle, Resultat: "Regule EE" }),
        );

        expect(specs.nombreDeRegles()).toBe(1);
        expect(specs.evalue(entite)).toMatchObject(reguleEE());
      },
    );

    it("ne matche pas un secteur qui n'est pas celui de la règle", () => {
      const banque = entiteDuSecteur("banqueSecteurBancaire");
      const specsEnergie = fabrique.transforme(
        uneSpecification({ Secteurs: "Énergie", Resultat: "Regule EE" }),
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
        uneSpecification({ Secteurs: "Énergie", Resultat: "Regule EE" }),
      );

      const resultat = specsEnergie.evalue(banqueEtEnergie);

      expect(resultat).toMatchObject(reguleEE());
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Secteurs: "", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({ Secteurs: "Tennis", Resultat: "Regule EE" }),
        );
      }).toThrowError("Tennis");
    });
  });

  describe("pour la règle « Sous-secteurs »", () => {
    const entiteDuSousSecteur = (
      sousSecteur: SousSecteurActivite,
    ): EtatQuestionnaire => ({
      ...etatParDefaut,
      sousSecteurActivite: [sousSecteur],
    });

    const entiteDesSousSecteur = (
      sousSecteurs: SousSecteurActivite[],
    ): EtatQuestionnaire => ({
      ...etatParDefaut,
      sousSecteurActivite: sousSecteurs,
    });

    const tousSaufAutres = Object.entries(libellesSousSecteursActivite)
      .filter(([, libelle]) => libelle !== "Autre sous-secteur")
      .map(([id, libelle]) => ({ id, libelle }));

    it.each(tousSaufAutres)(
      "sait instancier une règle pour le sous-secteur $libelle",
      ({ id, libelle }: { id: SousSecteurActivite; libelle: string }) => {
        const entite = entiteDuSousSecteur(id);
        const specs = fabrique.transforme(
          uneSpecification({ "Sous-secteurs": libelle, Resultat: "Regule EE" }),
        );

        expect(specs.nombreDeRegles()).toBe(1);
        expect(specs.evalue(entite)).toMatchObject(reguleEE());
      },
    );

    it("ne matche pas un sous-secteur qui n'est pas celui de la règle", () => {
      const gaz = entiteDuSousSecteur("gaz");
      const transportAerien = fabrique.transforme(
        uneSpecification({ "Sous-secteurs": "Aériens", Resultat: "Regule EE" }),
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
          Resultat: "Regule EE",
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
            Resultat: "Regule EE",
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
            Resultat: "Regule EE",
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
            Resultat: "Regule EE",
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
              Resultat: "Regule EE",
            }),
          );
        }).toThrowError("Autre sous-secteur");
      });
    });

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ "Sous-secteurs": "", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({
            "Sous-secteurs": "Parachute",
            Resultat: "Regule EE",
          }),
        );
      }).toThrowError("Parachute");
    });
  });

  describe("pour la règle « Activités »", () => {
    type CasDeTest = {
      libelleActivite: string;
      activite: Activite;
      libelleSecteur: string;
      secteur: SecteurActivite;
      libelleSousSecteur?: string;
      sousSecteur?: SousSecteurActivite;
    };

    const casDeTest: CasDeTest[] = [
      {
        libelleActivite:
          "Fournisseurs de réseaux de communications électroniques publics",
        activite: "fournisseurReseauxCommunicationElectroniquesPublics",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite:
          "Fournisseurs de services de communications électroniques accessibles au public",
        activite: "fournisseurServiceCommunicationElectroniquesPublics",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite:
          "Fournisseurs de services DNS, à l'exclusion des opérateurs de serveurs racines de noms de domaines",
        activite: "fournisseurServicesDNS",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite: "Registres de noms de domaines de premier niveau",
        activite: "registresNomsDomainesPremierNiveau",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite:
          "Fournisseur des services d'enregistrement de noms de domaine",
        activite: "fournisseurServicesEnregristrementNomDomaine",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite: "Prestataires de service de confiance qualifié",
        activite: "prestataireServiceConfianceQualifie",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite: "Prestataires de service de confiance non qualifié",
        activite: "prestataireServiceConfianceNonQualifie",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite: "Fournisseurs de services d'informatique en nuage",
        activite: "fournisseurServicesInformatiqueNuage",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite: "Fournisseurs de services de centres de données",
        activite: "fournisseurServiceCentresDonnees",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite: "Fournisseurs de réseaux de diffusion de contenu",
        activite: "fournisseurReseauxDiffusionContenu",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteInfrastructureNumerique",
        libelleSecteur: "Infrastructure numérique",
        secteur: "infrastructureNumerique",
      },
      {
        libelleActivite: "Fournisseurs de services gérés",
        activite: "fournisseurServicesGeres",
        libelleSecteur: "Gestion des services TIC",
        secteur: "gestionServicesTic",
      },
      {
        libelleActivite: "Fournisseurs de services de sécurité gérés",
        activite: "fournisseurServicesSecuriteGeres",
        libelleSecteur: "Gestion des services TIC",
        secteur: "gestionServicesTic",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteGestionServicesTic",
        libelleSecteur: "Gestion des services TIC",
        secteur: "gestionServicesTic",
      },
      {
        libelleActivite: "Fournisseurs de places de marché en ligne",
        activite: "fournisseursPlaceMarcheEnLigne",
        libelleSecteur: "Fournisseurs numériques",
        secteur: "fournisseursNumeriques",
      },
      {
        libelleActivite: "Fournisseurs de moteurs de recherche en ligne",
        activite: "fournisseursMoteursRechercheEnLigne",
        libelleSecteur: "Fournisseurs numériques",
        secteur: "fournisseursNumeriques",
      },
      {
        libelleActivite:
          "Fournisseurs de plateformes de services de réseaux sociaux",
        activite: "fournisseursPlateformesServicesReseauxSociaux",
        libelleSecteur: "Fournisseurs numériques",
        secteur: "fournisseursNumeriques",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteFournisseursNumeriques",
        libelleSecteur: "Fournisseurs numériques",
        secteur: "fournisseursNumeriques",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteSecteurBancaire",
        libelleSecteur: "Banques (secteur bancaire)",
        secteur: "banqueSecteurBancaire",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteEauPotable",
        libelleSecteur: "Eau potable",
        secteur: "eauPotable",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteEauxUsees",
        libelleSecteur: "Eaux usées",
        secteur: "eauxUsees",
      },
      {
        libelleActivite: "Autre activité",
        activite:
          "autreActiviteFabricationProductionDistributionProduitsChimiques",
        libelleSecteur:
          "Fabrication, production et distribution de produits chimiques",
        secteur: "fabricationProductionDistributionProduitsChimiques",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteInfrastructureMarcheFinancier",
        libelleSecteur: "Infrastructure des marchés financiers",
        secteur: "infrastructureMarchesFinanciers",
      },
      {
        libelleActivite: "Autre activité",
        activite:
          "autreActiviteProductionTransformationDistributionDenreesAlimentaires",
        libelleSecteur:
          "Production transformation et distribution de denrées alimentaires",
        secteur: "productionTransformationDistributionDenreesAlimentaires",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteRecherche",
        libelleSecteur: "Recherche",
        secteur: "recherche",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteServicesPostauxExpedition",
        libelleSecteur: "Services postaux et d'expédition",
        secteur: "servicesPostauxExpedition",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteEspace",
        libelleSecteur: "Espace",
        secteur: "espace",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteGestionDechets",
        libelleSecteur: "Gestion des déchets",
        secteur: "gestionDechets",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteElectricite",
        libelleSecteur: "Énergie",
        secteur: "energie",
        libelleSousSecteur: "Électricité",
        sousSecteur: "electricite",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteGaz",
        libelleSecteur: "Énergie",
        secteur: "energie",
        libelleSousSecteur: "Gaz",
        sousSecteur: "gaz",
      },
      {
        libelleActivite: "Autre activité",
        activite: "autreActiviteHydrogene",
        libelleSecteur: "Énergie",
        secteur: "energie",
        libelleSousSecteur: "Hydrogène",
        sousSecteur: "hydrogene",
      },
    ];

    it.each(casDeTest)(
      `sait instancier la règle $libelleActivite du secteur $libelleSecteur`,
      ({
        libelleActivite,
        activite,
        libelleSecteur,
        secteur,
        libelleSousSecteur,
        sousSecteur,
      }) => {
        const specs: Specifications = fabrique.transforme(
          uneSpecification({
            Activités: libelleActivite,
            Secteurs: libelleSecteur,
            "Sous-secteurs": libelleSousSecteur,
            Resultat: "Regule EE",
          }),
        );

        const reponse: EtatQuestionnaire = {
          ...etatParDefaut,
          secteurActivite: [secteur],
          sousSecteurActivite: [sousSecteur],
          activites: [activite],
        };

        expect(specs.evalue(reponse)).toMatchObject(reguleEE());
      },
    );

    it("n'instancie pas de règle si aucune valeur n'est passée", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Activités: "", Resultat: "Regule EE" }),
      );

      expect(specs.nombreDeRegles()).toBe(0);
    });

    it("lève une exception si la valeur reçue n'est pas gérée", () => {
      expect(() => {
        fabrique.transforme(
          uneSpecification({ Activités: "Volley", Resultat: "Regule EE" }),
        );
      }).toThrowError("Volley");
    });
  });

  describe("pour le résultat", () => {
    it("sait instancier un résultat « Régulée EE»", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Regule EE" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("EntiteEssentielle");
    });

    it("sait instancier un résultat « Régulée EI »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Regule EI" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("EntiteImportante");
    });

    it("sait instancier un résultat « Régulée EI »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Regule enregistrement seul" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("EnregistrementUniquement");
    });

    it("sait instancier un résultat « Régulée Autre Etat Membre »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Regule autre EM" }),
      );

      expect(specs.resultat().regulation).toBe("Regule");
      expect(specs.resultat().typeEntite).toBe("AutreEtatMembreUE");
    });

    it("sait instancier un résultat « Non regulée »", () => {
      const specs: Specifications = fabrique.transforme(
        uneSpecification({ Resultat: "Non regule" }),
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
});

function uneSpecification(
  surcharge: Partial<SpecificationTexte>,
): SpecificationTexte {
  return {
    "Designation OSE": "",
    Localisation: "",
    "Type de structure": "",
    Taille: "",
    Secteurs: "",
    "Sous-secteurs": "",
    Activités: "",
    Resultat: "CHAQUE TEST DOIT LE DÉFINIR",
    ...surcharge,
  };
}

function reguleEE(): Partial<ResultatEligibilite> {
  return { regulation: "Regule", typeEntite: "EntiteEssentielle" };
}
