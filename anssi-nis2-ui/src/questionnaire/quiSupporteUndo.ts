type AvecUndo<TEtat> = {
  precedents: TEtat[];
  courant: TEtat;
};

export type ActionUndo = { type: "UNDO" };

const fabriqueEtatAvecUndo = <TEtat>(
  courant: TEtat,
  precedents: TEtat[] = [],
): AvecUndo<TEtat> => ({
  courant,
  precedents,
});

export const quiSupporteUndo =
  <TEtat, TAction extends { type: string }>(
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
