import { libellesTypesStructure } from "../../../References/Libelles.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import React, { useMemo } from "react";
import { SimulateurEtapeNodeComponent } from "../../../Services/Simulateur/Props/component";
import { fabriqueGestionChangementSimple } from "../../../Services/Simulateur/gestionnaires.ts";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { transformeTypeStructureVersOptions } from "../../../Services/Simulateur/Transformateurs/TransformeTypeStructureVersOptions.ts";

const EtapeTypeStructureCalculee: SimulateurEtapeNodeComponent = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gestionDonneesFormulaire = fabriqueGestionChangementSimple(
    propageActionSimulateur,
  );
  const options = useMemo(
    () =>
      transformeTypeStructureVersOptions(
        libellesTypesStructure,
        gestionDonneesFormulaire,
        donneesFormulaire,
      ),
    [donneesFormulaire, gestionDonneesFormulaire],
  );

  const texteLegende = "Quel type de structure qualifie votre organisation ?";
  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <RadioButtons legend={texteLegende} options={options} />
      </div>
    </FormSimulateur>
  );
};

const EtapeTypeStructure = React.memo(EtapeTypeStructureCalculee);

export default EtapeTypeStructure;
