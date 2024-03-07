import { fc } from "@fast-check/vitest";
import { TypeEntitePublique } from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import { ValeursTypeEntitePublique } from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  ReponseStructure,
  ReponseStructurePrivee,
} from "../../../src/Domain/Simulateur/services/Eligibilite/StructuresReponse.definitions";
import {
  arbCategorieTaille_Grand,
  arbTranchePetitMoyenGrand_MoyenGrand,
  arbTranchePetitMoyenGrand_ToutesValeurs,
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

const arbTypeEntitePublique = fc.constantFrom<TypeEntitePublique>(
  ...ValeursTypeEntitePublique,
);
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
const arbStructurePrivee_TrancheCAJamaisPetit = fc.record<
  ReponseStructurePrivee<"Grand">
>({
  _categorieTaille: arbCategorieTaille_Grand,
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTranchePetitMoyenGrand_ToutesValeurs,
  trancheNombreEmployes: arbTranchePetitMoyenGrand_MoyenGrand,
});
const arbStructurePrivee_TrancheEmployesJamaisPetit = fc.record<
  ReponseStructurePrivee<"Grand">
>({
  _categorieTaille: fc.constant("Grand"),
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTranchePetitMoyenGrand_MoyenGrand,
  trancheNombreEmployes: arbTranchePetitMoyenGrand_ToutesValeurs,
});
export const arbStructurePublique_JamaisPetit = arbTypeEntitePublique.chain(
  (typeEntitePublique) =>
    fc.record<ReponseStructure<"publique", "Grand">>({
      _categorieTaille: arbCategorieTaille_Grand,
      typeStructure: arbTypeStructure_Publique,
      trancheNombreEmployes: arbTranchePetitMoyenGrand_MoyenGrand,
      typeEntitePublique: fc.constant(typeEntitePublique),
    }),
);
export const arbStructureGrandPrive = fc.oneof(
  arbStructurePrivee_TrancheCAJamaisPetit,
  arbStructurePrivee_TrancheEmployesJamaisPetit,
);
export const arbStructurePublique = fc.oneof(
  arbStructurePetitPublic,
  arbStructurePublique_JamaisPetit,
);
export const arbStructureGrand = arbStructureGrandPrive;
