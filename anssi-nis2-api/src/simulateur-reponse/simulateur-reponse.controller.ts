import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { DonneesFormulaireSimulateur } from "~core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions";
import { JournalIntercepteur } from "../journal/journal.intercepteur";
import { SimulateurReponseService } from "./simulateur-reponse.service";

@Controller("simulateur-reponse")
@UseInterceptors(JournalIntercepteur)
export class SimulateurReponseController {
  constructor(
    private readonly simulateurReponseService: SimulateurReponseService,
  ) {}

  @Post()
  async enregistreDonneesSimulateur(
    @Body() formData: DonneesFormulaireSimulateur,
  ): Promise<string> {
    return (await this.simulateurReponseService.save(formData)).reponseJson;
  }
}
