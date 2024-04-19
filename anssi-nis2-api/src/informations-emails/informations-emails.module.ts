import { Module } from "@nestjs/common";
import { InformationsEmailsService } from "./informations-emails.service";
import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmail } from "./entities/informations-email.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Crm } from "./crm";
import { CrmInMemory } from "./crm.InMemory";

@Module({
  imports: [TypeOrmModule.forFeature([InformationsEmail])],
  providers: [
    InformationsEmailsService,
    { provide: Crm, useValue: new CrmInMemory({ activeLeLog: true }) },
  ],
  controllers: [InformationsEmailsController],
})
export class InformationsEmailsModule {}
