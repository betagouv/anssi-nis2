import { describe, expect, it } from "vitest";
import { DonneesFormulaireSimulateur } from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { libellesSecteursActivite } from "../../src/References/LibellesSecteursActivite";
import { libellesSousSecteursActivite } from "../../src/References/LibellesSousSecteursActivite";
import {
  AssociationSectorielleActivite,
  collecteTitresPourActivite,
} from "../../src/Domaine/Simulateur/services/Activite/Activite.operations";
import { cartographieSousSecteursParSecteur } from "../../src/Domaine/Simulateur/services/SousSecteurActivite/SousSecteurActivite.operations";

describe("Questionnaire activités", () => {
  describe(cartographieSousSecteursParSecteur, () => {
    it("Construit un tableau avec les sous-secteurs sélectionnés remplaçant le secteur correspondant", () => {
      const donneesFormulaire = new DonneesFormulaireSimulateur({
        secteurActivite: ["espace", "energie", "fabrication"],
        sousSecteurActivite: [
          "electricite",
          "hydrogene",
          "fabricationEquipementsElectroniques",
        ],
      });

      const carteSousSecteurParSecteurAttendue = Object.entries({
        espace: [],
        energie: ["electricite", "hydrogene"],
        fabrication: ["fabricationEquipementsElectroniques"],
      });

      const carteSousSecteurParSecteurObtenue =
        cartographieSousSecteursParSecteur(donneesFormulaire);

      expect(carteSousSecteurParSecteurObtenue).toStrictEqual(
        carteSousSecteurParSecteurAttendue,
      );
    });
    it("Omet les secteurs et sous secteurs autres", () => {
      const donneesFormulaire = new DonneesFormulaireSimulateur({
        secteurActivite: [
          "espace",
          "energie",
          "fabrication",
          "autreSecteurActivite",
        ],
        sousSecteurActivite: [
          "electricite",
          "hydrogene",
          "fabricationEquipementsElectroniques",
          "autreSousSecteurEnergie",
        ],
      });

      const carteSousSecteurParSecteurAttendue = Object.entries({
        espace: [],
        energie: ["electricite", "hydrogene"],
        fabrication: ["fabricationEquipementsElectroniques"],
      });

      const carteSousSecteurParSecteurObtenue =
        cartographieSousSecteursParSecteur(donneesFormulaire);

      expect(carteSousSecteurParSecteurObtenue).toStrictEqual(
        carteSousSecteurParSecteurAttendue,
      );
    });
  });
  it("Retourne le titre du secteur 'Espace' s'il est seul présent dans les données formulaire", () => {
    const donneesFormulaire = new DonneesFormulaireSimulateur({
      secteurActivite: ["espace"],
    });
    const titresAttendus: AssociationSectorielleActivite[] = [
      {
        titreActivite: "Espace",
        secteurOuSousSecteur: "espace",
      },
    ];
    const titresExtraits: AssociationSectorielleActivite[] =
      collecteTitresPourActivite(
        libellesSecteursActivite,
        libellesSousSecteursActivite,
        donneesFormulaire,
      );

    expect(titresExtraits).toStrictEqual(titresAttendus);
  });

  it("Retourne le titre du secteur 'Énergie / Électricité' si seul le sous secteur 'Électricité' est présent dans les données formulaire", () => {
    const donneesFormulaire = new DonneesFormulaireSimulateur({
      secteurActivite: ["energie"],
      sousSecteurActivite: ["electricite"],
    });
    const titresAttendus: AssociationSectorielleActivite[] = [
      {
        titreActivite: "Énergie / Électricité",
        secteurOuSousSecteur: "electricite",
      },
    ];
    const titresExtraits: AssociationSectorielleActivite[] =
      collecteTitresPourActivite(
        libellesSecteursActivite,
        libellesSousSecteursActivite,
        donneesFormulaire,
      );

    expect(titresExtraits).toStrictEqual(titresAttendus);
  });

  it("Retourne un mix de titres avec ou sans sous secteurs", () => {
    const donneesFormulaire = new DonneesFormulaireSimulateur({
      secteurActivite: ["espace", "energie"],
      sousSecteurActivite: ["electricite", "hydrogene"],
    });
    const titresAttendus: AssociationSectorielleActivite[] = [
      {
        titreActivite: "Espace",
        secteurOuSousSecteur: "espace",
      },
      {
        titreActivite: "Énergie / Électricité",
        secteurOuSousSecteur: "electricite",
      },
      {
        titreActivite: "Énergie / Hydrogène",
        secteurOuSousSecteur: "hydrogene",
      },
    ];
    const titresExtraits: AssociationSectorielleActivite[] =
      collecteTitresPourActivite(
        libellesSecteursActivite,
        libellesSousSecteursActivite,
        donneesFormulaire,
      );

    expect(titresExtraits).toStrictEqual(titresAttendus);
  });
});
