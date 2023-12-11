import { CreeInformationsEmailDto } from "./dto/cree-informations-email.dto";
import { fabriqueMockRepository } from "../test/utilitaires/facilitateurs";

export const mockInformationsEmailRepository = fabriqueMockRepository({
  save: async (createInformationsEmailDto: CreeInformationsEmailDto) => ({
    ...createInformationsEmailDto,
    nomOrganisation: createInformationsEmailDto.nomOrganisation ?? "",
    id: 1,
  }),
});
