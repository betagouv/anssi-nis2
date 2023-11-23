import { Test, TestingModule } from "@nestjs/testing";
import { InformationsEmailsController } from "./informations-emails.controller";
import { InformationsEmailsService } from "./informations-emails.service";
import { datasourceKey } from "../constantes";
import { mockInformationsEmailRepository } from "./fabrique-mock.repository";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";
import { espereEmailsInformationCorrespondASonDto } from "./helpers/testHelpers";

describe("InformationsEmailsController", () => {
  let controller: InformationsEmailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InformationsEmailsController],
      providers: [
        InformationsEmailsService,
        {
          provide: datasourceKey,
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
