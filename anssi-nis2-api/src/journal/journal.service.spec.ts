import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Evenements } from "./entites/evenements.entite-journal";
import { fabriqueMockRepository } from "../test/utilitaires/facilitateurs";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { CreeEvenementsJournalDto } from "./dto/creeEvenementsJournalDto";
import { JournalService } from "./journal.service";
import { donneesSimulateurVide } from "../Domaine/donneesSimulateur";
import { SegmentsConcernesNis2 } from "./entites/segments-concernes-nis2.entite-journal";
import { CreeConcerneNis2Dto } from "./dto/creeConcerneNis2Dto";
import { DataSource, Repository } from "typeorm";

const attendResultatConforme = (
  result,
  donnees: IDonneesBrutesFormulaireSimulateur,
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

describe("JournalService", () => {
  const testingModuleBuilder = Test.createTestingModule({
    providers: [
      {
        provide: getRepositoryToken(Evenements, "connexionJournal"),
        useValue: fabriqueMockRepository({
          save: async (evenementsJournalDto: CreeEvenementsJournalDto) => ({
            ...evenementsJournalDto,
            id: 1,
            date: Date.now(),
          }),
        }),
      },
      {
        provide: getRepositoryToken(SegmentsConcernesNis2, "connexionJournal"),
        useValue: fabriqueMockRepository({
          save: async (creeConcerneNis2Dto: CreeConcerneNis2Dto) => ({
            ...creeConcerneNis2Dto,
            id: 1,
          }),
        }),
      },
      {
        provide: JournalService,
        useFactory: (connexionJournal: DataSource) =>
          new JournalService(
            connexionJournal,
            fabriqueMockRepository<CreeEvenementsJournalDto, Evenements>({
              save: async (
                evenementsJournalDto: CreeEvenementsJournalDto,
              ): Promise<Evenements> => ({
                ...evenementsJournalDto,
                id: 1,
                date: new Date(Date.now()),
              }),
            }) as unknown as Repository<Evenements>,
            fabriqueMockRepository<CreeConcerneNis2Dto, SegmentsConcernesNis2>({
              save: async (
                creeConcerneNis2Dto: CreeConcerneNis2Dto,
              ): Promise<SegmentsConcernesNis2> => ({
                ...creeConcerneNis2Dto,
                id: 1,
                evenementId: creeConcerneNis2Dto.evenement.id,
              }),
            }) as unknown as Repository<SegmentsConcernesNis2>,
          ),
      },
    ],
  });
  it("Insère un résultat simple", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: IDonneesBrutesFormulaireSimulateur = {
      ...donneesSimulateurVide,
      secteurActivite: ["eauPotable"],
      typeStructure: ["privee"],
      trancheNombreEmployes: ["grand"],
      trancheCA: ["grand"],
    };

    const result = await service.trace(donnees);

    expect(result.length).toBe(1);
    attendResultatConforme(result, donnees);
    expect(result[0].sousSecteur).not.toBeDefined();
  });
  it("Insère un résultat avec sous-secteur", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: IDonneesBrutesFormulaireSimulateur = {
      ...donneesSimulateurVide,
      secteurActivite: ["energie"],
      sousSecteurActivite: ["hydrogene"],
      typeStructure: ["privee"],
      trancheNombreEmployes: ["grand"],
      trancheCA: ["grand"],
    };

    const result = await service.trace(donnees);

    expect(result.length).toBe(1);
    attendResultatConforme(result, donnees);
  });
  it("Insère un résultat avec plusieurs secteurs", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: IDonneesBrutesFormulaireSimulateur = {
      ...donneesSimulateurVide,
      secteurActivite: ["eauxUsees", "eauPotable"],
      typeStructure: ["privee"],
      trancheNombreEmployes: ["grand"],
      trancheCA: ["grand"],
    };

    const result = await service.trace(donnees);

    expect(result.length).toBe(2);
    attendResultatConforme(result, donnees);
    expect(result[1].secteur).toBe(donnees.secteurActivite[1]);
  });
  it("Insère un résultat avec plusieurs sous-secteurs", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: IDonneesBrutesFormulaireSimulateur = {
      ...donneesSimulateurVide,
      secteurActivite: ["energie"],
      sousSecteurActivite: ["hydrogene", "electricite"],
      typeStructure: ["privee"],
      trancheNombreEmployes: ["grand"],
      trancheCA: ["grand"],
    };

    const result = await service.trace(donnees);

    expect(result.length).toBe(2);
    attendResultatConforme(result, donnees);
    expect(result[1].secteur).toBe(donnees.secteurActivite[0]);
    expect(result[1].sousSecteur).toBe(donnees.sousSecteurActivite[1]);
  });
  it("Insère un résultat avec plusieurs secteurs et sous-secteurs", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const service = mockModule.get<JournalService>(JournalService);
    const donnees: IDonneesBrutesFormulaireSimulateur = {
      ...donneesSimulateurVide,
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

    expect(result.length).toBe(4);
    expect(result[0].secteur).toBe(donnees.secteurActivite[0]);
    expect(result[0].sousSecteur).toBe(undefined);
    expect(result[1].secteur).toBe(donnees.secteurActivite[1]);
    expect(result[1].sousSecteur).toBe(donnees.sousSecteurActivite[0]);
    expect(result[2].secteur).toBe(donnees.secteurActivite[1]);
    expect(result[2].sousSecteur).toBe(donnees.sousSecteurActivite[1]);
    expect(result[3].secteur).toBe(donnees.secteurActivite[2]);
    expect(result[3].sousSecteur).toBe(donnees.sousSecteurActivite[2]);
  });
});
