import { Crm } from "./crm";
import { HttpService } from "@nestjs/axios";
import { CreeInformationsEmailDto } from "./dto/cree-informations-email.dto";

export class CrmBrevo extends Crm {
  constructor(
    private readonly http: HttpService,
    private readonly baseUrl: string,
    private readonly cleApi: string,
  ) {
    super();
  }

  async inscrisUtilisateur(
    inscription: CreeInformationsEmailDto,
  ): Promise<void> {
    await this.http.axiosRef.post(
      `${this.baseUrl}/contacts`,
      {
        email: inscription.email,
        emailBlacklisted: !inscription.accepteInfolettreNis2,
      },
      {
        headers: {
          "api-key": this.cleApi,
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );
  }
}
