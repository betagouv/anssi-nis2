import { Module } from "@nestjs/common";
import { InformationsEmailsService } from "./informations-emails.service";
import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmail } from "./entities/informations-email.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Crm } from "./crm";
import { CrmBrevo } from "./crm.brevo";
import { HttpModule, HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [TypeOrmModule.forFeature([InformationsEmail]), HttpModule],
  providers: [
    InformationsEmailsService,
    {
      provide: Crm,
      inject: [ConfigService, HttpService],
      useFactory: (config: ConfigService, http: HttpService) =>
        new CrmBrevo(
          http,
          config.get("BREVO_API_BASE_URL"),
          config.get("BREVO_CLE_API"),
        ),
    },
  ],
  controllers: [InformationsEmailsController],
})
export class InformationsEmailsModule {}
