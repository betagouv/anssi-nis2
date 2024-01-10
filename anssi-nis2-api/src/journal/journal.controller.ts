import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { DonneesFormulaireSimulateur } from "anssi-nis2-core/src/Domain/Simulateur/DonneesFormulaire";
import { JournalService } from "./journal.service";

@Controller("journal")
@Injectable()
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  async trace(
    @Body() donneesFormulaire: DonneesFormulaireSimulateur,
  ): Promise<string> {
    return JSON.stringify(await this.journalService.trace(donneesFormulaire));
  }
}
