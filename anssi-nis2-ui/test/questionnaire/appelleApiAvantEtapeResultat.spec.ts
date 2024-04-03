import { beforeEach, describe, expect, it, vitest } from "vitest";
import { ActionQuestionnaire } from "../../src/questionnaire/actions";
import { quiAppelleFonctionAvantResultat } from "../../src/questionnaire/appelleApiAvantEtapeResultat";
import {
  etatParDefaut,
  EtatQuestionnaire,
} from "../../src/questionnaire/reducerQuestionnaire";

const listeActions: Pick<ActionQuestionnaire, "type">[] = [
  { type: "VIDE" },
  { type: "VALIDE_ETAPE_PREALABLE" },
  { type: "VALIDE_ETAPE_ACTIVITES" },
];

const listeEtats: EtatQuestionnaire[] = [
  {
    ...etatParDefaut,
    etapeCourante: "prealable",
  },
  {
    ...etatParDefaut,
    etapeCourante: "activites",
  },
  {
    ...etatParDefaut,
    etapeCourante: "resultat",
  },
];

const reducerTroisEtats: (
  etat: EtatQuestionnaire,
  action: Pick<ActionQuestionnaire, "type">,
) => EtatQuestionnaire = (
  etat: EtatQuestionnaire,
  action: Pick<ActionQuestionnaire, "type">,
) => {
  switch (action.type) {
    case listeActions[1].type:
      return {
        ...etat,
        etapeCourante: listeEtats[1].etapeCourante,
      };
    case listeActions[2].type:
      return {
        ...etat,
        etapeCourante: listeEtats[2].etapeCourante,
      };
    default:
      return etat;
  }
};

describe("reducer appelle fonction sur transition vers « resultat »", () => {
  const fonctionAppelee = vitest.fn();
  const quiAppelleFonction = quiAppelleFonctionAvantResultat(
    listeEtats[2].etapeCourante,
    fonctionAppelee,
  )(reducerTroisEtats);

  beforeEach(() => {
    fonctionAppelee.mockClear();
  });

  it("wrap une action et la rend sans appeler la fonction", () => {
    const resultatReduit = quiAppelleFonction(listeEtats[0], listeActions[0]);

    expect(resultatReduit).toStrictEqual(listeEtats[0]);
    expect(fonctionAppelee).not.toHaveBeenCalled();
  });

  it("wrap une action et appelle la fonction hook sur transition vers resultat", () => {
    const resultatReduit = quiAppelleFonction(listeEtats[0], listeActions[2]);

    expect(resultatReduit).toStrictEqual(listeEtats[2]);
    expect(fonctionAppelee).toHaveBeenCalledWith(resultatReduit);
  });
});
