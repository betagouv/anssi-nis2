import { Test } from "@nestjs/testing";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/DonneesFormulaire.definitions";
import { donneesFormulaireSimulateurVide } from "~core/src/Domain/Simulateur/DonneesFormulaire.constantes";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";
import { JournalService } from "./journal.service";
import { fournisseurTestJournalService } from "./journal.service.fournisseur-test";

const attendResultatConforme = (
  result: SegmentsConcernesNis2[],
  donnees: DonneesFormulaireSimulateur,
) => {
  expect(result[0].evenement.type).toBe("resultatTestConcerneNis2");
  expect(result[0].evenement.donnees).toBe(JSON.stringify(donnees));
  expect(result[0].typeStructure).toBe(donnees.typeStructure[0]);
  expect(result[0].trancheChiffreAffaire).toBe(donnees.trancheCA[0]);
  expect(result[0].trancheNombreEmployes).toBe(
    donnees.trancheNombreEmployes[0],
  );
  expect(result[0].secteur).toBe(donnees.secteurActivite[0]);
  expect(result[0].sousSecteur).toBe(donnees.sousSecteurActivite[0]);
};

const attendNResultats =
  (n: number) =>
  <O extends object>(actual: O) => {
    for (let i = 0; i < n; i++) {
      expect(actual[`${i}`]).toBeDefined();
    }
    expect(actual[`${n}`]).not.toBeDefined();
  };
describe("JournalService", () => {
  const constructeurJournalModuleTest = Test.createTestingModule({
    providers: [fournisseurTestJournalService],
  });
  beforeEach(() => jest.clearAllMocks());

  it("Insère un résultat simple", async () => {
    const mockModule = await constructeurJournalModuleTest.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["eauPotable"],
      typeStructure: ["privee"],
      trancheNombreEmployes: ["grand"],
      trancheCA: ["grand"],
    };

    const result = await service.trace(donnees);

    attendNResultats(1)(result);

    attendResultatConforme(result, donnees);
  });
  it("Insère un résultat avec sous-secteur", async () => {
    const mockModule = await constructeurJournalModuleTest.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["energie"],
      sousSecteurActivite: ["hydrogene"],
      typeStructure: ["privee"],
      trancheNombreEmployes: ["grand"],
      trancheCA: ["grand"],
    };

    const result = await service.trace(donnees);

    attendNResultats(1)(result);
    attendResultatConforme(result, donnees);
  });
  it("Insère un résultat avec plusieurs secteurs", async () => {
    const mockModule = await constructeurJournalModuleTest.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["eauxUsees", "eauPotable"],
      typeStructure: ["privee"],
      trancheNombreEmployes: ["grand"],
      trancheCA: ["grand"],
    };

    const result = await service.trace(donnees);

    attendNResultats(2)(result);
    attendResultatConforme(result, donnees);
    expect(result[1].secteur).toBe(donnees.secteurActivite[1]);
  });
  it("Insère un résultat avec plusieurs sous-secteurs", async () => {
    const mockModule = await constructeurJournalModuleTest.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["energie"],
      sousSecteurActivite: ["hydrogene", "electricite"],
      typeStructure: ["privee"],
      trancheNombreEmployes: ["grand"],
      trancheCA: ["grand"],
    };

    const result = await service.trace(donnees);

    attendNResultats(2)(result);

    attendResultatConforme(result, donnees);
    expect(result[1].secteur).toBe(donnees.secteurActivite[0]);
    expect(result[1].sousSecteur).toBe(donnees.sousSecteurActivite[1]);
  });
  it("Insère un résultat avec plusieurs secteurs et sous-secteurs", async () => {
    const mockModule = await constructeurJournalModuleTest.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: DonneesFormulaireSimulateur = {
      ...donneesFormulaireSimulateurVide,
      secteurActivite: ["eauxUsees", "energie", "transports"],
      sousSecteurActivite: [
        "hydrogene",
        "electricite",
        "autreSousSecteurTransport",
      ],
      typeStructure: ["privee"],
      trancheNombreEmployes: ["grand"],
      trancheCA: ["grand"],
    };

    const result = await service.trace(donnees);

    // attendNResultats(4)(result);

    const prototypeAttendu = {
      evenement: result[0].evenement,
      evenementId: result[0].evenementId,
      id: result[0].id,
      trancheChiffreAffaire: result[0].trancheChiffreAffaire,
      trancheNombreEmployes: result[0].trancheNombreEmployes,
      typeStructure: result[0].typeStructure,
      secteur: result[0].secteur,
      sousSecteur: result[0].sousSecteur,
    };
    expect(result).toContainValue({
      ...prototypeAttendu,
      secteur: donnees.secteurActivite[0],
      sousSecteur: undefined,
    });
    expect(result).toContainValue({
      ...prototypeAttendu,
      secteur: donnees.secteurActivite[1],
      sousSecteur: donnees.sousSecteurActivite[0],
    });
    expect(result).toContainValue({
      ...prototypeAttendu,
      secteur: donnees.secteurActivite[1],
      sousSecteur: donnees.sousSecteurActivite[1],
    });
    expect(result).toContainValue({
      ...prototypeAttendu,
      secteur: donnees.secteurActivite[2],
      sousSecteur: donnees.sousSecteurActivite[2],
    });
  });
});
