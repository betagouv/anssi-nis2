import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SimulateurReponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reponseJson: string;
}
