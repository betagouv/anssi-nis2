import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Evenements {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "timestamp" })
  date: Date;

  @Column()
  type: string;

  @Column({
    type: "jsonb",
  })
  donnees: string;
}
