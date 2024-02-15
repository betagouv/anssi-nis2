import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.definitions";
import { contientPetiteEntreprise } from "../services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  DefinitionStructure,
  DefinitionStructureGrand,
  DefinitionStructurePetit,
  DefinitionStructurePriveeGrand,
  DefinitionStructurePriveePetit,
  DefinitionStructurePubliqueGrand,
  DefinitionStructurePubliquePetit,
} from "../services/Eligibilite/Reponse.definitions";

export const FabriqueInformationsStructure = {
  structurePriveePetite: (): DefinitionStructurePriveePetit => ({
    CategorieTaille: "Petit",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "petit",
  }),

  structurePriveeGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): DefinitionStructurePriveeGrand => ({
    CategorieTaille: "Grand",
    typeStructure: "privee",
    trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
    trancheNombreEmployes: donnees.trancheNombreEmployes[0],
  }),

  structurePubliquePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): DefinitionStructurePubliquePetit => ({
    CategorieTaille: "Petit",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: "petit",
  }),
  structurePubliqueGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): DefinitionStructurePubliqueGrand => ({
    CategorieTaille: "Grand",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: donnees.trancheNombreEmployes[0],
  }),

  structurePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): DefinitionStructurePetit =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePubliquePetite(donnees)
      : FabriqueInformationsStructure.structurePriveePetite(),

  structureGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): DefinitionStructureGrand =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePubliqueGrande(donnees)
      : FabriqueInformationsStructure.structurePriveeGrande(donnees),

  structure: (donnees: DonneesFormulaireSimulateur): DefinitionStructure =>
    contientPetiteEntreprise(donnees)
      ? FabriqueInformationsStructure.structurePetite(donnees)
      : FabriqueInformationsStructure.structureGrande(donnees),
};
