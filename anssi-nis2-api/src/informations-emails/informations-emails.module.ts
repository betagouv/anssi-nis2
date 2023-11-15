import { Module } from "@nestjs/common";
import { InformationsEmailsService } from "./informations-emails.service";
import { InformationsEmailsController } from "./informations-emails.controller";
import { informationsEmailsProviders } from "./informations-emails.providers.ts";

@Module({
  controllers: [InformationsEmailsController],
  providers: [...informationsEmailsProviders, InformationsEmailsService],
})
export class InformationsEmailsModule {}
