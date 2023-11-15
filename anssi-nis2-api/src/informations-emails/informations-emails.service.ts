import { Inject, Injectable } from "@nestjs/common";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";
import { InformationsEmail } from "./entities/informations-email.entity.ts";
import { provideInformationsEmailRepositoryKey } from "../constantes.ts";
import { Repository } from "typeorm";

@Injectable()
export class InformationsEmailsService {
  constructor(
    @Inject(provideInformationsEmailRepositoryKey)
    private informationsEmailRepository: Repository<InformationsEmail>,
  ) {}

  ajoute(
    createInformationsEmailDto: CreateInformationsEmailDto,
  ): Promise<InformationsEmail> {
    return this.informationsEmailRepository.save(createInformationsEmailDto);
  }
}
