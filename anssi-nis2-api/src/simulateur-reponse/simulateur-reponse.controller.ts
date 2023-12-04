import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { SimulateurFormData } from "../Domaine/donneesSimulateur";
import { SimulateurReponseService } from "./simulateur-reponse.service";
import { SimulateurReponse } from "./simulateur-reponse.entity";
import { JournalIntercepteur } from "../journal/journal.intercepteur";

@Controller("simulateur-reponse")
@UseInterceptors(JournalIntercepteur)
export class SimulateurReponseController {
  constructor(
    private readonly simulateurReponseService: SimulateurReponseService,
  ) {}

  @Post()
  async enregistreDonneesSimulateur(
    @Body() formData: SimulateurFormData,
  ): Promise<string> {
    return (await this.simulateurReponseService.save(formData)).reponseJson;
  }

  @Get()
  trouveTout(): Promise<SimulateurReponse[]> {
    return this.simulateurReponseService.trouveTout();
  }
}
