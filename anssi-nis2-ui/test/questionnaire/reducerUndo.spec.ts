import { describe, expect, it } from "vitest";
import { ActionQuestionnaire } from "../../src/questionnaire/actions";
import {
  ActionUndo,
  quiSupporteUndo,
  undo,
} from "../../src/questionnaire/quiSupporteUndo";
import { etatParDefaut } from "../../src/questionnaire/reducerQuestionnaire";
import { EtatQuestionnaire } from "../../../commun/core/src/Domain/Questionnaire/EtatQuestionnaire";

const listeActions: Pick<ActionQuestionnaire | ActionUndo, "type">[] = [
  { type: "VIDE" },
  { type: "VALIDE_ETAPE_PREALABLE" },
  { type: "VALIDE_ETAPE_SECTEURS_ACTIVITE" },
];

const listeEtats: EtatQuestionnaire[] = [
  {
    ...etatParDefaut,
    etapeCourante: "prealable",
  },
  {
    ...etatParDefaut,
    etapeCourante: "designationOperateurServicesEssentiels",
  },
  {
    ...etatParDefaut,
    etapeCourante: "activites",
  },
];

const reducerTroisEtats = (
  etat: EtatQuestionnaire,
  action: Pick<ActionQuestionnaire | ActionUndo, "type">,
) => {
  switch (action.type) {
    case "VALIDE_ETAPE_PREALABLE":
      return {
        ...etatParDefaut,
        etapeCourante: "designationOperateurServicesEssentiels",
      };
    case "VALIDE_ETAPE_SECTEURS_ACTIVITE":
      return {
        ...etatParDefaut,
        etapeCourante: "activites",
      };
    default:
      return etat;
  }
};

describe("Le reducer « Undo »", () => {
  it("connaît, pour ses tests, un reducer qui peut incrémenter un nombre", () => {
    expect(reducerTroisEtats(listeEtats[0], listeActions[1])).toStrictEqual(
      listeEtats[1],
    );
  });

  const reducerAvecUndo = quiSupporteUndo(reducerTroisEtats, listeEtats[0]);

  it("wrap un reducer existant sans rien faire de plus", () => {
    expect(reducerAvecUndo).not.toBe(undefined);
  });

  it("stocke les états précédents dans un champ `precedents`", () => {
    const un = reducerAvecUndo(undefined, listeActions[1]);
    const deux = reducerAvecUndo(un, listeActions[2]);

    expect(deux.precedents).toStrictEqual([listeEtats[1], listeEtats[0]]);
    expect(deux.courant).toStrictEqual(listeEtats[2]);
  });

  it("permet de revenir à l'état précédent avec une action dédiée", () => {
    const un = reducerAvecUndo(undefined, listeActions[1]);
    const deux = reducerAvecUndo(un, listeActions[2]);
    const apresUndo = reducerAvecUndo(deux, undo());

    expect(apresUndo.courant).toStrictEqual(listeEtats[1]);
    expect(apresUndo.precedents).toStrictEqual([listeEtats[0]]);
  });
});
