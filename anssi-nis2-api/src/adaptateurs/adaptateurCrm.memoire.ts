import { AdaptateurCrm } from "./adaptateurCrm";
import { CreeInformationsEmailDto } from "../informations-emails/dto/cree-informations-email.dto";

export class AdaptateurCrmMemoire implements AdaptateurCrm {
  private readonly inscrits: CreeInformationsEmailDto[] = [];

  async inscrisUtilisateur(inscription: CreeInformationsEmailDto) {
    this.inscrits.push(inscription);
  }
}
