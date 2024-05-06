import { EtatQuestionnaire } from "../reducerQuestionnaire.ts";
import { ResultatEligibilite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import { LecteurDeSpecifications } from "./LecteurDeSpecifications.ts";

export function evalueEligibilite(
  reponses: EtatQuestionnaire,
  cheminCsv: string,
): ResultatEligibilite {
  const lecteur = new LecteurDeSpecifications();
  const specifications = lecteur.lis(cheminCsv);

  const premierPassant = specifications.find(
    (s) => s.evalue(reponses) !== undefined,
  );

  if (!premierPassant) {
    const detail = JSON.stringify(reponses);
    throw new Error(
      `Aucune spécification ne correspond au questionnaire. ${detail}`,
    );
  }

  return premierPassant.resultat();
}
