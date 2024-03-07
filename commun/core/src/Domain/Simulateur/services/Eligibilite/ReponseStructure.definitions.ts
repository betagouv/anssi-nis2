import { Tag } from "../../../../../../utils/types/Tag";
import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
  TypeEntitePublique,
  TypeStructure,
} from "../../ChampsSimulateur.definitions";

export type InformationsTypeStructure<T extends TypeStructure> =
  T extends "privee"
    ? {
        typeStructure: "privee";
      }
    : {
        typeStructure: "publique";
        typeEntitePublique: TypeEntitePublique;
      };
export type CategorieTaille = "Petit" | "Moyen" | "Grand";
export type CategoriseTaille<S extends CategorieTaille> = Tag<
  S,
  "CategorieTaille"
>;
type TrancheTaillePrivePetit = {
  trancheChiffreAffaire: Extract<TrancheChiffreAffaire, "petit">;
  trancheNombreEmployes: Extract<TrancheNombreEmployes, "petit">;
};
type TrancheTaillePriveMoyen =
  | {
      trancheChiffreAffaire: Extract<TrancheChiffreAffaire, "moyen">;
      trancheNombreEmployes: Omit<TrancheNombreEmployes, "grand">;
    }
  | {
      trancheChiffreAffaire: Omit<TrancheChiffreAffaire, "grand">;
      trancheNombreEmployes: Extract<TrancheNombreEmployes, "moyen">;
    };
type TrancheTaillePriveGrand =
  | {
      trancheChiffreAffaire: Extract<TrancheChiffreAffaire, "grand">;
      trancheNombreEmployes: TrancheNombreEmployes;
    }
  | {
      trancheChiffreAffaire: TrancheChiffreAffaire;
      trancheNombreEmployes: Extract<TrancheNombreEmployes, "grand">;
    };
type TranchesTaillePrive<T extends CategorieTaille> = T extends "Petit"
  ? TrancheTaillePrivePetit
  : T extends "Moyen"
    ? TrancheTaillePriveMoyen
    : TrancheTaillePriveGrand;
type TrancheTaillePublicPetit = {
  trancheNombreEmployes: Extract<TrancheChiffreAffaire, "petit">;
};
type TrancheTaillePublicMoyen = {
  trancheNombreEmployes: Extract<TrancheChiffreAffaire, "moyen">;
};
type TrancheTaillePublicGrand = {
  trancheNombreEmployes: Extract<TrancheChiffreAffaire, "grand">;
};
type TranchesTaillePublic<T extends CategorieTaille> = T extends "Petit"
  ? TrancheTaillePublicPetit
  : T extends "Moyen"
    ? TrancheTaillePublicMoyen
    : TrancheTaillePublicGrand;
type TailleSecteurPrive<T extends CategorieTaille> = TranchesTaillePrive<T> &
  CategoriseTaille<T>;
type TailleSecteurPublic<T extends CategorieTaille> = TranchesTaillePublic<T> &
  CategoriseTaille<T>;
export type TailleSecteur<
  S extends TypeStructure,
  T extends CategorieTaille,
> = S extends "privee" ? TailleSecteurPrive<T> : TailleSecteurPublic<T>;
export type ReponseStructure<
  S extends TypeStructure,
  T extends CategorieTaille,
> = S extends "privee"
  ? InformationsTypeStructure<"privee"> & TailleSecteur<"privee", T>
  : InformationsTypeStructure<"publique"> & TailleSecteur<"publique", T>;
