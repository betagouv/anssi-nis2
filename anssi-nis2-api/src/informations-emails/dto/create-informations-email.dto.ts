export class CreateInformationsEmailDto {
  email: string;

  nomOrganisation?: string;

  accepteInfolettreNis2: boolean = false;

  accepteInfolettreServicesDedies: boolean = false;
}
