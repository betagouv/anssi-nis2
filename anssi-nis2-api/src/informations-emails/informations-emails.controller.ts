import { Controller, Post, Body, Logger } from "@nestjs/common";
import { InformationsEmailsService } from "./informations-emails.service";
import { CreeInformationsEmailDto } from "./dto/cree-informations-email.dto";

@Controller("informations-emails")
export class InformationsEmailsController {
  private readonly logger = new Logger(InformationsEmailsController.name);

  constructor(
    private readonly informationsEmailsService: InformationsEmailsService,
  ) {}

  @Post()
  ajoute(@Body() creeInformationsEmailDto: CreeInformationsEmailDto) {
    this.logger.log(creeInformationsEmailDto);
    return this.informationsEmailsService.ajoute(creeInformationsEmailDto);
  }
}
