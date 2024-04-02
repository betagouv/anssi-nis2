import { describe, expect, it } from "vitest";
import { quiSupporteUndo, undo } from "../../src/questionnaire/quiSupporteUndo";

type Incremente = { type: "+" };
const incremente = (): Incremente => ({ type: "+" });

const reducerPlusMoins = (etat: number, action: Incremente) => {
  switch (action.type) {
    case "+":
      return etat + 1;
    default:
      return etat;
  }
};

describe("Le reducer « Undo »", () => {
  it("connaît, pour ses tests, un reducer qui peut incrémenter un nombre", () => {
    expect(reducerPlusMoins(0, incremente())).toBe(1);
  });

  it("wrap un reducer existant sans rien faire de plus", () => {
    const supporteLeUndo = quiSupporteUndo(reducerPlusMoins, 0);

    expect(supporteLeUndo).not.toBe(undefined);
  });

  it("stocke les états précédents dans un champ `precedents`", () => {
    const plusMoinsAvecUndo = quiSupporteUndo(reducerPlusMoins, 0);

    const un = plusMoinsAvecUndo(undefined, incremente());
    const deux = plusMoinsAvecUndo(un, incremente());

    expect(deux.precedents).toEqual([1, 0]);
    expect(deux.courant).toEqual(2);
  });

  it("permet de revenir à l'état précédent avec une action dédiée", () => {
    const plusMoinsAvecUndo = quiSupporteUndo(reducerPlusMoins, 0);

    const un = plusMoinsAvecUndo(undefined, incremente());
    const deux = plusMoinsAvecUndo(un, incremente());
    const apresUndo = plusMoinsAvecUndo(deux, undo());

    expect(apresUndo.courant).toBe(1);
    expect(apresUndo.precedents).toEqual([0]);
  });
});
