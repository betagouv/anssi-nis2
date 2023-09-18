import { paysUnionEuropeenneLocalisation } from "../../Domaine/Simulateur/Libelles.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import {
  ListeOptionsChampFormulaire,
  SimulateurContenuEtapeProps,
} from "../../Services/Simulateur/props.ts";
import React, { useEffect, useState } from "react";
import { transformePaysUnionEuropeennePourSelect } from "../../Services/Simulateur/Transformateurs.ts";
import { NomsChampsSimulateur } from "../../Services/Simulateur/donneesFormulaire.ts";

const Etape1Localisation = ({
  formData,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const [paysUnionEuropeenneOptions, setPaysUnionEuropeenneOptions] =
    useState<ListeOptionsChampFormulaire>([]);

  useEffect(() => {
    const changeMulti: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
      propageActionSimulateur({
        type: "checkMulti",
        name: evt.target.name as NomsChampsSimulateur,
        newValue: evt.target.value,
      });
    setPaysUnionEuropeenneOptions(
      transformePaysUnionEuropeennePourSelect(
        paysUnionEuropeenneLocalisation,
        changeMulti,
        formData,
      ),
    );
  }, [formData, propageActionSimulateur]);

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

export default Etape1Localisation;
