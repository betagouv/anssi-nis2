import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { IDonneesBrutesFormulaireSimulateur } from "~core/src/Domain/Simulateur/DonneesFormulaire";
import { JournalIntercepteur } from "../journal/journal.intercepteur";
import { SimulateurReponse } from "./simulateur-reponse.entity";
import { SimulateurReponseService } from "./simulateur-reponse.service";

@Controller("simulateur-reponse")
@UseInterceptors(JournalIntercepteur)
export class SimulateurReponseController {
  constructor(
    private readonly simulateurReponseService: SimulateurReponseService,
  ) {}

  @Post()
  async enregistreDonneesSimulateur(
    @Body() formData: IDonneesBrutesFormulaireSimulateur,
  ): Promise<string> {
    return (await this.simulateurReponseService.save(formData)).reponseJson;
  }

  @Get()
  trouveTout(): Promise<SimulateurReponse[]> {
    return this.simulateurReponseService.trouveTout();
  }
}
