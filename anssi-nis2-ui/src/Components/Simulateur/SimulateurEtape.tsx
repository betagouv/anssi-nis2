import { DefaultComponentExtensible } from "../../Props.ts";
import React, { Reducer, useEffect, useReducer } from "react";
import {
  BoutonsNavigation,
  SimulateurDonneesFormulaireActions,
  SimulateurEtapeRenderedComponent,
  SimulateurEtapeSwitcherProps,
} from "./simulateurProps.ts";
import { fieldHandlers } from "./HandleValue.ts";
import { etapesQuestionnaire } from "../../EtapesQuestionnaire.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.ts";
import {
  emptySimulateurFormData,
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/Simulateur/FormData.ts";

const generateNewStateFrom = (
  state: SimulateurFormData,
  fieldName: SimulateurFieldNames,
  newFieldValue: string[],
) => ({ ...state, [fieldName]: newFieldValue });

const reducerFormData: Reducer<
  SimulateurFormData,
  SimulateurDonneesFormulaireActions
> = (state, { name, newValue, type }) => {
  switch (type) {
    case "checkSingle":
      return generateNewStateFrom(state, name, [newValue]);
    case "checkMulti":
      return generateNewStateFrom(
        state,
        name,
        fieldHandlers[name](newValue, state),
      );
    default:
      throw Error(`Unknown action: ${type}`);
  }
};

const reducerBoutons: Reducer<
  BoutonsNavigation,
  {
    bouton: "precedent" | "suivant";
    newHandler: React.MouseEventHandler;
  }
> = (state, { bouton, newHandler }) => {
  switch (bouton) {
    case "precedent":
      return { ...state, precedent: newHandler };
    case "suivant":
      return { ...state, suivant: newHandler };
    default:
      throw Error(`Unknown action: ${bouton}`);
  }
};

export const SimulateurEtape: DefaultComponentExtensible<
  SimulateurEtapeSwitcherProps
> = ({
  etapeCourante,
  listeEtapes,
  soumissionEtape,
}: SimulateurEtapeSwitcherProps) => {
  const [inputsState, propageActionSimulateur] = useReducer(
    reducerFormData,
    emptySimulateurFormData,
  );

  const [gereClickBouton, propageHandlerClickBouton] = useReducer(
    reducerBoutons,
    {
      suivant: noRefClick,
      precedent: noRefClick,
    },
  );

  useEffect(() => {
    propageHandlerClickBouton({
      bouton: "suivant",
      newHandler: soumissionEtape(
        (etape) => etape < etapesQuestionnaire.length,
        (etape) => etape + 1,
      ),
    });
    propageHandlerClickBouton({
      bouton: "precedent",
      newHandler: soumissionEtape(
        (etape) => etape >= 0,
        (etape) => etape - 1,
      ),
    });
  }, [etapeCourante, soumissionEtape]);

  const ElementRendered: SimulateurEtapeRenderedComponent =
    listeEtapes[etapeCourante].elementToRender;

  return (
    <ElementRendered
      listeEtapes={listeEtapes}
      etapeCourante={etapeCourante}
      propageActionSimulateur={propageActionSimulateur}
      formData={inputsState}
      gereClickBouton={gereClickBouton}
    />
  );
};
