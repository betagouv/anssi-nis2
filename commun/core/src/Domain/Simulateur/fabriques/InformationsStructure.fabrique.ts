import { TypeStructure } from "../ChampsSimulateur.definitions";
import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.definitions";
import { contientPetiteEntreprise } from "../services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  CategorieTaille,
  ReponseStructure,
  ReponseStructurePrivee,
  ReponseStructurePublique,
} from "../services/Eligibilite/Reponse.definitions";

export const FabriqueInformationsStructure = {
  structurePriveePetite: (): ReponseStructurePrivee<"Petit"> => ({
    _categorieTaille: "Petit",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "petit",
  }),

  structurePriveeGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePrivee<"Grand"> => ({
    _categorieTaille: "Grand",
    typeStructure: "privee",
    trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
    trancheNombreEmployes: donnees.trancheNombreEmployes[0],
  }),

  structurePubliquePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePublique<"Petit"> => ({
    _categorieTaille: "Petit",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: "petit",
  }),
  structurePubliqueGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePublique<"Grand"> => ({
    _categorieTaille: "Grand",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: donnees.trancheNombreEmployes[0],
  }),

  structurePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<TypeStructure, "Petit"> =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePubliquePetite(donnees)
      : FabriqueInformationsStructure.structurePriveePetite(),

  structureGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePrivee<"Grand"> | ReponseStructurePublique<"Grand"> =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePubliqueGrande(donnees)
      : FabriqueInformationsStructure.structurePriveeGrande(donnees),

  structure: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<TypeStructure, CategorieTaille> =>
    contientPetiteEntreprise(donnees)
      ? FabriqueInformationsStructure.structurePetite(donnees)
      : FabriqueInformationsStructure.structureGrande(donnees),
};
