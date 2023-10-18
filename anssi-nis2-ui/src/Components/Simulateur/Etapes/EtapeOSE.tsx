import { libellesDesigneOSE } from "../../../References/Libelles.ts";
import { FormSimulateur } from "./index.ts";
import React, { useMemo } from "react";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { fabriqueGestionChangementSimple } from "../../../Services/Simulateur/gestionnaires.ts";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { transformeReponsesDesigneOSEPourSelect } from "../../../Services/Simulateur/Transformateurs/TransformeReponsesDesigneOSEPourSelect.ts";

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
