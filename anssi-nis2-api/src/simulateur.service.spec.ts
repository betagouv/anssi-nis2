import { Test, TestingModule } from '@nestjs/testing';
import { SimulateurService } from './simulateur.service';
import {
  emptySimulateurFormData,
  SimulateurRepository,
  SimulateurDepotToken,
} from './Domaine/simulateur';
import { InMemorySimulateurDepot } from './simulateur.depot';

describe('SimulateurService', () => {
  let simulateurService: SimulateurService;
  let simulateurDepot: SimulateurRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulateurService,
        { provide: SimulateurDepotToken, useClass: InMemorySimulateurDepot },
      ],
    }).compile();

    simulateurService = module.get<SimulateurService>(SimulateurService);
    simulateurDepot = module.get<SimulateurRepository>(SimulateurDepotToken);
  });

  it('should return all users', async () => {
    const spyOnSave = jest.spyOn(simulateurDepot, 'save');
    const ok = await simulateurService.processData(emptySimulateurFormData);

    expect(spyOnSave).toHaveBeenCalledWith(emptySimulateurFormData);

    expect(ok).toBe('OK');
  });
});
