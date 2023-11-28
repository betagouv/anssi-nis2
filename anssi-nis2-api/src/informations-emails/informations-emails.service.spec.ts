import { InformationsEmailsService } from "./informations-emails.service";
import { mockInformationsEmailRepository } from "../test/fabrique-mock.repository";
import { informationsEmail } from "./example/informations.email.exemples";
import {
  espereEmailsInformationCorrespondASonDto,
  serviceConfigurationPourTests,
} from "../test/utilitaires/facilitateurs";
import { InformationsEmail } from "./entities/informations-email.entity";
import { Test } from "@nestjs/testing";
import { TypeOrmModule, getRepositoryToken } from "@nestjs/typeorm";
import { fabriqueAsynchroneOptionsTypeOrm } from "../Fabriques/fabriqueAsynchroneOptionsTypeOrm";
import { ConfigModule } from "@nestjs/config";

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

describe.skip("InformationsEmailsService sur vraie DB", () => {
  const testingModuleBuilder = Test.createTestingModule({
    controllers: [],
    imports: [
      TypeOrmModule.forRootAsync(fabriqueAsynchroneOptionsTypeOrm()),
      TypeOrmModule.forFeature([InformationsEmail]),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    ],
    providers: [...[serviceConfigurationPourTests, InformationsEmailsService]],
  });

  it.skip("ajoute les donnees dans la base réelle", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const srv = mockModule.get<InformationsEmailsService>(
      InformationsEmailsService,
    );
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });
});
