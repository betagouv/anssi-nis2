import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import React, { useCallback, useEffect, useState } from "react";
import { transformeSecteursActiviteVersOptions } from "../../Services/Simulateur/Transformateurs.ts";
import { SelectOptions } from "../../Services/Simulateur/simulateurFrontServices.ts";
import { TValeursSecteursActivites } from "../../Domaine/Simulateur/ValeursCles.ts";

import { libellesSecteursActivite } from "../../Domaine/Simulateur/LibellesSecteursActivite.ts";

const Etape4Secteur = ({
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

  const [optionsSecteurActivite, setOptionsSecteurActivite] =
    useState<SelectOptions>();

  useEffect(() => {
    setOptionsSecteurActivite(
      transformeSecteursActiviteVersOptions(
        libellesSecteursActivite,
        gereChangement,
        formData,
      ),
    );
  }, [formData, gereChangement]);

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        {optionsSecteurActivite && (
          <Checkbox
            legend="Dans quels secteurs d’activités votre organisation produit-elle des biens et/ou des services ?"
            options={optionsSecteurActivite}
          />
        )}
      </div>
    </FormSimulateur>
  );
};

export default Etape4Secteur;
