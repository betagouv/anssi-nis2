import React, { useEffect, useReducer, useState } from "react";

import { DefaultComponentExtensible } from "../../Services/Props";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { etatEtapesInitial } from "./Etapes/EtapesQuestionnaire.ts";
import { SimulateurEtapeSwitcherProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import { Helmet } from "react-helmet";
import { useReducteurDonneesFormulaireDuContexte } from "../AppContexte/UseReducteurDonneesFormulaireDuContexte.tsx";
import {
  fabriqueGestionPrecedent,
  fabriqueGestionSuivant,
} from "../../utilitaires/BoutonsNavigation.fabrique.ts";
import { SimulateurDonneesFormulaireActions } from "../../Services/Simulateur/Props/donneesFormulaire";

export const ChargeurEtape: DefaultComponentExtensible<
  SimulateurEtapeSwitcherProps
> = () => {
  const reducteurDonneesFormulaireSimulateur =
    useReducteurDonneesFormulaireDuContexte();

  const [etatEtapes, setEtatEtape] = useState(etatEtapesInitial);
  const [donneesFormulaireSimulateur, propageActionSimulateur]: [
    DonneesFormulaireSimulateur,
    React.Dispatch<SimulateurDonneesFormulaireActions>,
  ] = useReducer(
    reducteurDonneesFormulaireSimulateur,
    donneesFormulaireSimulateurVide,
  );

  const ElementRendu: SimulateurEtapeRenderedComponent =
    etatEtapes.contenuEtapeCourante().elementToRender;

  useEffect(() => {
    window._mtm.push({
      event: "EtapeFormulaire",
      "EtapeFormulaire.category": etatEtapes.contenuEtapeCourante().titre,
      "EtapeFormulaire.name": etatEtapes.contenuEtapeCourante().titre,
    });
  }, [etatEtapes]);

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
