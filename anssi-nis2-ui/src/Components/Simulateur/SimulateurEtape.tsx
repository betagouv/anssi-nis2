import { DefaultComponentExtensible } from "../../Props.ts";
import React, { Reducer, useReducer } from "react";
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

const generateNewStateFrom = (
  state: SimulateurFormData,
  fieldName: SimulateurFieldNames,
  newFieldValue: string[],
) => ({ ...state, [fieldName]: newFieldValue });

const reducer: Reducer<
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
