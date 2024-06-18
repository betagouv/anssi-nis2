import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { LecteurDeSpecifications } from "./LecteurDeSpecifications.ts";

export function evalueEligibilite(
  reponses: EtatQuestionnaire,
  cheminCsv: string,
): ResultatEligibilite {
  const lecteur = new LecteurDeSpecifications();
  const specifications = lecteur.lis(cheminCsv);
  return specifications.premierPassant(reponses);
}
