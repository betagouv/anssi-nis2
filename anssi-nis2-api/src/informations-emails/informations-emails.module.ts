import { Module } from "@nestjs/common";
import { InformationsEmailsService } from "./informations-emails.service";
import { InformationsEmailsController } from "./informations-emails.controller";
import { informationsEmailsProviders } from "./informations-emails.providers.ts";
import { DatabaseModule } from "../database/database.module.ts";

@Module({
  imports: [DatabaseModule],
  providers: [...informationsEmailsProviders, InformationsEmailsService],
  controllers: [InformationsEmailsController],
})
export class InformationsEmailsModule {}
