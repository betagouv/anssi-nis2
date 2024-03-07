import { fc } from "@fast-check/vitest";
import { ReponseStructure } from "../../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import {
  arbCategorieTaille_ToujoursGrand,
  arbCategorieTaille_ToujoursMoyen,
  arbTranchePetitMoyenGrand_PetitMoyen,
  arbTranchePetitMoyenGrand_ToujoursGrand,
  arbTranchePetitMoyenGrand_ToujoursMoyen,
  arbTranchePetitMoyenGrand_ToutesValeurs,
  arbTypeEntitePublique,
  arbTypeStructure_Privee,
  arbTypeStructure_Publique,
} from "./ValeursChampsSimulateur.arbitraire";

export const arbStructurePetitPrive = fc.constant<
  ReponseStructure<"privee", "Petit">
>({
  _categorieTaille: "Petit" as const,
  typeStructure: "privee",
  trancheChiffreAffaire: "petit",
  trancheNombreEmployes: "petit",
});
const arbStructurePrivee_TrancheCAMoyen = fc.record<
  ReponseStructure<"privee", "Moyen">
>({
  _categorieTaille: arbCategorieTaille_ToujoursMoyen,
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTranchePetitMoyenGrand_ToujoursMoyen,
  trancheNombreEmployes: arbTranchePetitMoyenGrand_PetitMoyen,
});
const arbStructurePrivee_TrancheEmployesMoyen = fc.record<
  ReponseStructure<"privee", "Moyen">
>({
  _categorieTaille: arbCategorieTaille_ToujoursMoyen,
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTranchePetitMoyenGrand_PetitMoyen,
  trancheNombreEmployes: arbTranchePetitMoyenGrand_ToujoursMoyen,
});
export const arbReponseStructure_ToujoursMoyen = fc.oneof(
  arbStructurePrivee_TrancheCAMoyen,
  arbStructurePrivee_TrancheEmployesMoyen,
);
const arbStructurePrivee_TrancheCA_ToujoursGrand = fc.record<
  ReponseStructure<"privee", "Grand">
>({
  _categorieTaille: arbCategorieTaille_ToujoursGrand,
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTranchePetitMoyenGrand_ToutesValeurs,
  trancheNombreEmployes: arbTranchePetitMoyenGrand_ToujoursGrand,
});
const arbStructurePrivee_TrancheEmployes_ToujoursGrand = fc.record<
  ReponseStructure<"privee", "Grand">
>({
  _categorieTaille: arbCategorieTaille_ToujoursGrand,
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTranchePetitMoyenGrand_ToujoursGrand,
  trancheNombreEmployes: arbTranchePetitMoyenGrand_ToutesValeurs,
});
export const arbStructurePublique_ToujoursPetit = arbTypeEntitePublique.map<
  ReponseStructure<"publique", "Petit">
>((typeEntitePublique) => ({
  _categorieTaille: "Petit" as const,
  typeStructure: "publique",
  trancheNombreEmployes: "petit",
  typeEntitePublique: typeEntitePublique,
}));
export const arbStructurePublique_ToujoursMoyen = arbTypeEntitePublique.chain(
  (typeEntitePublique) =>
    fc.record<ReponseStructure<"publique", "Moyen">>({
      _categorieTaille: arbCategorieTaille_ToujoursMoyen,
      typeStructure: arbTypeStructure_Publique,
      trancheNombreEmployes: arbTranchePetitMoyenGrand_ToujoursMoyen,
      typeEntitePublique: fc.constant(typeEntitePublique),
    }),
);
export const arbStructurePublique_ToujoursGrand = arbTypeEntitePublique.chain(
  (typeEntitePublique) =>
    fc.record<ReponseStructure<"publique", "Grand">>({
      _categorieTaille: arbCategorieTaille_ToujoursGrand,
      typeStructure: arbTypeStructure_Publique,
      trancheNombreEmployes: arbTranchePetitMoyenGrand_ToujoursGrand,
      typeEntitePublique: fc.constant(typeEntitePublique),
    }),
);
export const arbReponseStructure_ToujoursGrand = fc.oneof(
  arbStructurePrivee_TrancheCA_ToujoursGrand,
  arbStructurePrivee_TrancheEmployes_ToujoursGrand,
);
export const arbStructurePublique = fc.oneof(
  arbStructurePublique_ToujoursPetit,
  arbStructurePublique_ToujoursMoyen,
  arbStructurePublique_ToujoursGrand,
);
