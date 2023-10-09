import { FormSimulateur } from "./index.ts";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { transformeSousSecteurEnOptions } from "../../Services/Simulateur/Transformateurs.ts";
import { SousSecteurCheckbox } from "./Inputs/SousSecteurCheckbox.tsx";

import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import { OptionsChampSimulateur } from "../../Services/Simulateur/Props/optionChampSimulateur";
import {
  SecteursAvecSousSecteurs,
  SousSecteurActivite,
} from "../../Domaine/Simulateur/SousSecteurs.ts";

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
    [SecteursAvecSousSecteurs, OptionsChampSimulateur][]
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
        Précisez les sous-secteurs concernés :
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
