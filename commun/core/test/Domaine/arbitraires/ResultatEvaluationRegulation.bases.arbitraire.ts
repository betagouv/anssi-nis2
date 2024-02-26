import { fc } from "@fast-check/vitest";
import {
  AppartenancePaysUnionEuropeenne,
  DesignationOperateurServicesEssentiels,
  TypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.definitions";
import {
  ValeursPetitMoyenGrand,
  ValeursTypeEntitePublique,
} from "../../../src/Domain/Simulateur/ChampsSimulateur.valeurs";
import {
  ReponseStructure,
  ReponseStructurePrivee,
} from "../../../src/Domain/Simulateur/services/Eligibilite/Reponse.definitions";

export const arbDesignationOperateurServicesEssentielsToujoursOui = fc.constant(
  {
    designationOperateurServicesEssentiels: "oui" as const,
  },
);
export const arbDesignationOperateurServicesEssentielsJamaisOui = fc.record({
  designationOperateurServicesEssentiels:
    fc.constantFrom<DesignationOperateurServicesEssentiels>("non", "nsp"),
});

export const arbAppartenanceUnionEuropeenneToujoursFrance = fc.record({
  appartenancePaysUnionEuropeenne:
    fc.constant<AppartenancePaysUnionEuropeenne>("france"),
});
export const arbAppartenanceUnionEuropeenneJamaisFrance = fc.record({
  appartenancePaysUnionEuropeenne:
    fc.constantFrom<AppartenancePaysUnionEuropeenne>("horsue", "autre"),
});

export const arbTranchePetitMoyenGrand = fc.constantFrom(
  ...ValeursPetitMoyenGrand,
);
export const arbTrancheMoyenGrand = fc.constantFrom(
  "moyen" as const,
  "grand" as const,
);
const arbCategorieTaille_Grand = fc.constant("Grand" as const);

const arbTypeStructure_Privee = fc.constant("privee" as const);
const arbTypeEntitePublique = fc.constantFrom<TypeEntitePublique>(
  ...ValeursTypeEntitePublique,
);
export const arbLocalisationRepresentant_JamaisFrance = fc.constantFrom(
  "autre" as const,
  "horsue" as const,
);

export const arbFournitServiceUnionEuropeenne_ToujoursOui = fc.constant(
  "oui" as const,
);
export const arbFournitServiceUnionEuropeenne_ToujoursNon = fc.constant(
  "non" as const,
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
  trancheChiffreAffaire: arbTranchePetitMoyenGrand,
  trancheNombreEmployes: arbTrancheMoyenGrand,
});
const arbStructurePrivee_TrancheEmployesJamaisPetit = fc.record<
  ReponseStructurePrivee<"Grand">
>({
  _categorieTaille: fc.constant("Grand"),
  typeStructure: arbTypeStructure_Privee,
  trancheChiffreAffaire: arbTrancheMoyenGrand,
  trancheNombreEmployes: arbTranchePetitMoyenGrand,
});

export const arbStructureGrandPrive = fc.oneof(
  arbStructurePrivee_TrancheCAJamaisPetit,
  arbStructurePrivee_TrancheEmployesJamaisPetit,
);
export const arbStructurePetit = fc.oneof(
  arbStructurePetitPrive,
  arbStructurePetitPublic,
);
export const arbStructureGrand = fc.oneof(
  arbStructureGrandPrive,
  // arbStructurePetitPublic,
);
