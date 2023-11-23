import { Module } from "@nestjs/common";
import { InformationsEmailsService } from "./informations-emails.service";
import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmail } from "./entities/informations-email.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseProviders } from "../database/database.providers";

@Module({
  imports: [TypeOrmModule.forFeature([InformationsEmail])],
  providers: [...databaseProviders, InformationsEmailsService],
  controllers: [InformationsEmailsController],
})
export class InformationsEmailsModule {}
