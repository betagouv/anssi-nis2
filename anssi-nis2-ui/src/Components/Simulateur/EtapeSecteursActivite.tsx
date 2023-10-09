import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import { transformeSecteursActiviteVersOptions } from "../../Services/Simulateur/Transformateurs.ts";

import { libellesSecteursActivite } from "../../Domaine/References/LibellesSecteursActivite.ts";
import { useCallback, useMemo } from "react";
import React from "react";

import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/Props/simulateurEtapeProps";
import { OptionsChampSimulateur } from "../../Services/Simulateur/Props/optionChampSimulateur";
import { SecteurActivite } from "../../Domaine/Simulateur/SecteursActivite";

const CheckboxWrapper = ({
  legend,
  options,
}: {
  legend: string;
  options: OptionsChampSimulateur;
}) => {
  return (
    <div className="fr-fieldset__element">
      {options && <Checkbox legend={legend} options={options} />}
    </div>
  );
};

const EtapeSecteursActiviteCalculee = ({
  propageActionSimulateur,
  donneesFormulaire,
}: SimulateurContenuEtapeProps) => {
  const gestionDonneesFormulaire = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as SecteurActivite;
      propageActionSimulateur({
        type: "checkMulti",
        name: "secteurActivite",
        newValue: newValue,
      });
    },
    [propageActionSimulateur],
  );

  const options = useMemo(
    () =>
      transformeSecteursActiviteVersOptions(
        libellesSecteursActivite,
        gestionDonneesFormulaire,
        donneesFormulaire,
      ),
    [gestionDonneesFormulaire, donneesFormulaire],
  );

  return (
    <FormSimulateur>
      <CheckboxWrapper
        legend="Dans quels secteurs d’activités votre organisation produit-elle des biens et/ou des services ?"
        options={options}
      />
    </FormSimulateur>
  );
};

const EtapeSecteursActivite = React.memo(EtapeSecteursActiviteCalculee);

export default EtapeSecteursActivite;
