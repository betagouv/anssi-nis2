import { Inject, Injectable } from "@nestjs/common";
import { SimulateurReponse } from "./simulateur-reponse.entity";
import { Repository } from "typeorm";
import { SimulateurFormData } from "../Domaine/donneesSimulateur";
import { provideSimulateurReponseRepositoryKey } from "../constantes";

@Injectable()
export class SimulateurReponseService {
  constructor(
    @Inject(provideSimulateurReponseRepositoryKey)
    private simulateurReponseRepository: Repository<SimulateurReponse>,
  ) {}

  save(reponses: SimulateurFormData): Promise<SimulateurReponse> {
    const simulateurReponse = new SimulateurReponse();
    simulateurReponse.reponseJson = JSON.stringify(reponses);
    return this.simulateurReponseRepository.save(simulateurReponse);
  }

  trouveTout() {
    return this.simulateurReponseRepository.find();
  }
}
