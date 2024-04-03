import { ActionQuestionnaire, ActionUndo } from "./actions.ts";
import { EtatQuestionnaire } from "./reducerQuestionnaire.ts";

type AvecUndo<TEtat extends EtatQuestionnaire> = {
  precedents: TEtat[];
  courant: TEtat;
};

const fabriqueEtatAvecUndo = <TEtat extends EtatQuestionnaire>(
  courant: TEtat,
  precedents: TEtat[] = [],
): AvecUndo<TEtat> => ({
  courant,
  precedents,
});

export const quiSupporteUndo =
  <
    TEtat extends EtatQuestionnaire,
    TAction extends Pick<ActionQuestionnaire, "type">,
  >(
    reducerWrappe: (etat: TEtat, action: TAction) => TEtat,
    etatInitial: TEtat,
  ): ((etat: AvecUndo<TEtat>, action: TAction) => AvecUndo<TEtat>) =>
  (
    etat: AvecUndo<TEtat> = fabriqueEtatAvecUndo(etatInitial),
    action: TAction,
  ) => {
    if (action.type === "UNDO") {
      const [precedent, ...ancetres] = etat.precedents;
      return fabriqueEtatAvecUndo(precedent, ancetres);
    }

    return fabriqueEtatAvecUndo(reducerWrappe(etat.courant, action), [
      etat.courant,
      ...etat.precedents,
    ]);
  };

export const undo = (): ActionUndo => ({ type: "UNDO" });
