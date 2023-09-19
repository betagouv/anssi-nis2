import React, { useContext, useEffect, useReducer, useState } from "react";

import { DefaultComponentExtensible } from "../../Services/Props.ts";
import { SimulateurEtapeSwitcherProps } from "../../Services/Simulateur/props.ts";
import { donneesFormulaireSimulateurVide } from "../../Services/Simulateur/donneesFormulaire.ts";
import { AppContext } from "../../AppContext.tsx";
import { noRefClick } from "../../Services/Echaffaudages/AssistantsEchaffaudages.ts";
import { SimulateurEtapeRenderedComponent } from "../../Services/Simulateur/component.ts";
import { etatEtapesInitial } from "./EtapesQuestionnaire.ts";
import { VVV } from "../../utilitaires/debug.ts";

export const ChargeurEtape: DefaultComponentExtensible<
  SimulateurEtapeSwitcherProps
> = () => {
  const {
    simulateur: { reducerFormData, reducerBoutons },
  } = useContext(AppContext);

  const [etatEtapes, setEtatEtape] = useState(etatEtapesInitial);
  const [inputsState, propageActionSimulateur] = useReducer(
    reducerFormData,
    donneesFormulaireSimulateurVide,
  );

  const [gestionClicBoutons, propageGestionClicBoutons] = useReducer(
    reducerBoutons,
    {
      suivant: noRefClick,
      precedent: noRefClick,
    },
  );

  const ElementRendered: SimulateurEtapeRenderedComponent =
    etatEtapes.contenuEtapeCourante().elementToRender;

  useEffect(() => {
    propageGestionClicBoutons({
      bouton: "suivant",
      newHandler: (e: React.MouseEvent) => {
        e.preventDefault();
        VVV("Appel de 'suivant'");
        setEtatEtape(etatEtapes.suivant(inputsState));
      },
    });
    propageGestionClicBoutons({
      bouton: "precedent",
      newHandler: (e: React.MouseEvent) => {
        e.preventDefault();
        VVV("Appel de 'précédent'");
        setEtatEtape(etatEtapes.precedent(inputsState));
      },
    });
  }, [etatEtapes, inputsState]);

  return (
    <ElementRendered
      propageActionSimulateur={propageActionSimulateur}
      formData={inputsState}
      informationsBoutonsNavigation={gestionClicBoutons}
      etatEtapes={etatEtapes}
    />
  );
};
