import { Test, TestingModule } from '@nestjs/testing';
import { SimulateurController } from './simulateurController';
import { SimulateurService } from './simulateur.service';
import {
  emptySimulateurFormData,
  SimulateurDepotToken,
} from './Domaine/simulateur';
import { InMemorySimulateurDepot } from './simulateur.depot';

describe('SimulateurController', () => {
  let simulateurController: SimulateurController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SimulateurController],
      providers: [
        SimulateurService,
        { provide: SimulateurDepotToken, useClass: InMemorySimulateurDepot },
      ],
    }).compile();

    simulateurController = app.get<SimulateurController>(SimulateurController);
  });

  describe('root', () => {
    it('should return "OK"', async () => {
      expect(
        await simulateurController.processData(emptySimulateurFormData),
      ).toBe('OK');
    });
  });
});
