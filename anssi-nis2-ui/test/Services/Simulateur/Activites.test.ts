import { describe, it, expect } from "vitest";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../../src/Services/Simulateur/donneesFormulaire";
import { libellesSecteursActivite } from "../../../src/Domaine/Simulateur/LibellesSecteursActivite";
import {
  TValeursSecteursActivites,
  TValeursSousSecteursActivites,
} from "../../../src/Domaine/Simulateur/ValeursCles";
import {
  secteurParSousSecteur,
  sousSecteursParSecteur,
} from "../../../src/Domaine/Simulateur/SecteursActivite";

const collecteTitresPourActivite = (
  libellesSecteursActivite: Record<TValeursSecteursActivites, string>,
  donneesFormulaire: DonneesFormulaireSimulateur,
): string[] => {
  const collecteSousSecteurActivite = (
    sousSecteur: TValeursSousSecteursActivites,
  ) =>
    libellesSecteursActivite[secteurParSousSecteur[sousSecteur]] +
    " / " +
    libellesSecteursActivite[sousSecteur];
  const collecteSecteurActivite = (secteur: TValeursSecteursActivites) =>
    libellesSecteursActivite[secteur];

  return donneesFormulaire.secteurActivite.map(collecteSecteurActivite);
};

const cartographieSousSecteursParSecteur = (
  donneesFormulaire: DonneesFormulaireSimulateur,
): Partial<
  Record<TValeursSecteursActivites, TValeursSousSecteursActivites[]>
> => {
  const { secteurActivite, sousSecteurActivite } = donneesFormulaire;

  const secteursStructures = secteurActivite
    .filter((secteur) => !Object.keys(sousSecteursParSecteur).includes(secteur))
    .reduce((acc, currentValue) => ({ ...acc, [currentValue]: [] }), {});

  const sousSecteursStructures: Partial<
    Record<TValeursSecteursActivites, TValeursSousSecteursActivites[]>
  > = secteurActivite
    .filter((secteur) => Object.keys(sousSecteursParSecteur).includes(secteur))
    .reduce(
      (acc, currentValue) => ({
        ...acc,
        [currentValue]: sousSecteurActivite.filter((sousSecteur) =>
          sousSecteursParSecteur[currentValue].includes(sousSecteur),
        ),
      }),
      {},
    );

  return { ...secteursStructures, ...sousSecteursStructures };
};

describe("Questionnaire activités", () => {
  it("Retourne le titre du secteur 'Espace' s'il est seul présent dans les données formulaire", () => {
    const donneesFormulaire: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["espace"],
    };
    const titresAttendus = ["Espace"];
    const titresExtraits: string[] = collecteTitresPourActivite(
      libellesSecteursActivite,
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
  // it("Retourne le titre du secteur 'Énergie / Électricité' si seul le sous secteur 'Électricité' est présent dans les données formulaire", () => {
  //   const donneesFormulaire: DonneesFormulaireSimulateur = {
  //     ...donneesFormulaireSimulateurVide,
  //     secteurActivite: ["energie"],
  //     sousSecteurActivite: ["electricite"],
  //   };
  //   const titresAttendus = ["Énergie / Électricité"];
  //   const titresExtraits: string[] = collecteTitresPourActivite(
  //     libellesSecteursActivite,
  //     donneesFormulaire,
  //   );
  //
  //   expect(titresExtraits).toStrictEqual(titresAttendus);
  // });
});
