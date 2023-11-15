import { PartialType } from "@nestjs/mapped-types";
import { CreateInformationsEmailDto } from "./create-informations-email.dto";

export class UpdateInformationsEmailDto extends PartialType(
  CreateInformationsEmailDto,
) {}
