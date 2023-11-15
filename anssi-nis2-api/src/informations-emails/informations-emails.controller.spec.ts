import { Test, TestingModule } from "@nestjs/testing";
import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmailsService } from "./informations-emails.service";
import { provideInformationsEmailRepositoryKey } from "../constantes.ts";
import { mockInformationsEmailRepository } from "./fabrique-mock.repository.ts";

describe("InformationsEmailsController", () => {
  let controller: InformationsEmailsController;

  beforeEach(async () => {
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
