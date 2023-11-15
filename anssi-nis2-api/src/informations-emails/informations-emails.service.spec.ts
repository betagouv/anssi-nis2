import { Test, TestingModuleBuilder } from "@nestjs/testing";
import { InformationsEmailsService } from "./informations-emails.service";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto.ts";
import { provideInformationsEmailRepositoryKey } from "../constantes.ts";
import { InformationsEmail } from "./entities/informations-email.entity.ts";
import { DatabaseModule } from "../database/database.module.ts";
import { ConfigModule } from "@nestjs/config";
import { informationsEmailsProviders } from "./informations-emails.providers.ts";

function espereEmailsInformationCorrespondASonDto(
  reponse: InformationsEmail,
  informationsEmail: CreateInformationsEmailDto,
) {
  expect(reponse.id).toBeDefined();
  expect(reponse.email).toBe(informationsEmail.email);
  expect(reponse.accepteInfolettreNis2).toBe(
    informationsEmail.accepteInfolettreNis2,
  );
  expect(reponse.accepteInfolettreServicesDedies).toBe(
    informationsEmail.accepteInfolettreServicesDedies,
  );
  expect(reponse.nomOrganisation).toBe(informationsEmail.nomOrganisation);
}

describe("InformationsEmailsService", () => {
  const testingModuleBuilder = Test.createTestingModule({
    providers: [
      InformationsEmailsService,
      {
        provide: provideInformationsEmailRepositoryKey,
        useValue: mockInformationsEmailRepositry,
      },
    ],
  });
  const testingModuleConcretBuilder = Test.createTestingModule({
    imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
    providers: [...informationsEmailsProviders, InformationsEmailsServic],
  });
  const fabriqueService = async (m: TestingModuleBuilder) =>
    (await m.compile()).get<InformationsEmailsService>(
      InformationsEmailsService,
    );
  const informationsEmail: CreateInformationsEmailDto = {
    email: "toto@titi.tutu",
    accepteInfolettreNis2: true,
    accepteInfolettreServicesDedies: true,
    nomOrganisation: "Titi International",
  };

  it("should be defined", async () => {
    expect(await fabriqueService(testingModuleBuilder)).toBeDefined();
  });

  it("ajoute les donnees dans la base mockée", async () => {
    const srv = await fabriqueService(testingModuleBuilder);
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });

  it.skip("ajoute les donnees dans la base réelle", async () => {
    const srv = await fabriqueService(testingModuleConcretBuilder);
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });
});
