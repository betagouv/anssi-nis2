import { fc } from "@fast-check/vitest";
import {
  InformationSecteurSimple,
  ReponseInformationsSecteur,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import { CategorieTaille } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";

export const fabriqueArbitraireCapsuleSecteur =
  <T extends CategorieTaille>(taille: `${T}`) =>
  (
    arb: fc.Arbitrary<Set<InformationSecteurSimple>>,
  ): fc.Arbitrary<ReponseInformationsSecteur<T>> =>
    arb.chain((info) =>
      fc.record({
        _categorieTaille: fc.constant(taille),
        secteurs: fc.constant(info),
      }),
    );
export const fabriqueArbitraireCapsuleSecteurPetit =
  fabriqueArbitraireCapsuleSecteur("Petit");
export const fabriqueArbitraireCapsuleSecteurMoyen =
  fabriqueArbitraireCapsuleSecteur("Moyen");
export const fabriqueArbitraireCapsuleSecteurGrand =
  fabriqueArbitraireCapsuleSecteur("Grand");
