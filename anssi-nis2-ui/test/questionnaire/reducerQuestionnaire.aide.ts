import { ActionQuestionnaire } from "../../src/questionnaire/actions";
import {
  etatParDefaut,
  EtatQuestionnaire,
  reducerQuestionnaire,
} from "../../src/questionnaire/reducerQuestionnaire";

export function executer(actions: ActionQuestionnaire[]): EtatQuestionnaire {
  return actions.reduce(
    (etat: EtatQuestionnaire, action: ActionQuestionnaire) =>
      reducerQuestionnaire(etat, action),
    etatParDefaut,
  );
}
