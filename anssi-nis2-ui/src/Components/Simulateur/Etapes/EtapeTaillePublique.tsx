import { libellesTranchesNombreEmployes } from "../../../References/Libelles.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import React from "react";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { TrancheNombreEmployes } from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { transformeTranchesNombreEmployesVersOptions } from "../../../Services/Simulateur/Transformateurs/TransformeTranchesPetitMoyenGrandVersOptions.ts";

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
        <legend className="fr-text--medium">
          Quelles sont les caractéristiques clés de votre organisation ?
        </legend>
        <RadioButtons
          legend="Nombre d’employés (équivalents temps pleins)"
          options={optionsTranchesNombreEmployes}
        />
      </div>
    </FormSimulateur>
  );
};

const EtapeTaillePublique = React.memo(EtapeTaillePubliqueCalculee);

export default EtapeTaillePublique;
