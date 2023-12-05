import { Injectable } from "@nestjs/common";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";
import { InformationsEmail } from "./entities/informations-email.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { validateOrReject } from "class-validator";

@Injectable()
export class InformationsEmailsService {
  constructor(
    @InjectRepository(InformationsEmail)
    private informationsEmailRepository: Repository<InformationsEmail>,
  ) {}

  async ajoute(
    createInformationsEmailDto: CreateInformationsEmailDto,
  ): Promise<InformationsEmail> {
    await validateOrReject(
      new CreateInformationsEmailDto(createInformationsEmailDto),
    ).catch((err) => {
      throw new Error(err);
    });
    return this.informationsEmailRepository.save(createInformationsEmailDto);
  }
}
