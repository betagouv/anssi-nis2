import { Test, TestingModule } from '@nestjs/testing';
import { SimulateurReponseController } from './simulateur-reponse.controller';

describe('SimulateurReponseController', () => {
  let controller: SimulateurReponseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulateurReponseController],
    }).compile();

    controller = module.get<SimulateurReponseController>(SimulateurReponseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
