import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { Provider } from "@nestjs/common";
import { env } from "process";
import { MockFactory, MockType } from "../mock.factory";
import { Repository } from "typeorm";
import { InformationsEmail } from "../../informations-emails/entities/informations-email.entity";
import { CreateInformationsEmailDto } from "../../informations-emails/dto/create-informations-email.dto";

export const fabriqueModuleTestAvecFauxServiceConfig =
  async (valeursChaineConfiguration: { [cle: string]: string }) => {
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

    const module: TestingModule = await Test.createTestingModule({
      providers: [fauxServiceConfiguration],
    }).compile();
    return module;
  };
export const fabriqueConfigService = async (valeursChaineConfiguration: {
  [p: string]: string;
}) =>
  (
    await fabriqueModuleTestAvecFauxServiceConfig(valeursChaineConfiguration)
  ).get<ConfigService>(ConfigService);
export const serviceConfigurationPourTests: Provider = {
  provide: ConfigService,
  useValue: {
    get: (cleDeConfiguration: string, valeurParDefaut: string) =>
      env[cleDeConfiguration] || valeurParDefaut,
  },
};
export const fabriqueMockRepository = <DtoType, EntityType>(specifications: {
  [k: string]: (objet: DtoType) => Promise<EntityType>;
}): MockType<Repository<EntityType>> => ({
  ...MockFactory.getMock(Repository<EntityType>),
  ...specifications,
});
export const espereEmailsInformationCorrespondASonDto = (
  reponse: InformationsEmail,
  informationsEmail: CreateInformationsEmailDto,
) => {
  expect(reponse.id).toBeDefined();
  expect(reponse.email).toBe(informationsEmail.email);
  expect(reponse.accepteInfolettreNis2).toBe(
    informationsEmail.accepteInfolettreNis2,
  );
  expect(reponse.accepteInfolettreServicesDedies).toBe(
    informationsEmail.accepteInfolettreServicesDedies,
  );
  expect(reponse.nomOrganisation).toBe(informationsEmail.nomOrganisation);
};
