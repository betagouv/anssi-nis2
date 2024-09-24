import { CreeInformationsEmailDto } from "../informations-emails/dto/cree-informations-email.dto";
import { AdaptateurCrm } from "./adaptateurCrm";

export class AdaptateurCrmBrevo implements AdaptateurCrm {
  constructor(private readonly baseUrl: URL, private readonly cleApi: string) {}

  async inscrisUtilisateur(inscription: CreeInformationsEmailDto) {
    await fetch(`${this.baseUrl}/contacts`, {
      method: "POST",
      headers: {
        "api-key": this.cleApi,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: inscription.email,
        emailBlacklisted: !inscription.accepteInfolettreNis2,
        attributes: { ORGANISATION: inscription.nomOrganisation },
      }),
    });
  }
}
