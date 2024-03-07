import { fc } from "@fast-check/vitest";
import {
  ReponseStructure,
  ReponseStructurePrivee,
} from "../../../src/Domain/Simulateur/services/Eligibilite/StructuresReponse.definitions";
import {
  arbCategorieTaille_ToujoursGrand,
  arbCategorieTaille_ToujoursMoyen,
  arbTranchePetitMoyenGrand_MoyenGrand,
  arbTranchePetitMoyenGrand_PetitMoyen,
  arbTranchePetitMoyenGrand_ToujoursGrand,
  arbTranchePetitMoyenGrand_ToujoursMoyen,
  arbTranchePetitMoyenGrand_ToutesValeurs,
  arbTypeEntitePublique,
  arbTypeStructure_Privee,
  arbTypeStructure_Publique,
} from "./ResultatEvaluationRegulation.champs.arbitraire";

// arbTypeEntitePublique.map<ReponseStructure<"publique", "Petit">>(
//   (typeEntitePublique) => ({
//     _categorieTaille: "Petit" as const,
//     typeStructure: "publique",
//     trancheNombreEmployes: "petit",
//     typeEntitePublique: typeEntitePublique,
//   }),
// );

export const arbStructurePetitPrive = fc.constant<
  ReponseStructure<"privee", "Petit">
>({
  _categorieTaille: "Petit" as const,
  typeStructure: "privee",
  trancheChiffreAffaire: "petit",
  trancheNombreEmployes: "petit",
});
export const arbStructurePetitPublic = arbTypeEntitePublique.map<
  ReponseStructure<"publique", "Petit">
>((typeEntitePublique) => ({
  _categorieTaille: "Petit" as const,
  typeStructure: "publique",
  trancheNombreEmployes: "petit",
  typeEntitePublique: typeEntitePublique,
}));
const arbStructurePrivee_TrancheCAMoyen = fc.record<
  ReponseStructurePrivee<"Moyen">
>({
  _categorieTaille: arbCategorieTaille_ToujoursMoyen,
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTranchePetitMoyenGrand_ToujoursMoyen,
  trancheNombreEmployes: arbTranchePetitMoyenGrand_PetitMoyen,
});
const arbStructurePrivee_TrancheEmployesMoyen = fc.record<
  ReponseStructurePrivee<"Moyen">
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
  ReponseStructurePrivee<"Grand">
>({
  _categorieTaille: arbCategorieTaille_ToujoursGrand,
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTranchePetitMoyenGrand_ToutesValeurs,
  trancheNombreEmployes: arbTranchePetitMoyenGrand_ToujoursGrand,
});
const arbStructurePrivee_TrancheEmployes_ToujoursGrand = fc.record<
  ReponseStructurePrivee<"Grand">
>({
  _categorieTaille: arbCategorieTaille_ToujoursGrand,
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTranchePetitMoyenGrand_ToujoursGrand,
  trancheNombreEmployes: arbTranchePetitMoyenGrand_ToutesValeurs,
});
export const arbStructurePublique_JamaisPetit = arbTypeEntitePublique.chain(
  (typeEntitePublique) =>
    fc.record<ReponseStructure<"publique", "Grand">>({
      _categorieTaille: arbCategorieTaille_ToujoursGrand,
      typeStructure: arbTypeStructure_Publique,
      trancheNombreEmployes: arbTranchePetitMoyenGrand_MoyenGrand,
      typeEntitePublique: fc.constant(typeEntitePublique),
    }),
);
export const arbReponseStructure_ToujoursGrand = fc.oneof(
  arbStructurePrivee_TrancheCA_ToujoursGrand,
  arbStructurePrivee_TrancheEmployes_ToujoursGrand,
);
export const arbStructurePublique = fc.oneof(
  arbStructurePetitPublic,
  arbStructurePublique_JamaisPetit,
);
export const arbStructureGrand = arbReponseStructure_ToujoursGrand;
