import { Crm } from "./crm";
import { CreeInformationsEmailDto } from "./dto/cree-informations-email.dto";

export class CrmInMemory extends Crm {
  public inscrits: string[] = [];
  private readonly avecLog: boolean;

  constructor({ activeLeLog }: { activeLeLog: boolean }) {
    super();
    this.avecLog = activeLeLog;
  }

  async inscrisUtilisateur(
    inscription: CreeInformationsEmailDto,
  ): Promise<void> {
    const { email } = inscription;

    if (this.avecLog) console.log(`[CRM In-Memory] Nouvel inscrit : ${email}`);

    this.inscrits.push(email);
  }
}
