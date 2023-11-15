import { Controller, Post, Body } from "@nestjs/common";
import { InformationsEmailsService } from "./informations-emails.service";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";

@Controller("informations-emails")
export class InformationsEmailsController {
  constructor(
    private readonly informationsEmailsService: InformationsEmailsService,
  ) {}

  @Post()
  ajoute(@Body() createInformationsEmailDto: CreateInformationsEmailDto) {
    return this.informationsEmailsService.ajoute(createInformationsEmailDto);
  }
}
