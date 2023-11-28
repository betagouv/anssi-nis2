import { CreateInformationsEmailDto } from "../informations-emails/dto/create-informations-email.dto";
import { fabriqueMockRepository } from "./utilitaires/facilitateurs";

export const mockInformationsEmailRepository = fabriqueMockRepository({
  save: async (createInformationsEmailDto: CreateInformationsEmailDto) => ({
    ...createInformationsEmailDto,
    nomOrganisation: createInformationsEmailDto.nomOrganisation ?? "",
    id: 1,
  }),
});
