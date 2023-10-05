import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import { transformeSecteursActiviteVersOptions } from "../../Services/Simulateur/Transformateurs.ts";
import { SelectOptions } from "../../Services/Simulateur/simulateurFrontServices.ts";
import { TValeursSecteursActivites } from "../../Domaine/Simulateur/ValeursCles.ts";

import { libellesSecteursActivite } from "../../Domaine/Simulateur/LibellesSecteursActivite.ts";
import { useCallback, useMemo } from "react";
import React from "react";

const CheckboxWrapper = ({
  legend,
  options,
}: {
  legend: string;
  options: SelectOptions;
}) => {
  return (
    <div className="fr-fieldset__element">
      {options && <Checkbox legend={legend} options={options} />}
    </div>
  );
};

const EtapeSecteurActiviteBrute = ({
  propageActionSimulateur,
  formData,
}: SimulateurContenuEtapeProps) => {
  const gereChangement = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as TValeursSecteursActivites;
      propageActionSimulateur({
        type: "checkMulti",
        name: "secteurActivite",
        newValue: newValue,
      });
    },
    [propageActionSimulateur],
  );

  const optionsSecteurActivite = useMemo(
    () =>
      transformeSecteursActiviteVersOptions(
        libellesSecteursActivite,
        gereChangement,
        formData,
      ),
    [gereChangement, formData],
  );

  return (
    <FormSimulateur>
      <CheckboxWrapper
        legend="Dans quels secteurs d’activités votre organisation produit-elle des biens et/ou des services ?"
        options={optionsSecteurActivite}
      />
    </FormSimulateur>
  );
};

const EtapeSecteurActivite = React.memo(EtapeSecteurActiviteBrute);

export default EtapeSecteurActivite;
