import {
  libellesTranchesCA,
  libellesTranchesNombreEmployes,
} from "../../../References/Libelles.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import React from "react";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import {
  transformeTranchesCAVersOptions,
  transformeTranchesNombreEmployesVersOptions,
} from "../../../Services/Simulateur/Transformateurs/TransformeTranchesPetitMoyenGrandVersOptions.ts";

const EtapeTailleCalculee = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gereChangementNombreEmployes = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) =>
    propageActionSimulateur({
      type: "checkSingle",
      name: "trancheNombreEmployes",
      newValue: event.target.value as TrancheNombreEmployes,
    });
  const gereChangementCA = (event: React.ChangeEvent<HTMLInputElement>) =>
    propageActionSimulateur({
      type: "checkSingle",
      name: "trancheCA",
      newValue: event.target.value as TrancheChiffreAffaire,
    });
  const optionsTranchesNombreEmployes =
    transformeTranchesNombreEmployesVersOptions(
      libellesTranchesNombreEmployes,
      gereChangementNombreEmployes,
      donneesFormulaire,
    );
  const optionsTranchesCA = transformeTranchesCAVersOptions(
    libellesTranchesCA,
    gereChangementCA,
    donneesFormulaire,
  );

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <legend className="fr-text--medium">
          Quelles sont les caractéristiques clés de votre entité ?
        </legend>
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

const EtapeTaille = React.memo(EtapeTailleCalculee);

export default EtapeTaille;
