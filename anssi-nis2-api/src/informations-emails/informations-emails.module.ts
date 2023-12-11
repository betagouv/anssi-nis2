import { Module } from "@nestjs/common";
import { InformationsEmailsService } from "./informations-emails.service";
import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmail } from "./entities/informations-email.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([InformationsEmail])],
  providers: [InformationsEmailsService],
  controllers: [InformationsEmailsController],
})
export class InformationsEmailsModule {}
