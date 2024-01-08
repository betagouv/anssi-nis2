import { FormSimulateur } from "./index.ts";
import React, { useMemo } from "react";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { fabriqueGestionChangementSimple } from "../../../Services/Simulateur/gestionnaires.ts";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { transformeReponsesDesigneOSEPourSelect } from "../../../Services/Simulateur/Transformateurs/TransformeReponsesDesigneOSEPourSelect.ts";
import { texteQuestionOperateurServiceEssentiel } from "../../../References/LibellesQuestionsSimulateur.ts";
import { libellesDesigneOSE } from "../../../References/Libelles.ts";

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

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <RadioButtons
          legend={texteQuestionOperateurServiceEssentiel}
          options={optionsMemorisees}
        />
      </div>
    </FormSimulateur>
  );
};

const EtapeOSE = React.memo(EtapeOSECalculee);

export default EtapeOSE;
