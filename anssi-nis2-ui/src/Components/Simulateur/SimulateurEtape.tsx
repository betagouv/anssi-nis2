import { DefaultComponentExtensible } from "../../Props.ts";
import React, { useState } from "react";
import {
  emptySimulateurFormData,
  SimulateurFieldNames,
  SimulateurFormData,
} from "../../Services/simulateurFrontServices.ts";
import {
  SimulateurEtapeProps,
  SimulateurEtapeRenderedComponent,
} from "./simulateurProps.ts";
import { fieldHandlers } from "./HandleValue.ts";

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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { name, value } = evt.target;
    const fieldName = name as SimulateurFieldNames;
    setInputs({
      ...inputs,
      [fieldName]: fieldHandlers[fieldName](value, inputs),
    });
  };

  const ElementRendered: SimulateurEtapeRenderedComponent =
    listeEtapes[etapeCourante].elementToRender;
  return (
    <ElementRendered
      listeEtapes={listeEtapes}
      etapeCourante={etapeCourante}
      handleChange={handleChange}
      formData={inputs}
      etapePrecedenteHandler={etapePrecedenteHandler}
      etapeSuivanteHandler={etapeSuivanteHandler}
    />
  );
};
