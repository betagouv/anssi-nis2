import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { SecteurComposite } from "../../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { FormSimulateur } from "./index.ts";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SousSecteurCheckbox } from "../Inputs/SousSecteurCheckbox.tsx";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { OptionsChampSimulateur } from "../../../Services/Simulateur/Props/optionChampSimulateur";

import { transformeSousSecteurEnOptions } from "../../../Services/Simulateur/Transformateurs/TransformeSousSecteurEnOptions.ts";
import { texteQuestionSousSecteursActivites } from "../../../References/LibellesQuestionsSimulateur.ts";

const EtapeSousSecteursActiviteCalculee = ({
  propageActionSimulateur,
  donneesFormulaire,
}: SimulateurContenuEtapeProps) => {
  const gereChangement = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as SousSecteurActivite;
      propageActionSimulateur({
        type: "checkMulti",
        name: "sousSecteurActivite",
        newValue: newValue,
      });
    },
    [propageActionSimulateur],
  );

  const [optionsSousSecteurActivite, setOptionsSousSecteurActivite] = useState<
    [SecteurComposite, OptionsChampSimulateur][]
  >([]);

  const memoizedOptionsSousSecteurActivite = useMemo(() => {
    return transformeSousSecteurEnOptions(donneesFormulaire, gereChangement);
  }, [donneesFormulaire, gereChangement]);

  useEffect(() => {
    setOptionsSousSecteurActivite(memoizedOptionsSousSecteurActivite);
  }, [memoizedOptionsSousSecteurActivite]);

  return (
    <FormSimulateur>
      <legend className="fr-text--medium">
        {texteQuestionSousSecteursActivites}
      </legend>
      <div className="fr-fieldset__element">
        {optionsSousSecteurActivite.map(
          ([secteur, optionsSousSecteur], index) => (
            <SousSecteurCheckbox
              secteur={secteur}
              optionsSousSecteur={optionsSousSecteur}
              key={`sousSecteurs-${secteur}-${index}`}
            />
          ),
        )}
      </div>
    </FormSimulateur>
  );
};

const EtapeSousSecteursActivite = React.memo(EtapeSousSecteursActiviteCalculee);

export default EtapeSousSecteursActivite;
