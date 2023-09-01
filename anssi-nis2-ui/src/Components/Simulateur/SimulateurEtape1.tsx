import React from 'react'
import { transformePaysUnionEuropeennePourSelect } from "../../Services/simulateurFrontServices.ts";
import { paysUnionEuropeenneLocalisation } from "../../Domaine/DomaineSimulateur.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";

const SimulateurEtape1 = () => {
  const paysUnionEuropeenneOptions = transformePaysUnionEuropeennePourSelect(
    paysUnionEuropeenneLocalisation,
  );

  return (
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
        className="fr-checkbox-group--sm"
      />
    </div>
  );
};

export default SimulateurEtape1;
