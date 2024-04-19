import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class Crm {
  abstract inscrisUtilisateur(email: string): Promise<void>;
}
