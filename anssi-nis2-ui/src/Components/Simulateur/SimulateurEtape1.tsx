import { transformePaysUnionEuropeennePourSelect } from "../../Services/simulateurFrontServices.ts";
import { paysUnionEuropeenneLocalisation } from "../../Domaine/DomaineSimulateur.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import {
  SimulateurContenuEtapeProps,
  SimulateurEtapeNodeComponent,
} from "./simulateurProps.ts";
import { NativeInputProps } from "../../Props.ts";
import { useEffect, useState } from "react";

type InputPropsList = {
  nativeInputProps: NativeInputProps;
  label: string;
}[];
const SimulateurEtape1: SimulateurEtapeNodeComponent = ({
  handleChange,
  formData,
}: SimulateurContenuEtapeProps) => {
  const [paysUnionEuropeenneOptions, setPaysUnionEuropeenneOptions] =
    useState<InputPropsList>([]);
  useEffect(() => {
    setPaysUnionEuropeenneOptions(
      transformePaysUnionEuropeennePourSelect(
        paysUnionEuropeenneLocalisation,
        handleChange,
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
