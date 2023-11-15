import { Test, TestingModule } from "@nestjs/testing";
import { InformationsEmailsService } from "./informations-emails.service";
import { InformationsEmail } from "./entities/informations-email.entity.ts";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto.ts";
import { MockFactory } from "../test/mock.factory.ts";
import { Repository } from "typeorm";
import { provideInformationsEmailRepositoryKey } from "../constantes.ts";

describe("InformationsEmailsService", () => {
  let service: InformationsEmailsService;

  beforeEach(async () => {
    const mockInformationsEmailRepository = {
      ...MockFactory.getMock(Repository<InformationsEmail>),
      save: async (createInformationsEmailDto: CreateInformationsEmailDto) =>
        createInformationsEmailDto,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InformationsEmailsService,
        {
          provide: provideInformationsEmailRepositoryKey,
          useValue: mockInformationsEmailRepository,
        },
      ],
    }).compile();

    service = module.get<InformationsEmailsService>(InformationsEmailsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("ajoute les donnees dans la base", async () => {
    const informationsEmail: CreateInformationsEmailDto = {
      email: "toto@titi.tutu",
      accepteInfolettreNis2: true,
      accepteInfolettreServicesDedies: true,
      nomOrganisation: "Titi International",
    };
    const reponse = await service.ajoute(informationsEmail);

    expect(reponse).toBe(informationsEmail);
  });
});
