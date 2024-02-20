import {
  InformationSecteurPossible,
  ReponseEtatInformationsSecteur,
  UnionReponseEtatNonVide,
} from "./Reponse.definitions";

export const eqInformationsSecteur = (
  a: InformationSecteurPossible,
  b: InformationSecteurPossible,
) => a.secteurActivite === b.secteurActivite;
export const estReponseEtatInformationsSecteur = (
  rep: UnionReponseEtatNonVide | ReponseEtatInformationsSecteur,
): rep is ReponseEtatInformationsSecteur => rep._tag === "InformationsSecteur";