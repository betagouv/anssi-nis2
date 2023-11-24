import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { Provider } from "@nestjs/common";
import { env } from "process";
import { MockFactory } from "../mock.factory";
import { Repository } from "typeorm";

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
}) => ({
  ...MockFactory.getMock(Repository<EntityType>),
  ...specifications,
});
