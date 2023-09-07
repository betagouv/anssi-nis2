import { Test, TestingModule } from '@nestjs/testing';
import { SimulateurReponseService } from './simulateur-reponse.service';

describe('SimulateurReponseService', () => {
  let service: SimulateurReponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimulateurReponseService],
    }).compile();

    service = module.get<SimulateurReponseService>(SimulateurReponseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
