import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { SecteurActivite } from "anssi-nis2-domain/src";
import { SousSecteurActivite } from "anssi-nis2-domain/src/Simulateur/SousSecteurActivite.definitions";
import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "anssi-nis2-domain/src/Simulateur/ChampsSimulateur.definitions";
import { Evenements } from "./evenements.entite-journal";

@Entity()
export class ConcerneNis2 {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Evenements)
  evenement: Evenements;

  @RelationId((concerneNis2: ConcerneNis2) => concerneNis2.evenement)
  evenementId: number;

  @Column()
  secteur: SecteurActivite;

  @Column()
  sousSecteur: SousSecteurActivite;

  @Column()
  typeStructure: TypeStructure;

  @Column()
  trancheNombreEmploye: TrancheNombreEmployes;

  @Column()
  trancheChiffreAffaire: TrancheChiffreAffaire;
}
