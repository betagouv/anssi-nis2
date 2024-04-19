import { Injectable } from "@nestjs/common";
import { CreeInformationsEmailDto } from "./dto/cree-informations-email.dto";

@Injectable()
export abstract class Crm {
  abstract inscrisUtilisateur(
    inscription: CreeInformationsEmailDto,
  ): Promise<void>;
}
