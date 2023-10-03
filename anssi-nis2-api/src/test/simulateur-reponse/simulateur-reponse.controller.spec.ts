import { Test, TestingModule } from "@nestjs/testing";
import { SimulateurReponseController } from "../../simulateur-reponse/simulateur-reponse.controller";
import { emptySimulateurFormData } from "../../Domaine/simulateur";
import { SimulateurReponseService } from "../../simulateur-reponse/simulateur-reponse.service";
import { provideSimulateurRepouseRepositoryKey } from "../../constantes";
import { Repository } from "typeorm";
import { SimulateurReponse } from "../../simulateur-reponse/simulateur-reponse.entity";
import { MockFactory } from "../mock.factory";

describe("SimulateurReponseController", () => {
  let controller: SimulateurReponseController;
  const simulateurReponseJson = JSON.stringify(emptySimulateurFormData);
  const simulateurReponse = {
    ...new SimulateurReponse(),
    reponseJson: simulateurReponseJson,
  };

  beforeEach(async () => {
    const mockSimulateurReponseRepository = {
      ...MockFactory.getMock(Repository<SimulateurReponse>),
      async save() {
        return simulateurReponse;
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulateurReponseController],
      providers: [
        SimulateurReponseService,
        {
          provide: provideSimulateurRepouseRepositoryKey,
          useValue: mockSimulateurReponseRepository,
        },
      ],
    }).compile();

    controller = module.get<SimulateurReponseController>(
      SimulateurReponseController,
    );
  });

  it('should return "OK"', async () => {
    expect(
      await controller.enregistreDonneesSimulateur(emptySimulateurFormData),
    ).toBe(simulateurReponseJson);
  });
});
