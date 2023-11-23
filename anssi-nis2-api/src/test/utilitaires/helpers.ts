import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";

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
