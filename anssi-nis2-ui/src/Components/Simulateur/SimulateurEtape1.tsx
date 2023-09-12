import {
  SimulateurFieldNames,
  transformePaysUnionEuropeennePourSelect,
} from "../../Services/simulateurFrontServices.ts";
import { paysUnionEuropeenneLocalisation } from "../../Domaine/DomaineSimulateur.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import {
  InputPropsList,
  SimulateurContenuEtapeProps,
} from "./simulateurProps.ts";
import React, { useEffect, useState } from "react";

const SimulateurEtape1 = ({
  formData,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const [paysUnionEuropeenneOptions, setPaysUnionEuropeenneOptions] =
    useState<InputPropsList>([]);
  const changeMulti: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
    propageActionSimulateur({
      type: "checkMulti",
      name: evt.target.name as SimulateurFieldNames,
      newValue: evt.target.value,
    });
  useEffect(() => {
    setPaysUnionEuropeenneOptions(
      transformePaysUnionEuropeennePourSelect(
        paysUnionEuropeenneLocalisation,
        changeMulti,
        formData,
      ),
    );
  }, [formData]);

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <Checkbox
          legend={
            "Dans quel état membre de l’Union Européenne êtes-vous implanté" +
            " et/ou exercez-vous votre activité principale ?"
          }
          hintText={
            "Là où sont principalement prises les décisions cyber," +
            " ou à défaut là où les opérations cyber son effectuées." +
            " Si indéterminé : là où se trouve le plus grand nombre de salariés."
          }
          options={paysUnionEuropeenneOptions}
        />
      </div>
    </FormSimulateur>
  );
};

export default SimulateurEtape1;
