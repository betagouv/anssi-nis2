import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeStructure,
} from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions";
import { SecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from "typeorm";
import { Evenements } from "./evenements.entite-journal";

@Entity({ name: "segments_concernes_nis2" })
export class SegmentsConcernesNis2 {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Evenements)
  evenement: Evenements;

  @RelationId((concerneNis2: SegmentsConcernesNis2) => concerneNis2.evenement)
  evenementId: number;

  @Column()
  secteur: SecteurActivite;

  @Column()
  sousSecteur: SousSecteurActivite;

  @Column()
  typeStructure: TypeStructure;

  @Column()
  trancheNombreEmployes: TrancheNombreEmployes;

  @Column()
  trancheChiffreAffaire: TrancheChiffreAffaire;
}
