import { TypeStructure } from "../ChampsSimulateur.definitions";
import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.definitions";
import {
  contientMoyenneEntreprise,
  contientPetiteEntreprise,
} from "../services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  CategorieTaille,
  ReponseStructure,
} from "../services/Eligibilite/ReponseStructure.definitions";

export const FabriqueInformationsStructure = {
  structurePriveePetite: (): ReponseStructure<"privee", "Petit"> => ({
    _categorieTaille: "Petit",
    typeStructure: "privee",
    trancheChiffreAffaire: "petit",
    trancheNombreEmployes: "petit",
  }),

  structurePriveeMoyenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<"privee", "Moyen"> =>
    ({
      _categorieTaille: "Moyen",
      typeStructure: "privee",
      trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    }) as ReponseStructure<"privee", "Moyen">,

  structurePriveeGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<"privee", "Grand"> =>
    ({
      _categorieTaille: "Grand",
      typeStructure: "privee",
      trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
      trancheNombreEmployes: donnees.trancheNombreEmployes[0],
    }) as ReponseStructure<"privee", "Grand">,

  structurePubliquePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<"publique", "Petit"> => ({
    _categorieTaille: "Petit",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: "petit",
  }),

  structurePubliqueMoyenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<"publique", "Moyen"> => ({
    _categorieTaille: "Moyen",
    typeStructure: "publique",
    typeEntitePublique: donnees.typeEntitePublique[0],
    trancheNombreEmployes: "moyen",
  }),
  structurePubliqueGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<"publique", "Grand"> => ({
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
  ): ReponseStructure<TypeStructure, "Moyen"> =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePubliqueMoyenne(donnees)
      : FabriqueInformationsStructure.structurePriveeMoyenne(donnees),
  structureGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<TypeStructure, "Grand"> =>
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
