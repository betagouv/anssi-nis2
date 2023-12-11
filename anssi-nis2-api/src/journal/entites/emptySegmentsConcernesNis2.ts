import { SegmentsConcernesNis2 } from "./segments-concernes-nis2.entite-journal";
import { Evenements } from "./evenements.entite-journal";

export const emptySegmentsConcernesNis2: SegmentsConcernesNis2 = {
  evenementId: 0,
  secteur: "autreSecteurActivite",
  sousSecteur: undefined,
  trancheChiffreAffaire: undefined,
  typeStructure: "privee",
  trancheNombreEmployes: "petit",
  evenement: new Evenements(),
  id: 0,
};
