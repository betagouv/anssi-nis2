import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { donneesFormulaireSimulateurVide } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes.ts";

import { DefaultComponent } from "../../Services/Props";
import { etatEtapesInitial } from "./Etapes/EtapesQuestionnaire.ts";
import { useReducteurDonneesFormulaireDuContexte } from "../../Services/AppContexte/AppContext.operations.ts";
import { traceEtapeSimulateur } from "../../Services/TraceurWeb/traceEtapeSimulateur.ts";
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

  const [donneesFormulaireSimulateur] = useReducer(
    useReducteurDonneesFormulaireDuContexte(),
    donneesFormulaireSimulateurVide,
  );
  const [etatEtapes] = useState(etatEtapesInitial);

  const [etatQuestionnaire, dispatchQuestionnaire] = useReducer(
    quiSupporteUndo(reducerQuestionnaire, etatParDefaut),
    { courant: etatParDefaut, precedents: [] },
  );

  useEffect(
    () => traceEtapeSimulateur(etatEtapes, donneesFormulaireSimulateur),
    [donneesFormulaireSimulateur, etatEtapes],
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
