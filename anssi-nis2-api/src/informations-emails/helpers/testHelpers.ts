import { InformationsEmail } from "../entities/informations-email.entity.ts";
import { CreateInformationsEmailDto } from "../dto/create-informations-email.dto.ts";

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
