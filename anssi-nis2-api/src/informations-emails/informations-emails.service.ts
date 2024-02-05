import { Injectable } from "@nestjs/common";
import { CreeInformationsEmailDto } from "./dto/cree-informations-email.dto";
import { InformationsEmail } from "./entities/informations-email.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class InformationsEmailsService {
  constructor(
    @InjectRepository(InformationsEmail)
    private informationsEmailRepository: Repository<InformationsEmail>,
  ) {}

  async ajoute(
    creeInformationsEmailDto: CreeInformationsEmailDto,
  ): Promise<InformationsEmail> {
    return this.informationsEmailRepository.save(creeInformationsEmailDto);
  }
}
