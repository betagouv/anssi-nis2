type AvecUndo<TEtat> = { precedents: TEtat[]; courant: TEtat };

export function quiSupporteUndo<TEtat, TAction extends { type: string }>(
  reducerWrappe: (etat: TEtat, action: TAction) => TEtat,
  etatInitial: TEtat,
): (etat: AvecUndo<TEtat>, action: TAction | ActionUndo) => AvecUndo<TEtat> {
  const etatUndoInitial = { precedents: [], courant: etatInitial };

  return (
    etat: AvecUndo<TEtat> = etatUndoInitial,
    action: TAction | ActionUndo,
  ) => {
    if (action.type === "UNDO") {
      const [precedent, ...ancetres] = etat.precedents;
      return { courant: precedent, precedents: ancetres };
    }

    const nouvelEtat = reducerWrappe(etat.courant, action as TAction);
    return {
      precedents: [etat.courant, ...etat.precedents],
      courant: nouvelEtat,
    };
  };
}

export type ActionUndo = { type: "UNDO" };
export const undo = (): ActionUndo => ({ type: "UNDO" });
