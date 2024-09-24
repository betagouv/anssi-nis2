import { CreeInformationsEmailDto } from "../informations-emails/dto/cree-informations-email.dto";

export interface AdaptateurCrm {
  inscrisUtilisateur(inscription: CreeInformationsEmailDto): Promise<void>;
}
