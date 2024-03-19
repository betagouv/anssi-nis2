import { TypeStructure } from "../ChampsSimulateur.definitions";
import { DonneesFormulaireSimulateur } from "../services/DonneesFormulaire/DonneesFormulaire.definitions";
import {
  contientMoyenneEntreprise,
  contientPetiteEntreprise,
} from "../services/DonneesFormulaire/DonneesFormulaire.predicats";
import {
  CategorieTaille,
  ReponseStructure,
  TailleSecteurPrive,
  TailleSecteurPublic,
} from "../services/Eligibilite/ReponseStructure.definitions";

export const FabriqueInformationsStructure = {
  informationsTailleSecteurPrive:
    <Taille extends CategorieTaille>(taille: Taille) =>
    (donnees: DonneesFormulaireSimulateur): TailleSecteurPrive<Taille> =>
      ({
        _categorieTaille: taille,
        trancheChiffreAffaire: donnees.trancheChiffreAffaire[0],
        trancheNombreEmployes: donnees.trancheNombreEmployes[0],
      }) as unknown as TailleSecteurPrive<Taille>,

  structurePrivee:
    <Taille extends CategorieTaille>(taille: Taille) =>
    (
      donnees: DonneesFormulaireSimulateur,
    ): ReponseStructure<"privee", Taille> => ({
      typeStructure: "privee",
      ...FabriqueInformationsStructure.informationsTailleSecteurPrive(taille)(
        donnees,
      ),
    }),

  informationsTailleSecteurPublic: <Taille extends CategorieTaille>(
    taille: Taille,
  ): TailleSecteurPublic<Taille> =>
    ({
      _categorieTaille: taille,
      trancheNombreEmployes: taille.toString().toLowerCase(),
    }) as unknown as TailleSecteurPublic<Taille>,

  structurePublique:
    <Taille extends CategorieTaille>(taille: Taille) =>
    (
      donnees: DonneesFormulaireSimulateur,
    ): ReponseStructure<"publique", Taille> => ({
      typeStructure: "publique",
      typeEntitePublique: donnees.typeEntitePublique[0],
      ...FabriqueInformationsStructure.informationsTailleSecteurPublic(taille),
    }),

  structurePetite: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<TypeStructure, "Petit"> =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePublique("Petit")(donnees)
      : FabriqueInformationsStructure.structurePrivee("Petit")(donnees),

  structureMoyenne: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<TypeStructure, "Moyen"> =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePublique("Moyen")(donnees)
      : FabriqueInformationsStructure.structurePrivee("Moyen")(donnees),
  structureGrande: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<TypeStructure, "Grand"> =>
    donnees.typeStructure[0] === "publique"
      ? FabriqueInformationsStructure.structurePublique("Grand")(donnees)
      : FabriqueInformationsStructure.structurePrivee("Grand")(donnees),

  structure: (
    donnees: DonneesFormulaireSimulateur,
  ): ReponseStructure<TypeStructure, CategorieTaille> =>
    contientPetiteEntreprise(donnees)
      ? FabriqueInformationsStructure.structurePetite(donnees)
      : contientMoyenneEntreprise(donnees)
        ? FabriqueInformationsStructure.structureMoyenne(donnees)
        : FabriqueInformationsStructure.structureGrande(donnees),
};
