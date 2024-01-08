import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IDonneesBrutesFormulaireSimulateur } from "~core/src/Domain/Simulateur/DonneesFormulaire";
import { SimulateurReponse } from "./simulateur-reponse.entity";

@Injectable()
export class SimulateurReponseService {
  constructor(
    @InjectRepository(SimulateurReponse)
    private simulateurReponseRepository: Repository<SimulateurReponse>,
  ) {}

  save(
    reponses: IDonneesBrutesFormulaireSimulateur,
  ): Promise<SimulateurReponse> {
    const simulateurReponse = new SimulateurReponse();
    simulateurReponse.reponseJson = JSON.stringify(reponses);
    return this.simulateurReponseRepository.save(simulateurReponse);
  }

  trouveTout() {
    return this.simulateurReponseRepository.find();
  }
}
