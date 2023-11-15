import { Test, TestingModule } from "@nestjs/testing";
import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmailsService } from "./informations-emails.service";
import { provideInformationsEmailRepositoryKey } from "../constantes.ts";
import { mockInformationsEmailRepository } from "./fabrique-mock.repository.ts";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto.ts";
import { espereEmailsInformationCorrespondASonDto } from "./helpers/testHelpers.ts";

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

  it("doit retourner l'identifiant", async () => {
    const informationsEmail: CreateInformationsEmailDto = {
      email: "toto@titi.tutu",
      accepteInfolettreNis2: true,
      accepteInfolettreServicesDedies: true,
      nomOrganisation: "Titi International",
    };
    const valeurAjoutee = await controller.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(valeurAjoutee, informationsEmail);
  });
});
