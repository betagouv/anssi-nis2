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
import { DataSource, Repository } from "typeorm";
import { fabriqueAppDataSource } from "../app-data-source.fabrique";
import {
  fabriqueConfigService,
  fabriqueModuleTestAvecFauxServiceConfig,
} from "../test/utilitaires/helpers";
import { fabriqueAsynchroneOptionsTypeOrm } from "../Fabriques/fabriqueAsynchroneOptionsTypeOrm";

describe("InformationsEmailsService", () => {
  // const testingModuleBuilder = Test.createTestingModule({
  //   providers: [
  //     InformationsEmailsService,
  //     {
  //       provide: datasourceKey,
  //       useValue: mockInformationsEmailRepository,
  //     },
  //   ],
  // });
  // const testingModuleConcretBuilder = Test.createTestingModule({
  //   imports: [TypeOrmModule.forFeature([InformationsEmail])],
  //   providers: [
  //     InformationsEmailsService,
  //     {
  //       provide: datasourceKey,
  //       useValue: new DataSource({
  //         type: "postgres",
  //         url: "postgres://postgres:secret@localhost/anssi-nis2",
  //         entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  //         subscribers: [],
  //         migrations: [],
  //       }),
  //     },
  //   ],
  // });
  let newService: InformationsEmailsService;

  beforeEach(async () => {
    const valeursChaineConfiguration = {
      SCALINGO_POSTGRESQL_URL:
        "postgres://postgres:secret@localhost/anssi-nis2",
    };
    const fauxServiceConfiguration = {
      provide: ConfigService,
      useValue: {
        get: jest.fn((cleDeConfiguration: string, valeurParDefaut: string) => {
          return (
            valeursChaineConfiguration[cleDeConfiguration] || valeurParDefaut
          );
        }),
      },
    };
    const configService = await fabriqueModuleTestAvecFauxServiceConfig(
      valeursChaineConfiguration,
    );
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(fabriqueAsynchroneOptionsTypeOrm()),
        TypeOrmModule.forFeature([InformationsEmail]),
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        ...databaseProviders,
        InformationsEmailsService,
        fauxServiceConfiguration,
      ],
    }).compile();

    newService = moduleRef.get<InformationsEmailsService>(
      InformationsEmailsService,
    );
  });
  // const fabriqueService = async (m: TestingModuleBuilder) =>
  //   (await m.compile()).get<InformationsEmailsService>(
  //     InformationsEmailsService,
  //   );
  const informationsEmail: CreateInformationsEmailDto = {
    email: "toto@titi.tutu",
    accepteInfolettreNis2: true,
    accepteInfolettreServicesDedies: true,
    nomOrganisation: "Titi International",
  };

  // it("should be defined", async () => {
  //   expect(await fabriqueService(testingModuleBuilder)).toBeDefined();
  // });
  //
  // it("ajoute les donnees dans la base mockée", async () => {
  //   const srv = await fabriqueService(testingModuleBuilder);
  //   const reponse = await srv.ajoute(informationsEmail);
  //   espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  // });

  it("ajoute les donnees dans la base réelle", async () => {
    const srv = newService; //await fabriqueService(testingModuleConcretBuilder);
    const reponse = await srv.ajoute(informationsEmail);
    espereEmailsInformationCorrespondASonDto(reponse, informationsEmail);
  });
});
