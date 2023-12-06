import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { JournalService } from "./journal.service";
import { IDonneesBrutesFormulaireSimulateur } from "~core/Simulateur/DonneesFormulaire";

@Controller("journal")
@Injectable()
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  async trace(
    @Body() donneesFormulaire: IDonneesBrutesFormulaireSimulateur,
  ): Promise<string> {
    return JSON.stringify(await this.journalService.trace(donneesFormulaire));
  }
}
