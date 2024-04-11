import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { donneesFormulaireSimulateurVide } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.constantes.ts";

import { DefaultComponent } from "../../Services/Props";
import { etatEtapesInitial } from "./Etapes/EtapesQuestionnaire.ts";
import { useReducteurDonneesFormulaireDuContexte } from "../../Services/AppContexte/AppContext.operations.ts";
import { fabriqueInformationsBoutonsNavigation } from "../../Services/fabriques/BoutonsNavigation.fabrique.ts";
import { traceEtapeSimulateur } from "../../Services/TraceurWeb/traceEtapeSimulateur.ts";
import { cartoComposants } from "../../Services/Simulateur/Transformateurs/TypeEtapeVersComposantEtape.transformateur.ts";
import { Questionnaire } from "./Questionnaire.tsx";
import { AppContext } from "../../Services/AppContexte/AppContext.definition.ts";
import { quiSupporteUndo } from "../../questionnaire/quiSupporteUndo.ts";
import {
  etatParDefaut,
  reducerQuestionnaire,
} from "../../questionnaire/reducerQuestionnaire.ts";
import { TitresEtapes } from "./TitresEtapes.ts";

const ChargeurEtapeCalcule: DefaultComponent = () => {
  const [donneesFormulaireSimulateur, propageActionSimulateur] = useReducer(
    useReducteurDonneesFormulaireDuContexte(),
    donneesFormulaireSimulateurVide,
  );
  const [etatEtapes, setEtatEtape] = useState(etatEtapesInitial);
  const { envoieDonneesFormulaire } = useContext(AppContext);

  const ElementRendu = cartoComposants[etatEtapes.typeEtapeCourante].conteneur;

  const informationsBoutonsNavigation = fabriqueInformationsBoutonsNavigation(
    setEtatEtape,
    etatEtapes,
    donneesFormulaireSimulateur,
    envoieDonneesFormulaire,
  );

  const [etatQuestionnaire, dispatchQuestionnaire] = useReducer(
    quiSupporteUndo(reducerQuestionnaire, etatParDefaut),
    { courant: etatParDefaut, precedents: [] },
  );

  useEffect(
    () => traceEtapeSimulateur(etatEtapes, donneesFormulaireSimulateur),
    [donneesFormulaireSimulateur, etatEtapes],
  );

  const versionQuestionnaire =
    import.meta.env.VITE_VERSION_QUESTIONNAIRE || "v1";
  const afficheQuestionnaireV1 = versionQuestionnaire === "v1";
  const afficheQuestionnaireV2 = versionQuestionnaire === "v2";
  const afficheLesDeux = versionQuestionnaire === "all";

  return (
    <>
      <Helmet>
        <title>
          MonEspaceNIS2 - Suis-je concerné ? -{" "}
          {afficheQuestionnaireV1 ? etatEtapes.contenuEtapeCourante.titre : ""}
          {afficheQuestionnaireV2
            ? TitresEtapes[etatQuestionnaire.courant.etapeCourante]
            : ""}
        </title>
      </Helmet>
      <div id="debutForm"></div>
      {(afficheQuestionnaireV1 || afficheLesDeux) && (
        <ElementRendu
          propageActionSimulateur={propageActionSimulateur}
          donneesFormulaire={donneesFormulaireSimulateur}
          informationsBoutonsNavigation={informationsBoutonsNavigation}
          etatEtapes={etatEtapes}
        />
      )}
      {(afficheQuestionnaireV2 || afficheLesDeux) && (
        <Questionnaire
          etat={etatQuestionnaire.courant}
          dispatch={dispatchQuestionnaire}
          envoieDonneesFormulaire={envoieDonneesFormulaire}
        />
      )}
    </>
  );
};

export const ChargeurEtape = React.memo(ChargeurEtapeCalcule);
