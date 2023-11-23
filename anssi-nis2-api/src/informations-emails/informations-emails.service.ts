import { Injectable } from "@nestjs/common";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";
import { InformationsEmail } from "./entities/informations-email.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class InformationsEmailsService {
  constructor(
    @InjectRepository(InformationsEmail)
    private informationsEmailRepository: Repository<InformationsEmail>,
  ) {}

  ajoute(
    createInformationsEmailDto: CreateInformationsEmailDto,
  ): Promise<InformationsEmail> {
    return this.informationsEmailRepository.save(createInformationsEmailDto);
  }
}
