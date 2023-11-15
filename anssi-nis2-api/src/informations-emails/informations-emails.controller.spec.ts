import { Test, TestingModule } from "@nestjs/testing";
import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmailsService } from "./informations-emails.service";
import { MockFactory } from "../test/mock.factory.ts";
import { Repository } from "typeorm";
import { InformationsEmail } from "./entities/informations-email.entity.ts";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto.ts";
import { provideInformationsEmailRepositoryKey } from "../constantes.ts";

describe("InformationsEmailsController", () => {
  let controller: InformationsEmailsController;

  beforeEach(async () => {
    const mockInformationsEmailRepository = {
      ...MockFactory.getMock(Repository<InformationsEmail>),
      save: async (createInformationsEmailDto: CreateInformationsEmailDto) =>
        createInformationsEmailDto,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformationsEmailsController],
      providers: [
        InformationsEmailsService,
        {
          provide: provideInformationsEmailRepositoryKey,
          useValue: mockInformationsEmailRepository,
        },
      ],
    }).compile();

    controller = module.get<InformationsEmailsController>(
      InformationsEmailsController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
