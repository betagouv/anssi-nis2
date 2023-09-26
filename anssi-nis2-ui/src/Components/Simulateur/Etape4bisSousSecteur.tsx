import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import React, { useCallback, useEffect, useState } from "react";
import {
  genereTransformateurValeursVersOptions,
  labelGenerator,
  SelectOptions,
  TransformeRecordToSelect,
} from "../../Services/Simulateur/simulateurFrontServices.ts";
import { ValeursSousSecteurEnergie } from "../../Domaine/Simulateur/ValeursCles.ts";
import {
  DescriptionSousSecteur,
  sousSecteursEnergie,
} from "../../Domaine/Simulateur/SecteursActivite.ts";

const Etape4bisSousSecteur = ({
  propageActionSimulateur,
  formData,
}: SimulateurContenuEtapeProps) => {
  const gereChangement = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as ValeursSousSecteurEnergie;
      propageActionSimulateur({
        type: "checkMulti",
        name: "sousSecteurActivite",
        newValue: newValue,
      });
    },
    [propageActionSimulateur],
  );

  const [optionsSousSecteurActivite, setOptionsSousSecteurActivite] =
    useState<SelectOptions>();

  useEffect(() => {
    const valeursSousSecteur = sousSecteursEnergie; //detailsDesSecteurs.energie.sousSecteurs;

    const getSousSecteurLabel: labelGenerator<
      ValeursSousSecteurEnergie,
      DescriptionSousSecteur
    > = (
      value: string,
      sousSecteur: Record<ValeursSousSecteurEnergie, DescriptionSousSecteur>,
    ) => sousSecteur[value as ValeursSousSecteurEnergie].libelle;
    const transformateurSousSecteurActivite: TransformeRecordToSelect<
      ValeursSousSecteurEnergie,
      DescriptionSousSecteur
    > = genereTransformateurValeursVersOptions(
      getSousSecteurLabel,
      "sousSecteurActivite",
    );
    setOptionsSousSecteurActivite(
      transformateurSousSecteurActivite(
        valeursSousSecteur,
        gereChangement,
        formData,
      ),
    );
  }, [formData, gereChangement]);

  return (
    <FormSimulateur>
      <legend className="fr-text--medium">
        Précisez les sous-secteurs concernés :
      </legend>
      <div className="fr-fieldset__element">
        {optionsSousSecteurActivite && (
          <Checkbox
            legend="&Eacute;nergie"
            options={optionsSousSecteurActivite}
          />
        )}
      </div>
    </FormSimulateur>
  );
};

export default Etape4bisSousSecteur;
