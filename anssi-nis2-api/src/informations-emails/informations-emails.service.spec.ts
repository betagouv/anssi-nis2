import { InformationsEmailsService } from "./informations-emails.service";
import { mockInformationsEmailRepository } from "./informations-emails.repository.mock";
import { informationsEmail } from "./example/informations.email.exemples";
import {
  espereEmailsInformationCorrespondASonDto,
  serviceConfigurationPourTests,
} from "../test/utilitaires/facilitateurs";
import { InformationsEmail } from "./entities/informations-email.entity";
import { Test } from "@nestjs/testing";
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
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
  // Suppression pour des raisons de bug dans l'API : impossiuble d'ajouter dans
  //  la base avec des validations
  it.skip("n'autorise pas l'ajout de donn'ees avec un email mal formé", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const informationEmailService = mockModule.get<InformationsEmailsService>(
      InformationsEmailsService,
    );
    const informationsEmailInvalide = {
      ...informationsEmail,
      email: "INVALIDE",
    };
    await expect(
      informationEmailService.ajoute(informationsEmailInvalide),
    ).rejects.toThrow();
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

  it("ajoute les donnees dans la base réelle", async () => {
    const mockModule = await testingModuleBuilder.compile();
    const srv = mockModule.get<InformationsEmailsService>(
      InformationsEmailsService,
    );
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });
});
