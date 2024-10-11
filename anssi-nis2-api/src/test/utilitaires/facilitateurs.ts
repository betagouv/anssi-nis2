import { ConfigService } from "@nestjs/config";
import { Test } from "@nestjs/testing";
import { MockFactory } from "../mock.factory";
import { Repository } from "typeorm";
import { InformationsEmail } from "../../informations-emails/entities/informations-email.entity";
import { CreeInformationsEmailDto } from "../../informations-emails/dto/cree-informations-email.dto";

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

    return await Test.createTestingModule({
      providers: [fauxServiceConfiguration],
    }).compile();
  };

export const fabriqueConfigService = async (valeursChaineConfiguration: {
  [p: string]: string;
}) =>
  (
    await fabriqueModuleTestAvecFauxServiceConfig(valeursChaineConfiguration)
  ).get<ConfigService>(ConfigService);

export const fabriqueMockRepository = <DtoType, EntityType>(specifications: {
  [k: string]: (objet: DtoType) => Promise<EntityType>;
}) => ({
  ...MockFactory.getMock(Repository<EntityType>),
  ...specifications,
});

export const espereEmailsInformationCorrespondASonDto = (
  reponse: InformationsEmail,
  informationsEmail: CreeInformationsEmailDto,
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
