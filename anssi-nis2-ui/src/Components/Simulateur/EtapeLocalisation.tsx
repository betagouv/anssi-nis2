import { paysUnionEuropeenneLocalisation } from "../../Domaine/Simulateur/Libelles.ts";
import { FormSimulateur } from "./index.ts";
import {
  ListeOptionsChampFormulaire,
  SimulateurContenuEtapeProps,
} from "../../Services/Simulateur/props.ts";
import React, { useEffect, useState } from "react";
import { transformePaysUnionEuropeennePourSelect } from "../../Services/Simulateur/Transformateurs.ts";
import { NomsChampsSimulateur } from "../../Services/Simulateur/donneesFormulaire.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

const EtapeLocalisation = ({
  formData,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const [paysUnionEuropeenneOptions, setPaysUnionEuropeenneOptions] =
    useState<ListeOptionsChampFormulaire>([]);

  useEffect(() => {
    const changeSingle: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
      propageActionSimulateur({
        type: "checkSingle",
        name: evt.target.name as NomsChampsSimulateur,
        newValue: evt.target.value,
      });
    setPaysUnionEuropeenneOptions(
      transformePaysUnionEuropeennePourSelect(
        paysUnionEuropeenneLocalisation,
        changeSingle,
        formData,
      ),
    );
  }, [formData, propageActionSimulateur]);

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <RadioButtons
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

export default EtapeLocalisation;
