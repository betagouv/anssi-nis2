import React, { useContext, useReducer } from "react";
import { Helmet } from "react-helmet";
import { DefaultComponent } from "../../Services/Props";
import { Questionnaire } from "./Questionnaire.tsx";
import { AppContext } from "../../Services/AppContexte/AppContext.definition.ts";
import { quiSupporteUndo } from "../../questionnaire/quiSupporteUndo.ts";
import {
  etatParDefaut,
  reducerQuestionnaire,
} from "../../questionnaire/reducerQuestionnaire.ts";
import { TitresEtapes } from "./TitresEtapes.ts";

const ChargeurEtapeCalcule: DefaultComponent = () => {
  const { envoieDonneesFormulaire } = useContext(AppContext);

  const [etatQuestionnaire, dispatchQuestionnaire] = useReducer(
    quiSupporteUndo(reducerQuestionnaire, etatParDefaut),
    { courant: etatParDefaut, precedents: [] },
  );

  return (
    <>
      <Helmet>
        <title>
          MonEspaceNIS2 - Suis-je concerné ? -{" "}
          {TitresEtapes[etatQuestionnaire.courant.etapeCourante]}
        </title>
      </Helmet>
      <div id="debutForm"></div>
      <Questionnaire
        etat={etatQuestionnaire.courant}
        dispatch={dispatchQuestionnaire}
        envoieDonneesFormulaire={envoieDonneesFormulaire}
      />
      )
    </>
  );
};

export const ChargeurEtape = React.memo(ChargeurEtapeCalcule);
