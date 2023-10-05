import { libellesDesigneOSE } from "../../Domaine/References/Libelles.ts";
import { FormSimulateur } from "./index.ts";
import {
  ListeOptionsChampFormulaire,
  SimulateurContenuEtapeProps,
} from "../../Services/Simulateur/props.ts";
import React, { useEffect, useState } from "react";
import { transformeReponsesDesigneOSEPourSelect } from "../../Services/Simulateur/Transformateurs.ts";
import { NomsChampsSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

const EtapeOSE = ({
  formData,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const [reponsesDesigneOSE, setReponsesDesigneOSE] =
    useState<ListeOptionsChampFormulaire>([]);

  useEffect(() => {
    const changeSimple: React.ChangeEventHandler<HTMLInputElement> = (evt) =>
      propageActionSimulateur({
        type: "checkSingle",
        name: evt.target.name as NomsChampsSimulateur,
        newValue: evt.target.value,
      });
    setReponsesDesigneOSE(
      transformeReponsesDesigneOSEPourSelect(
        libellesDesigneOSE,
        changeSimple,
        formData,
      ),
    );
  }, [formData, propageActionSimulateur]);

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <RadioButtons
          legend={
            "Avez-vous été désigné opérateur de services essentiels " +
            "(OSE) au titre de NIS 1 ?"
          }
          options={reponsesDesigneOSE}
        />
      </div>
    </FormSimulateur>
  );
};

export default EtapeOSE;
