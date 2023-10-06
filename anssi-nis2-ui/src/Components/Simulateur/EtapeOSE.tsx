import { libellesDesigneOSE } from "../../Domaine/References/Libelles.ts";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "../../Services/Simulateur/props.ts";
import React, { useMemo } from "react";
import { transformeReponsesDesigneOSEPourSelect } from "../../Services/Simulateur/Transformateurs.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { fabriqueGestionChangementSimple } from "../../Services/Simulateur/gestionnaires.ts";

const EtapeOSECalculee = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const changeSimple = fabriqueGestionChangementSimple(propageActionSimulateur);

  const optionsMemorisees = useMemo(
    () =>
      transformeReponsesDesigneOSEPourSelect(
        libellesDesigneOSE,
        changeSimple,
        donneesFormulaire,
      ),
    [donneesFormulaire, changeSimple],
  );

  const texteLegende =
    "Avez-vous été désigné opérateur de services essentiels " +
    "(OSE) au titre de NIS 1 ?";

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <RadioButtons legend={texteLegende} options={optionsMemorisees} />
      </div>
    </FormSimulateur>
  );
};

const EtapeOSE = React.memo(EtapeOSECalculee);

export default EtapeOSE;
