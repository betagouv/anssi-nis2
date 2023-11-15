import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InformationsEmail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1024 })
  email: string;

  @Column({ nullable: true })
  nomOrganisation: string;

  @Column({ default: false })
  accepteInfolettreNis2: boolean;

  @Column({ default: false })
  accepteInfolettreServicesDedies: boolean;
}
