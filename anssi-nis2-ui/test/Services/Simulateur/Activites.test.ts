import { describe, expect, it } from "vitest";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../../src/Services/Simulateur/donneesFormulaire";
import { libellesSecteursActivite } from "../../../src/Domaine/Simulateur/LibellesSecteursActivite";
import { libellesSousSecteursActivite } from "../../../src/Domaine/Simulateur/SecteursActivite";
import {
  cartographieSousSecteursParSecteur,
  collecteTitresPourActivite,
} from "../../../src/Services/Simulateur/Transformateurs";

describe("Questionnaire activités", () => {
  it("Retourne le titre du secteur 'Espace' s'il est seul présent dans les données formulaire", () => {
    const donneesFormulaire: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["espace"],
    };
    const titresAttendus = ["Espace"];
    const titresExtraits: string[] = collecteTitresPourActivite(
      libellesSecteursActivite,
      libellesSousSecteursActivite,
      donneesFormulaire,
    );

    expect(titresExtraits).toStrictEqual(titresAttendus);
  });
  it("Construit un tableau avec les sous-secteurs sélectionnés remplaçant le secteur correspondant", () => {
    const donneesFormulaire: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["espace", "energie"],
      sousSecteurActivite: ["electricite", "hydrogene"],
    };

    const carteSousSecteurParSecteurAttendue = {
      espace: [],
      energie: ["electricite", "hydrogene"],
    };

    const carteSousSecteurParSecteurObtenue =
      cartographieSousSecteursParSecteur(donneesFormulaire);
    expect(carteSousSecteurParSecteurObtenue).toStrictEqual(
      carteSousSecteurParSecteurAttendue,
    );
  });
  it("Retourne le titre du secteur 'Énergie / Électricité' si seul le sous secteur 'Électricité' est présent dans les données formulaire", () => {
    const donneesFormulaire: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["energie"],
      sousSecteurActivite: ["electricite"],
    };
    const titresAttendus = ["Énergie / Électricité"];
    const titresExtraits: string[] = collecteTitresPourActivite(
      libellesSecteursActivite,
      libellesSousSecteursActivite,
      donneesFormulaire,
    );

    expect(titresExtraits).toStrictEqual(titresAttendus);
  });
});
