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
    Resultat: "CHAQUE TEST DOIT LE DÉFINIR",
    ...surcharge,
  };
}

function reguleEE(): Partial<ResultatEligibilite> {
  return { regulation: "Regule", typeEntite: "EntiteEssentielle" };
}
