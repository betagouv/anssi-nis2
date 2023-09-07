import { Inject, Injectable, ResponseDecoratorOptions } from '@nestjs/common';
import { SimulateurReponse } from './simulateur-reponse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SimulateurFormData } from '../Domaine/simulateur';
import { provideSimulateurRepouseRepositoryKey } from '../constantes';

@Injectable()
export class SimulateurReponseService {
  constructor(
    @Inject(provideSimulateurRepouseRepositoryKey)
    private simulateurReponseRepository: Repository<SimulateurReponse>,
  ) {}

  save(reponses: SimulateurFormData): Promise<SimulateurReponse> {
    let simulateurReponse = new SimulateurReponse();
    simulateurReponse.reponseJson = JSON.stringify(reponses);
    return this.simulateurReponseRepository.save(simulateurReponse);
  }

  trouveTout() {
    return this.simulateurReponseRepository.find();
  }
}
