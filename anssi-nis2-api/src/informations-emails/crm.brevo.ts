import { Crm } from "./crm";
import { HttpService } from "@nestjs/axios";

export class CrmBrevo extends Crm {
  constructor(
    private readonly http: HttpService,
    private readonly baseUrl: string,
    private readonly cleApi: string,
  ) {
    super();
  }

  async inscrisUtilisateur(email: string): Promise<void> {
    await this.http.axiosRef.post(
      `${this.baseUrl}/contacts`,
      { email },
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
