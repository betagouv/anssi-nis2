import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import { donneesFormulaireSimulateurVide } from "../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.constantes.ts";

import { DefaultComponent } from "../../Services/Props";
import { etatEtapesInitial } from "./Etapes/EtapesQuestionnaire.ts";
import { useReducteurDonneesFormulaireDuContexte } from "../../Services/AppContexte/AppContext.operations.ts";
import { fabriqueInformationsBoutonsNavigation } from "../../Services/Simulateur/BoutonsNavigation.fabrique.ts";
import { traceEtapeSimulateur } from "../../Services/TraceurWeb/traceEtapeSimulateur.ts";
import { AppContext } from "../../Services/AppContexte/AppContext.definition.ts";
import { cartoComposants } from "../../Services/Simulateur/Transformateurs/TypeEtapeVersComposantEtape.transformateur.ts";

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

  useEffect(
    () => traceEtapeSimulateur(etatEtapes, donneesFormulaireSimulateur),
    [donneesFormulaireSimulateur, etatEtapes],
  );
  return (
    <>
      <Helmet>
        <title>
          MonEspaceNIS2 - Suis-je concerné ? -{" "}
          {etatEtapes.contenuEtapeCourante.titre}
        </title>
      </Helmet>
      <div id="debutForm"></div>
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
