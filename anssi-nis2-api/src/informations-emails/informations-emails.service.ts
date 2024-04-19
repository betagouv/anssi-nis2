import { Inject, Injectable, Logger } from "@nestjs/common";
import { CreeInformationsEmailDto } from "./dto/cree-informations-email.dto";
import { InformationsEmail } from "./entities/informations-email.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Crm } from "./crm";

@Injectable()
export class InformationsEmailsService {
  private readonly logger = new Logger("InformationsEmailsService");

  constructor(
    @InjectRepository(InformationsEmail)
    private informationsEmailRepository: Repository<InformationsEmail>,
    @Inject(Crm)
    private crm: Crm,
  ) {}

  async ajoute(
    inscription: CreeInformationsEmailDto,
  ): Promise<InformationsEmail> {
    this.logger.debug(`Ajout d'un email : ${JSON.stringify(inscription)}`);

    const infos = await this.informationsEmailRepository.save(inscription);

    await this.crm.inscrisUtilisateur(inscription);

    return infos;
  }
}
