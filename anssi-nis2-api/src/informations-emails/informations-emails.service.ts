import { Injectable, Logger } from "@nestjs/common";
import { CreeInformationsEmailDto } from "./dto/cree-informations-email.dto";
import { InformationsEmail } from "./entities/informations-email.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class InformationsEmailsService {
  private readonly logger = new Logger("InformationsEmailsService");

  constructor(
    @InjectRepository(InformationsEmail)
    private informationsEmailRepository: Repository<InformationsEmail>,
  ) {}

  async ajoute(
    creeInformationsEmailDto: CreeInformationsEmailDto,
  ): Promise<InformationsEmail> {
    this.logger.debug(
      `Ajout d'un email : ${JSON.stringify(creeInformationsEmailDto)}`,
    );
    return this.informationsEmailRepository.save(creeInformationsEmailDto);
  }
}
