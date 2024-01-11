import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import {
  libellesTranchesCA,
  libellesTranchesNombreEmployes,
} from "../../../References/Libelles.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import React from "react";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";

import {
  transformeTranchesCAVersOptions,
  transformeTranchesNombreEmployesVersOptions,
} from "../../../Services/Simulateur/Transformateurs/TransformeTranchesPetitMoyenGrandVersOptions.ts";
import {
  texteEtapeTaille,
  texteQuestionChiffreAffaire,
  texteQuestionNombreEmployes,
} from "../../../References/LibellesQuestionsSimulateur.ts";

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
      name: "trancheChiffreAffaire",
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
        <legend className="fr-text--medium">{texteEtapeTaille}</legend>
        <RadioButtons
          legend={texteQuestionNombreEmployes}
          options={optionsTranchesNombreEmployes}
        />
        <RadioButtons
          legend={texteQuestionChiffreAffaire}
          options={optionsTranchesCA}
        />
      </div>
    </FormSimulateur>
  );
};

const EtapeTaille = React.memo(EtapeTailleCalculee);

export default EtapeTaille;
