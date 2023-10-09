import { describe, expect, it } from "vitest";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../src/Domaine/Simulateur/DonneesFormulaire";
import { libellesSecteursActivite } from "../../src/Domaine/References/LibellesSecteursActivite";
import { libellesSousSecteursActivite } from "../../src/Domaine/References/LibellesSousSecteursActivite";
import {
  cartographieSousSecteursParSecteur,
  collecteTitresPourActivite,
} from "../../src/Services/Simulateur/Transformateurs";
import { AssociationSectorielleActivite } from "../../src/Domaine/Simulateur/ActivitesParSecteurEtSousSecteur";

describe("Questionnaire activités", () => {
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
  it("Retourne le titre du secteur 'Espace' s'il est seul présent dans les données formulaire", () => {
    const donneesFormulaire: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["espace"],
    };
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
    const donneesFormulaire: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["energie"],
      sousSecteurActivite: ["electricite"],
    };
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
    const donneesFormulaire: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["espace", "energie"],
      sousSecteurActivite: ["electricite", "hydrogene"],
    };
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