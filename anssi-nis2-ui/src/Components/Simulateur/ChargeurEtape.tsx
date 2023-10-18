import React, { useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";

import { DefaultComponent } from "../../Services/Props";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { ResultatReducteurDonneesSimulateur } from "../../Services/Simulateur/Props/donneesFormulaire";
import { donneesFormulaireSimulateurVide } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { etatEtapesInitial } from "./Etapes/EtapesQuestionnaire.ts";
import { useReducteurDonneesFormulaireDuContexte } from "../AppContexte/UseReducteurDonneesFormulaireDuContexte.tsx";
import {
  fabriqueGestionPrecedent,
  fabriqueGestionSuivant,
} from "../../utilitaires/BoutonsNavigation.fabrique.ts";
import { traceEtapeSimulateur } from "../../Services/TraceurWeb/traceEtapeSimulateur.ts";

const ChargeurEtapeCalcule: DefaultComponent = () => {
  const reducteurDonneesFormulaireSimulateur =
    useReducteurDonneesFormulaireDuContexte();

  const [etatEtapes, setEtatEtape] = useState(etatEtapesInitial);
  const [
    donneesFormulaireSimulateur,
    propageActionSimulateur,
  ]: ResultatReducteurDonneesSimulateur = useReducer(
    reducteurDonneesFormulaireSimulateur,
    donneesFormulaireSimulateurVide,
  );

  const ElementRendu: SimulateurEtapeRenderedComponent =
    etatEtapes.contenuEtapeCourante().elementToRender;

  useEffect(
    () => traceEtapeSimulateur(etatEtapes, donneesFormulaireSimulateur),
    [donneesFormulaireSimulateur, etatEtapes],
  );

  return (
    <>
      <Helmet>
        <title>
          MonEspaceNIS2 - Suis-je concerné·e ? -{" "}
          {etatEtapes.contenuEtapeCourante().titre}
        </title>
      </Helmet>
      <ElementRendu
        propageActionSimulateur={propageActionSimulateur}
        donneesFormulaire={donneesFormulaireSimulateur}
        informationsBoutonsNavigation={{
          suivant: fabriqueGestionSuivant(
            setEtatEtape,
            etatEtapes,
            donneesFormulaireSimulateur,
          ),
          precedent: fabriqueGestionPrecedent(
            setEtatEtape,
            etatEtapes,
            donneesFormulaireSimulateur,
          ),
        }}
        etatEtapes={etatEtapes}
      />
    </>
  );
};

export const ChargeurEtape = React.memo(ChargeurEtapeCalcule);
