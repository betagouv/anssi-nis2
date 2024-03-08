import { fc } from "@fast-check/vitest";
import {
  InformationsSecteurPossible,
  ReponseInformationsSecteur,
} from "../../src/Domain/Simulateur/services/Eligibilite/ReponseInformationsSecteur.predicats";
import { CategorieTaille } from "../../src/Domain/Simulateur/services/Eligibilite/ReponseStructure.definitions";
import { Arbitraire as A } from "../utilitaires/Arbitraires.operations";

export const fabriqueArb_ReponseInformationsSecteur_PourTaille = <
  T extends CategorieTaille,
>(
  taille: `${T}`,
) =>
  A.enchaine<
    Set<InformationsSecteurPossible<T>>,
    ReponseInformationsSecteur<T>
  >((info) =>
    fc.record({
      _categorieTaille: fc.constant(taille),
      secteurs: fc.constant(info),
    }),
  );
export const fabriqueArb_ReponseInformationsSecteur_PE =
  fabriqueArb_ReponseInformationsSecteur_PourTaille("Petit");
export const fabriqueArb_ReponseInformationsSecteur_ME =
  fabriqueArb_ReponseInformationsSecteur_PourTaille("Moyen");
export const fabriqueArb_ReponseInformationsSecteur_GE =
  fabriqueArb_ReponseInformationsSecteur_PourTaille("Grand");
