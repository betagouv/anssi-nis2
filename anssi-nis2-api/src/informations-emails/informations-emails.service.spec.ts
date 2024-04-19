import { InformationsEmailsService } from "./informations-emails.service";
import { mockInformationsEmailRepository } from "./informations-emails.repository.mock";
import { informationsEmail } from "./example/informations.email.exemples";
import { espereEmailsInformationCorrespondASonDto } from "../test/utilitaires/facilitateurs";
import { InformationsEmail } from "./entities/informations-email.entity";
import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("InformationsEmailsService", () => {
  const testingModuleBuilder = Test.createTestingModule({
    providers: [
      {
        provide: getRepositoryToken(InformationsEmail),
        useValue: mockInformationsEmailRepository,
      },
      InformationsEmailsService,
    ],
  });

  it("ajoute les donnees dans la base mockée", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const srv = mockModule.get<InformationsEmailsService>(
      InformationsEmailsService,
    );
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });
});
