export type InformationsEmail = {
  email: string;
  nomOrganisation?: string;
  accepteInfolettreNis2: boolean;
  accepteInfolettreServicesDedies: boolean;
};

export interface AggregatInformationsEmail extends InformationsEmail {
  id: number;
}
