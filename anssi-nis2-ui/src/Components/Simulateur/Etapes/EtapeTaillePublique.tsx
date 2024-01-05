import { TrancheNombreEmployes } from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { libellesTranchesNombreEmployes } from "../../../References/Libelles.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import React from "react";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { transformeTranchesNombreEmployesVersOptions } from "../../../Services/Simulateur/Transformateurs/TransformeTranchesPetitMoyenGrandVersOptions.ts";
import {
  texteEtapeTaillePublique,
  texteQuestionTaillePublique,
} from "../../../References/LibellesQuestionsSimulateur.ts";

const EtapeTaillePubliqueCalculee = ({
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
  const optionsTranchesNombreEmployes =
    transformeTranchesNombreEmployesVersOptions(
      libellesTranchesNombreEmployes,
      gereChangementNombreEmployes,
      donneesFormulaire,
    );

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <legend className="fr-text--medium">{texteEtapeTaillePublique}</legend>
        <RadioButtons
          legend={texteQuestionTaillePublique}
          options={optionsTranchesNombreEmployes}
        />
      </div>
    </FormSimulateur>
  );
};

const EtapeTaillePublique = React.memo(EtapeTaillePubliqueCalculee);

export default EtapeTaillePublique;
