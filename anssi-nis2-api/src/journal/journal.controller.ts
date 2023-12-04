import { Body, Controller, Post } from "@nestjs/common";
import { JournalService } from "./journal.service";
import { SimulateurFormData } from "../Domaine/donneesSimulateur";

@Controller("journal")
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  async trace(@Body() donneesFormulaire: SimulateurFormData): Promise<string> {
    return JSON.stringify(await this.journalService.trace(donneesFormulaire));
  }
}
