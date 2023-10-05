import React, { useContext, useReducer, useState } from "react";

import { DefaultComponentExtensible } from "../../Services/Props.ts";
import { SimulateurEtapeSwitcherProps } from "../../Services/Simulateur/props.ts";
import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import { AppContext } from "../../AppContext.tsx";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/component.ts";
import { etatEtapesInitial } from "./EtapesQuestionnaire.ts";
import { EtatEtapes } from "../../Services/Simulateur/EtatEtapes.ts";

const useReducteurDonneesFormulaireDuContexte = () => {
  const {
    simulateur: { reducerFormData },
  } = useContext(AppContext);

  return reducerFormData;
};

export const ChargeurEtape: DefaultComponentExtensible<
  SimulateurEtapeSwitcherProps
> = () => {
  const reducteurDonneesFormulaireSimulateur =
    useReducteurDonneesFormulaireDuContexte();

  const [etatEtapes, setEtatEtape] = useState(etatEtapesInitial);
  const [donneesFormulaireSimulateur, propageActionSimulateur] = useReducer(
    reducteurDonneesFormulaireSimulateur,
    donneesFormulaireSimulateurVide,
  );

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
      donneesFormulaireSimulateur={donneesFormulaireSimulateur}
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
