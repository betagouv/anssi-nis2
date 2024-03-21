import { Controller, Post, Body } from "@nestjs/common";
import { InformationsEmailsService } from "./informations-emails.service";
import { CreeInformationsEmailDto } from "./dto/cree-informations-email.dto";

@Controller("informations-emails")
export class InformationsEmailsController {
  constructor(
    private readonly informationsEmailsService: InformationsEmailsService,
  ) {}

  @Post()
  async ajoute(@Body() creeInformationsEmailDto: CreeInformationsEmailDto) {
    return this.informationsEmailsService.ajoute(creeInformationsEmailDto);
  }
}
