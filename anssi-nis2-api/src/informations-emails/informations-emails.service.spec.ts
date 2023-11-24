import { Test, TestingModuleBuilder } from "@nestjs/testing";
import { InformationsEmailsService } from "./informations-emails.service";
import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";
import { datasourceKey } from "../constantes";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { mockInformationsEmailRepository } from "./fabrique-mock.repository";
import { espereEmailsInformationCorrespondASonDto } from "./helpers/testHelpers";
import { InformationsEmail } from "./entities/informations-email.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseProviders } from "../database/database.providers";
import { fabriqueAsynchroneOptionsTypeOrm } from "../Fabriques/fabriqueAsynchroneOptionsTypeOrm";
import "dotenv/config";
import { env } from "process";
import { Provider } from "@nestjs/common";

const fabriqueService = async (m: TestingModuleBuilder) =>
  (await m.compile()).get<InformationsEmailsService>(InformationsEmailsService);

const fabriqueConstructeurTestModule = (fournisseurs: Provider[]) =>
  Test.createTestingModule({
    imports: [
      TypeOrmModule.forRootAsync(fabriqueAsynchroneOptionsTypeOrm()),
      TypeOrmModule.forFeature([InformationsEmail]),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    ],
    providers: [...fournisseurs, InformationsEmailsService],
  });
const informationsEmail: CreateInformationsEmailDto = {
  email: "toto@titi.tutu",
  accepteInfolettreNis2: true,
  accepteInfolettreServicesDedies: true,
  nomOrganisation: "Titi International",
};
describe("InformationsEmailsService", () => {
  const testingModuleBuilder = fabriqueConstructeurTestModule([
    {
      provide: datasourceKey,
      useValue: mockInformationsEmailRepository,
    },
  ]);

  it("ajoute les donnees dans la base mockée", async () => {
    const srv = await fabriqueService(testingModuleBuilder);
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });
});

describe("InformationsEmailsService sur vraie DB", () => {
  const valeursChaineConfiguration = env;
  const fauxServiceConfiguration: Provider = {
    provide: ConfigService,
    useValue: {
      get: jest.fn((cleDeConfiguration: string, valeurParDefaut: string) => {
        return (
          valeursChaineConfiguration[cleDeConfiguration] || valeurParDefaut
        );
      }),
    },
  };
  const testingModuleBuilder = fabriqueConstructeurTestModule([
    ...databaseProviders,
    fauxServiceConfiguration,
  ]);

  it("ajoute les donnees dans la base réelle", async () => {
    const srv = await fabriqueService(testingModuleBuilder);
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });
});
