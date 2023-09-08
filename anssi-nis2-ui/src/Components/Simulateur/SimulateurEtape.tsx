import { DefaultComponentExtensible } from "../../Props.ts";
import React, { Reducer, useEffect, useReducer } from "react";
import {
  emptySimulateurFormData,
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/simulateurFrontServices.ts";
import {
  SimulateurDonneesFormulaireActions,
  SimulateurEtapeProps,
  SimulateurEtapeRenderedComponent,
} from "./simulateurProps.ts";
import { fieldHandlers } from "./HandleValue.ts";

function generateNewStateFrom(
  state: SimulateurFormData,
  fieldName:
    | "etatMembre"
    | "typeStructure"
    | "trancheNombreEmployes"
    | "trancheCA"
    | "secteurActivite",
  newFieldValue: string[],
) {
  return { ...state, [fieldName]: newFieldValue };
}

const reducer: Reducer<
  SimulateurFormData,
  SimulateurDonneesFormulaireActions
> = (state, action) => {
  switch (action.type) {
    case "checkSingle":
      return generateNewStateFrom(state, action.name, [action.newValue]);
    case "checkMulti":
      return generateNewStateFrom(
        state,
        action.name,
        fieldHandlers[action.name](action.newValue, state),
      );
    default:
      throw Error("Unknown action: " + action.type);
  }
};

export const SimulateurEtape: DefaultComponentExtensible<
  SimulateurEtapeProps
> = ({
  etapeCourante,
  etapePrecedenteHandler,
  etapeSuivanteHandler,
  listeEtapes,
}: SimulateurEtapeProps) => {
  const [inputsState, propageActionSimulateur] = useReducer(
    reducer,
    emptySimulateurFormData,
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { name, value } = evt.target;
    const fieldName = name as SimulateurFieldNames;
    propageActionSimulateur({
      type: "checkMulti",
      name: fieldName,
      newValue: value,
    });
  };

  useEffect(() => {
    console.log(`after reducer : ${JSON.stringify(inputsState)}`);
  }, [inputsState]);

  const ElementRendered: SimulateurEtapeRenderedComponent =
    listeEtapes[etapeCourante].elementToRender;
  return (
    <ElementRendered
      listeEtapes={listeEtapes}
      etapeCourante={etapeCourante}
      propageActionSimulateur={propageActionSimulateur}
      handleChange={handleChange}
      formData={inputsState}
      etapePrecedenteHandler={etapePrecedenteHandler}
      etapeSuivanteHandler={etapeSuivanteHandler}
    />
  );
};
