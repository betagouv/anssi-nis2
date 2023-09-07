import { Test, TestingModule } from '@nestjs/testing';
import { SimulateurReponseController } from './simulateur-reponse.controller';
import { emptySimulateurFormData } from '../Domaine/simulateur';
import { SimulateurReponseService } from './simulateur-reponse.service';
import { provideSimulateurRepouseRepositoryKey } from '../constantes';
import { Repository } from 'typeorm';
import { SimulateurReponse } from './simulateur-reponse.entity';
import { MockFactory } from '../test/mock.factory';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

describe('SimulateurReponseController', () => {
  let controller: SimulateurReponseController;
  const simulateurReponseJson = JSON.stringify(emptySimulateurFormData);
  const simulateurReponse = {
    ...new SimulateurReponse(),
    reponseJson: simulateurReponseJson,
  };

  beforeEach(async () => {
    let mockSimulateurReponseRepository = {
      ...MockFactory.getMock(Repository<SimulateurReponse>),
      save: async () => simulateurReponse,
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
