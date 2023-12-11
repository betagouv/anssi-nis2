import { SegmentsConcernesNis2 } from "../entites/segments-concernes-nis2.entite-journal";

export type CreeConcerneNis2Dto = Pick<
  SegmentsConcernesNis2,
  | "evenement"
  | "secteur"
  | "sousSecteur"
  | "trancheChiffreAffaire"
  | "trancheNombreEmployes"
  | "typeStructure"
>;