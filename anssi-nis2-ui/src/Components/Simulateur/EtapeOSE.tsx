import { libellesDesigneOSE } from "../../Domaine/References/Libelles.ts";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import React, { useCallback, useMemo } from "react";
import { transformeReponsesDesigneOSEPourSelect } from "../../Services/Simulateur/Transformateurs.ts";
import { NomsChampsSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

const EtapeOSEBrute = ({
  formData,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const changeSimple = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      propageActionSimulateur({
        type: "checkSingle",
        name: evt.target.name as NomsChampsSimulateur,
        newValue: evt.target.value,
      });
    },
    [propageActionSimulateur],
  );

  const memoizedOptions = useMemo(() => {
    return transformeReponsesDesigneOSEPourSelect(
      libellesDesigneOSE,
      changeSimple,
      formData,
    );
  }, [formData, changeSimple]);

  const texteLegende =
    "Avez-vous été désigné opérateur de services essentiels " +
    "(OSE) au titre de NIS 1 ?";

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <MemoizedRadioButtons legend={texteLegende} options={memoizedOptions} />
      </div>
    </FormSimulateur>
  );
};

const MemoizedRadioButtons = React.memo(RadioButtons);

const EtapeOSE = React.memo(EtapeOSEBrute);

export default EtapeOSE;
