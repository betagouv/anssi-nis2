import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { detailsDesSecteurs } from "../../Domaine/DomaineSimulateur.ts";
import { genereTransformateurValeursVersOptions } from "../../Services/Utilitaires/Transformateurs.ts/simulateurFrontServices.ts";
import { FormSimulateur } from "./index.ts";
import {
  InputPropsList,
  SimulateurContenuEtapeProps,
} from "./simulateurProps.ts";
import React, { useEffect, useState } from "react";
import { SimulateurFieldNames } from "../../Services/Simulateur/FormData.ts";

const SimulateurEtape5 = ({
  propageActionSimulateur,
  formData,
}: SimulateurContenuEtapeProps) => {
  const [optionsSecteurActivite, setOptionsSecteurActivite] =
    useState<InputPropsList>([]);

  useEffect(() => {
    const valeursActivites =
      detailsDesSecteurs.energie.sousSecteurs?.electricite.activites || {};

    const changeMulti: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
      propageActionSimulateur({
        type: "checkMulti",
        name: evt.target.name as SimulateurFieldNames,
        newValue: evt.target.value,
      });

    const transformateurSecteurActivite =
      genereTransformateurValeursVersOptions<string>(
        (cle: string, valeurs: Record<string, string>) => valeurs[cle],
        "activites",
      );
    setOptionsSecteurActivite(
      transformateurSecteurActivite(
        valeursActivites,
        changeMulti,
        formData,
        "energie",
      ),
    );
  }, [formData, propageActionSimulateur]);
  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <p>
          Quelles sont les activités pratiquées dans les secteurs sélectionnés ?
        </p>
        <p className="fr-text-mention--grey fr-text--sm">
          Cliquez sur les info-bulles pour obtenir plus d’informations sur les
          définitions des activités.
        </p>

        <Checkbox
          legend="Énergie / Électricité"
          options={optionsSecteurActivite}
        />
      </div>
    </FormSimulateur>
  );
};

export default SimulateurEtape5;
