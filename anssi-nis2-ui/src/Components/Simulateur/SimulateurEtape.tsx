import { DefaultComponentExtensible, FormValueHandler } from "../../Props.ts";
import React, { useState } from "react";
import {
  emptySimulateurFormData,
  SimulateurEtapeProps,
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/simulateurFrontServices.ts";
import { SimulateurEtapeForm } from "./SimulateurEtapeForm.tsx";
import { SimulateurEtape6Resultat } from "./index.ts";

export const SimulateurEtape: DefaultComponentExtensible<
  SimulateurEtapeProps
> = ({
  etapeCourante,
  etapePrecedenteHandler,
  etapeSuivanteHandler,
  listeEtapes,
}: SimulateurEtapeProps) => {
  const [inputs, setInputs] = useState<SimulateurFormData>(
    emptySimulateurFormData,
  );

  const generateHandlerMultipleValues =
    (name: SimulateurFieldNames) => (value: string) => {
      if (inputs[name].indexOf(value) === -1) {
        return [...inputs[name], value];
      }
      return inputs[name].filter((content) => content !== value);
    };

  const handleSingleValue = (value: string) => [value];

  const fieldHandlers: Record<SimulateurFieldNames, FormValueHandler> = {
    etatMembre: generateHandlerMultipleValues("etatMembre"),
    secteurActivite: generateHandlerMultipleValues("secteurActivite"),
    trancheCA: handleSingleValue,
    trancheNombreEmployes: handleSingleValue,
    typeStructure: handleSingleValue,
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { name, value } = evt.target;
    const fieldName = name as SimulateurFieldNames;
    setInputs({ ...inputs, [fieldName]: fieldHandlers[fieldName](value) });
  };

  if(etapeCourante === 5) {
    return <SimulateurEtape6Resultat />
  }

  return (
    <SimulateurEtapeForm
      listeEtapes={listeEtapes}
      etapeCourante={etapeCourante}
      handleChange={handleChange}
      inputs={inputs}
      etapePrecedenteHandler={etapePrecedenteHandler}
      etapeSuivanteHandler={etapeSuivanteHandler}
    />
  );
};
