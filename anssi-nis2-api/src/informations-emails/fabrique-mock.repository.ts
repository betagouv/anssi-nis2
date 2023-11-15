import { CreateInformationsEmailDto } from "./dto/create-informations-email.dto";
import { MockFactory } from "../test/mock.factory";
import { Repository } from "typeorm";

export const fabriqueMockRepository = <DtoType, EntityType>(specifications: {
  [k: string]: (objet: DtoType) => Promise<EntityType>;
}) => ({
  ...MockFactory.getMock(Repository<EntityType>),
  ...specifications,
});
export const mockInformationsEmailRepository = fabriqueMockRepository({
  save: async (createInformationsEmailDto: CreateInformationsEmailDto) => ({
    ...createInformationsEmailDto,
    nomOrganisation: createInformationsEmailDto.nomOrganisation ?? "",
    id: 1,
  }),
});
