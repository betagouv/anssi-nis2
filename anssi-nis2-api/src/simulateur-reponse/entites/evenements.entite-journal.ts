import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  name: "nis2-journal.journal_nis2.evenements",
})
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
