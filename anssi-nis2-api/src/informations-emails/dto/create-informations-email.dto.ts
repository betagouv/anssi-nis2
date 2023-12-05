import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateInformationsEmailDto {
  constructor({
    email,
    nomOrganisation,
    accepteInfolettreNis2,
    accepteInfolettreServicesDedies,
  }: CreateInformationsEmailDto) {
    this.email = email;
    this.nomOrganisation = nomOrganisation;
    this.accepteInfolettreNis2 = accepteInfolettreNis2;
    this.accepteInfolettreServicesDedies = accepteInfolettreServicesDedies;
  }

  @IsEmail()
  email: string;

  @IsNotEmpty()
  nomOrganisation?: string;

  accepteInfolettreNis2: boolean = false;

  accepteInfolettreServicesDedies: boolean = false;
}
