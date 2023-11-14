import { Test, TestingModule } from "@nestjs/testing";
import { SimulateurReponseService } from "../../simulateur-reponse/simulateur-reponse.service";
import { Repository } from "typeorm";
import { SimulateurReponse } from "../../simulateur-reponse/simulateur-reponse.entity";
import { provideSimulateurRepouseRepositoryKey } from "../../constantes";
import { donneesSimulateurVide } from "../../Domaine/donneesSimulateur.ts";
import { MockFactory } from "../mock.factory";

describe("SimulateurReponseService", () => {
  let service: SimulateurReponseService;
  const simulateurReponseJson = JSON.stringify(donneesSimulateurVide);
  const simulateurReponse = {
    ...new SimulateurReponse(),
    reponseJson: simulateurReponseJson,
  };

  beforeEach(async () => {
    const mockSimulateurReponseRepository = {
      ...MockFactory.getMock(Repository<SimulateurReponse>),
      save: async () => simulateurReponse,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulateurReponseService,
        {
          provide: provideSimulateurRepouseRepositoryKey,
          useValue: mockSimulateurReponseRepository,
        },
      ],
    }).compile();

    service = module.get<SimulateurReponseService>(SimulateurReponseService);
  });

  it("should call repo", async () => {
    const result = await service.save(donneesSimulateurVide);
    expect(result).toBe(simulateurReponse);
  });
});
