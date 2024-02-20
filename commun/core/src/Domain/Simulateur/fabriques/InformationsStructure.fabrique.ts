import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.definitions";
import { contientPetiteEntreprise } from "../services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  ReponseStructure,
  ReponseStructureGrand,
  ReponseStructurePetit,
  ReponseStructurePriveeGrand,
  ReponseStructurePriveePetit,
  ReponseStructurePubliqueGrand,
  ReponseStructurePubliquePetit,
} from "../services/Eligibilite/Reponse.definitions";

export const FabriqueInformationsStructure = {
  structurePriveePetite: (): ReponseStructurePriveePetit => ({
    _categorieTaille: "Petit",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "petit",
  }),

  structurePriveeGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePriveeGrand => ({
    _categorieTaille: "Grand",
    typeStructure: "privee",
    trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
    trancheNombreEmployes: donnees.trancheNombreEmployes[0],
  }),

  structurePubliquePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePubliquePetit => ({
    _categorieTaille: "Petit",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: "petit",
  }),
  structurePubliqueGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePubliqueGrand => ({
    _categorieTaille: "Grand",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: donnees.trancheNombreEmployes[0],
  }),

  structurePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePetit =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePubliquePetite(donnees)
      : FabriqueInformationsStructure.structurePriveePetite(),

  structureGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructureGrand =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePubliqueGrande(donnees)
      : FabriqueInformationsStructure.structurePriveeGrande(donnees),

  structure: (donnees: DonneesFormulaireSimulateur): ReponseStructure =>
    contientPetiteEntreprise(donnees)
      ? FabriqueInformationsStructure.structurePetite(donnees)
      : FabriqueInformationsStructure.structureGrande(donnees),
};
