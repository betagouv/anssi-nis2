import { useReducer, useRef } from "react";
import {
  etatParDefaut,
  EtatQuestionnaire,
  reducerQuestionnaire,
} from "../../questionnaire/reducerQuestionnaire.ts";
import { EtapePrealable } from "./EtapesRefacto/EtapePrealable.tsx";
import {
  ActionQuestionnaire,
  valideEtapeAppartenanceUE,
  valideEtapeDesignation,
  valideEtapePrealable,
  valideSecteursActivite,
  valideTailleEntitePrivee,
  valideTypeStructure,
} from "../../questionnaire/actions.ts";
import { EtapeDesignation } from "./EtapesRefacto/EtapeDesignation.tsx";
import { EtapeAppartenanceUE } from "./EtapesRefacto/EtapeAppartenanceUE.tsx";
import { EtapeTypeStructure } from "./EtapesRefacto/EtapeTypeStructure.tsx";
import { EtapeTailleEntitePrivee } from "./EtapesRefacto/EtapeTailleEntitePrivee.tsx";
import { EtapeSecteursActivite } from "./EtapesRefacto/EtapeSecteursActivite.tsx";

function executer(actions: ActionQuestionnaire[]): EtatQuestionnaire {
  return actions.reduce(
    (etat: EtatQuestionnaire, action: ActionQuestionnaire) =>
      reducerQuestionnaire(etat, action),
    etatParDefaut,
  );
}

export const Questionnaire = () => {
  const etatQuestionnaire: EtatQuestionnaire = useRef(
    executer([
      valideEtapePrealable(),
      valideEtapeDesignation(["non"]),
      valideEtapeAppartenanceUE(["france"]),
      valideTypeStructure(["privee"]),
      valideTailleEntitePrivee(["petit"], ["petit"]),
      valideSecteursActivite(["energie"]),
    ]),
  ).current;

  const [etat, dispatch] = useReducer(reducerQuestionnaire, etatQuestionnaire);

  switch (etat.etapeCourante) {
    case "prealable":
      return (
        <EtapePrealable onValider={() => dispatch(valideEtapePrealable())} />
      );
    case "designationOperateurServicesEssentiels":
      return (
        <EtapeDesignation
          onValider={(reponse) => dispatch(valideEtapeDesignation(reponse))}
        />
      );
    case "appartenanceUnionEuropeenne":
      return (
        <EtapeAppartenanceUE
          onValider={(reponse) => dispatch(valideEtapeAppartenanceUE(reponse))}
        />
      );
    case "typeStructure":
      return (
        <EtapeTypeStructure
          onValider={(reponse) => dispatch(valideTypeStructure(reponse))}
        />
      );
    case "tailleEntitePrivee":
      return (
        <EtapeTailleEntitePrivee
          onValider={(nombre, chiffreAffaire) =>
            dispatch(valideTailleEntitePrivee(nombre, chiffreAffaire))
          }
        />
      );
    case "secteursActivite":
      return (
        <EtapeSecteursActivite
          onValider={(reponse) => dispatch(valideSecteursActivite(reponse))}
        />
      );

    case "sousSecteursActivite":
      return <h3>SOUS-SECTEURS</h3>;

    case "resultat":
      return <h1>RÉSULTAT</h1>;
  }
};
