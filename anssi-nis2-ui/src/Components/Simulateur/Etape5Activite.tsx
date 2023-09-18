import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { genereTransformateurValeursVersOptions } from "../../Services/Utilitaires/Transformateurs.ts/simulateurFrontServices.ts";
import { FormSimulateur } from "./index.ts";
import {
  ListeOptionsChampFormulaire,
  SimulateurContenuEtapeProps,
} from "../../Services/Simulateur/props.ts";
import React, { useEffect, useState } from "react";
import { NomsChampsSimulateur } from "../../Services/Simulateur/donneesFormulaire.ts";
import { detailsDesSecteurs } from "../../Domaine/Simulateur/SecteursActivite.ts";

const Etape5Activite = ({
  propageActionSimulateur,
  formData,
}: SimulateurContenuEtapeProps) => {
  const [optionsSecteurActivite, setOptionsSecteurActivite] =
    useState<ListeOptionsChampFormulaire>([]);

  useEffect(() => {
    const valeursActivites =
      detailsDesSecteurs.energie.sousSecteurs?.electricite.activites || {};

    const changeMulti: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
      propageActionSimulateur({
        type: "checkMulti",
        name: evt.target.name as NomsChampsSimulateur,
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

export default Etape5Activite;
