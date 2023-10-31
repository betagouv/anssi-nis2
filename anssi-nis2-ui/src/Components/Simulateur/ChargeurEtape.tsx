import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";

import { DefaultComponent } from "../../Services/Props";
import { donneesFormulaireSimulateurVide } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { etatEtapesInitial } from "./Etapes/EtapesQuestionnaire.ts";
import { useReducteurDonneesFormulaireDuContexte } from "../AppContexte/UseReducteurDonneesFormulaireDuContexte.tsx";
import { fabriqueInformationsBoutonsNavigation } from "../../utilitaires/BoutonsNavigation.fabrique.ts";
import { traceEtapeSimulateur } from "../../Services/TraceurWeb/traceEtapeSimulateur.ts";
import { AppContext } from "../AppContexte/AppContext.tsx";

const ChargeurEtapeCalcule: DefaultComponent = () => {
  const [donneesFormulaireSimulateur, propageActionSimulateur] = useReducer(
    useReducteurDonneesFormulaireDuContexte(),
    donneesFormulaireSimulateurVide,
  );
  const [etatEtapes, setEtatEtape] = useState(etatEtapesInitial);
  const { envoieDonneesFormulaire } = useContext(AppContext);

  const ElementRendu = etatEtapes.conteneurElement;

  const informationsBoutonsNavigation = fabriqueInformationsBoutonsNavigation(
    setEtatEtape,
    etatEtapes,
    donneesFormulaireSimulateur,
    envoieDonneesFormulaire,
  );

  useEffect(
    () => traceEtapeSimulateur(etatEtapes, donneesFormulaireSimulateur),
    [donneesFormulaireSimulateur, etatEtapes],
  );
  return (
    <>
      <Helmet>
        <title>
          MonEspaceNIS2 - Suis-je concerné·e ? -{" "}
          {etatEtapes.contenuEtapeCourante.titre}
        </title>
      </Helmet>
      <ElementRendu
        propageActionSimulateur={propageActionSimulateur}
        donneesFormulaire={donneesFormulaireSimulateur}
        informationsBoutonsNavigation={informationsBoutonsNavigation}
        etatEtapes={etatEtapes}
      />
    </>
  );
};

export const ChargeurEtape = React.memo(ChargeurEtapeCalcule);
