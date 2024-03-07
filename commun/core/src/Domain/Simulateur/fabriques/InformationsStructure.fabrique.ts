import { TypeStructure } from "../ChampsSimulateur.definitions";
import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.definitions";
import {
  contientMoyenneEntreprise,
  contientPetiteEntreprise,
} from "../services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  CategorieTaille,
  ReponseStructure,
  ReponseStructurePrivee,
  ReponseStructurePublique,
} from "../services/Eligibilite/StructuresReponse.definitions";

export const FabriqueInformationsStructure = {
  structurePriveePetite: (): ReponseStructurePrivee<"Petit"> => ({
    _categorieTaille: "Petit",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "petit",
  }),

  structurePriveeMoyenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePrivee<"Moyen"> =>
    ({
      _categorieTaille: "Moyen",
      typeStructure: "privee",
      trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    }) as ReponseStructurePrivee<"Moyen">,

  structurePriveeGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePrivee<"Grand"> =>
    ({
      _categorieTaille: "Grand",
      typeStructure: "privee",
      trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    }) as ReponseStructurePrivee<"Grand">,

  structurePubliquePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePublique<"Petit"> => ({
    _categorieTaille: "Petit",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: "petit",
  }),
  structurePubliqueMoyenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePublique<"Moyen"> => ({
    _categorieTaille: "Moyen",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: "moyen",
  }),
  structurePubliqueGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePublique<"Grand"> => ({
    _categorieTaille: "Grand",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: "grand",
  }),

  structurePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<TypeStructure, "Petit"> =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePubliquePetite(donnees)
      : FabriqueInformationsStructure.structurePriveePetite(),

  structureMoyenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructurePrivee<"Moyen"> | ReponseStructurePublique<"Moyen"> =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePubliqueMoyenne(donnees)
      : FabriqueInformationsStructure.structurePriveeMoyenne(donnees),
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
      : contientMoyenneEntreprise(donnees)
        ? FabriqueInformationsStructure.structureMoyenne(donnees)
        : FabriqueInformationsStructure.structureGrande(donnees),
};
