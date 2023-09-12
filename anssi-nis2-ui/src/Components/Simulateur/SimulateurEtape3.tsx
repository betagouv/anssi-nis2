import {
  transformeTranchesCAVersOptions,
  transformeTranchesNombreEmployesVersOptions,
} from "../../Services/simulateurFrontServices.ts";
import {
  tranchesCA,
  tranchesNombreEmployes,
} from "../../Domaine/DomaineSimulateur.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "./simulateurProps.ts";
import React from "react";

const SimulateurEtape3 = ({
  formData,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gereChangementNombreEmployes = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) =>
    propageActionSimulateur({
      type: "checkSingle",
      name: "trancheNombreEmployes",
      newValue: event.target.value,
    });
  const gereChangementCA = (event: React.ChangeEvent<HTMLInputElement>) =>
    propageActionSimulateur({
      type: "checkSingle",
      name: "trancheCA",
      newValue: event.target.value,
    });
  const optionsTranchesNombreEmployes =
    transformeTranchesNombreEmployesVersOptions(
      tranchesNombreEmployes,
      gereChangementNombreEmployes,
      formData,
    );
  const optionsTranchesCA = transformeTranchesCAVersOptions(
    tranchesCA,
    gereChangementCA,
    formData,
  );

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <p>
          Quelles sont les caractéristiques clés de votre organisation ? Texte
          de description additionnel
        </p>
        <RadioButtons
          legend="Nombre d’employé·e·s (équivalents temps pleins)"
          options={optionsTranchesNombreEmployes}
        />
        <RadioButtons
          legend="Chiffre d’affaires annuel de l’année passée"
          options={optionsTranchesCA}
        />
      </div>
    </FormSimulateur>
  );
};

export default SimulateurEtape3;
