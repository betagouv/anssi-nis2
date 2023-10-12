import React, { useContext, useReducer, useState } from "react";

import { DefaultComponentExtensible } from "../../Services/Props";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { AppContext } from "../../AppContext.tsx";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/Props/component";
import { etatEtapesInitial } from "./Etapes/EtapesQuestionnaire.ts";
import { EtatEtapes } from "../../Services/Simulateur/EtatEtapes.ts";
import { SimulateurEtapeSwitcherProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";

const useReducteurDonneesFormulaireDuContexte = () => {
  const {
    simulateur: { reducteurDonneesFormulaire },
  } = useContext(AppContext);

  return reducteurDonneesFormulaire;
};

export const ChargeurEtape: DefaultComponentExtensible<
  SimulateurEtapeSwitcherProps
> = () => {
  const reducteurDonneesFormulaireSimulateur =
    useReducteurDonneesFormulaireDuContexte();

  const [etatEtapes, setEtatEtape] = useState(etatEtapesInitial);
  const [donneesFormulaireSimulateur, propageActionSimulateur]: [
    DonneesFormulaireSimulateur,
    React.DispatchWithoutAction,
  ] = useReducer(
    reducteurDonneesFormulaireSimulateur,
    donneesFormulaireSimulateurVide,
  ) as [DonneesFormulaireSimulateur, React.DispatchWithoutAction];

  const fabriqueGestionSuivant = React.useCallback(
    (
      setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
      etatEtapes: EtatEtapes,
      inputsState: DonneesFormulaireSimulateur,
    ) =>
      (e: React.MouseEvent) => {
        e.preventDefault();
        setEtatEtape(etatEtapes.suivant(inputsState));
      },
    [],
  );

  const fabriqueGestionPrecedent = React.useCallback(
    (
      setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
      etatEtapes: EtatEtapes,
      inputsState: DonneesFormulaireSimulateur,
    ) =>
      (e: React.MouseEvent) => {
        e.preventDefault();
        setEtatEtape(etatEtapes.precedent(inputsState));
      },
    [],
  );

  const ElementRendu: SimulateurEtapeRenderedComponent =
    etatEtapes.contenuEtapeCourante().elementToRender;

  return (
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
  );
};
