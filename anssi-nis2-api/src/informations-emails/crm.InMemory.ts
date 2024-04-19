import { Crm } from "./crm";

export class CrmInMemory extends Crm {
  public inscrits: string[] = [];
  private readonly avecLog: boolean;

  constructor({ activeLeLog }: { activeLeLog: boolean }) {
    super();
    this.avecLog = activeLeLog;
  }

  async inscrisUtilisateur(email: string): Promise<void> {
    if (this.avecLog) console.log(`[CRM In-Memory] Nouvel inscrit : ${email}`);

    this.inscrits.push(email);
  }
}
