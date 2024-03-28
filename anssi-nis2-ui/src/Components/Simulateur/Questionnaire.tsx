import { useReducer } from "react";
import {
  etatParDefaut,
  reducerQuestionnaire,
} from "../../questionnaire/reducerQuestionnaire.ts";
import { EtapePrealable } from "./EtapesRefacto/EtapePrealable.tsx";
import {
  valideEtapeAppartenanceUE,
  valideEtapeDesignation,
  valideEtapePrealable,
  valideTailleEntitePrivee,
  valideTypeStructure,
} from "../../questionnaire/actions.ts";
import { EtapeDesignation } from "./EtapesRefacto/EtapeDesignation.tsx";
import { EtapeAppartenanceUE } from "./EtapesRefacto/EtapeAppartenanceUE.tsx";
import { EtapeTypeStructure } from "./EtapesRefacto/EtapeTypeStructure.tsx";
import { EtapeTailleEntitePrivee } from "./EtapesRefacto/EtapeTailleEntitePrivee.tsx";

export const Questionnaire = () => {
  const [etat, dispatch] = useReducer(reducerQuestionnaire, etatParDefaut);

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
  }
};
