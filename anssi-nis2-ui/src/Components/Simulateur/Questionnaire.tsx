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
} from "../../questionnaire/actions.ts";
import { EtapeDesignation } from "./EtapesRefacto/EtapeDesignation.tsx";
import { EtapeAppartenanceUE } from "./EtapesRefacto/EtapeAppartenanceUE.tsx";

export const Questionnaire = () => {
  const [etat, dispatch] = useReducer(reducerQuestionnaire, etatParDefaut);

  if (etat.etapeCourante === "prealable")
    return (
      <EtapePrealable onValider={() => dispatch(valideEtapePrealable())} />
    );

  if (etat.etapeCourante === "designationOperateurServicesEssentiels")
    return (
      <EtapeDesignation
        onValider={(reponse) => dispatch(valideEtapeDesignation(reponse))}
      />
    );

  if (etat.etapeCourante === "appartenanceUnionEuropeenne")
    return (
      <EtapeAppartenanceUE
        onValider={(reponse) => dispatch(valideEtapeAppartenanceUE(reponse))}
      />
    );
};
