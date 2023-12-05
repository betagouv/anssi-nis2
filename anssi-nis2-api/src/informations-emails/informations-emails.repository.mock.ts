import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";
import { fabriqueMockRepository } from "../test/utilitaires/facilitateurs";

export const mockInformationsEmailRepository = fabriqueMockRepository({
  save: async (createInformationsEmailDto: CreateInformationsEmailDto) => ({
    ...createInformationsEmailDto,
    nomOrganisation: createInformationsEmailDto.nomOrganisation ?? "",
    id: 1,
  }),
});
