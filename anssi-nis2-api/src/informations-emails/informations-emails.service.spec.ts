import { InformationsEmailsService } from "./informations-emails.service";
import { datasourceKey } from "../constantes";
import { mockInformationsEmailRepository } from "./fabrique-mock.repository";
import { espereEmailsInformationCorrespondASonDto } from "./helpers/testHelpers";
import { databaseProviders } from "../database/database.providers";
import { informationsEmail } from "./example/informations.email.exemples";
import {
  fabriqueConstructeurTestModule,
  serviceConfigurationPourTests,
} from "../test/utilitaires/facilitateurs";
import { InformationsEmail } from "./entities/informations-email.entity";

describe("InformationsEmailsService", () => {
  const testingModuleBuilder = fabriqueConstructeurTestModule(
    [
      {
        provide: datasourceKey,
        useValue: mockInformationsEmailRepository,
      },
      InformationsEmailsService,
    ],
    [InformationsEmail],
  );

  it("ajoute les donnees dans la base mockée", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const srv = mockModule.get<InformationsEmailsService>(
      InformationsEmailsService,
    );
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });
});

describe.skip("InformationsEmailsService sur vraie DB", () => {
  const testingModuleBuilder = fabriqueConstructeurTestModule(
    [
      ...databaseProviders,
      serviceConfigurationPourTests,
      InformationsEmailsService,
    ],
    [InformationsEmail],
  );

  it("ajoute les donnees dans la base réelle", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const srv = mockModule.get<InformationsEmailsService>(
      InformationsEmailsService,
    );
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });
});
