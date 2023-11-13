import { libellesPaysUnionEuropeenneLocalisation } from "../../../References/Libelles.ts";
import { FormSimulateur } from "./index.ts";
import { useMemo } from "react";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { fabriqueGestionChangementSimple } from "../../../Services/Simulateur/gestionnaires.ts";
import React from "react";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { transformePaysUnionEuropeennePourSelect } from "../../../Services/Simulateur/Transformateurs/TransformePaysUnionEuropeennePourSelect.ts";

const EtapeLocalisationCalculee = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gestionDonneesFormulaire = fabriqueGestionChangementSimple(
    propageActionSimulateur,
  );
  const options = useMemo(
    () =>
      transformePaysUnionEuropeennePourSelect(
        libellesPaysUnionEuropeenneLocalisation,
        gestionDonneesFormulaire,
        donneesFormulaire,
      ),
    [donneesFormulaire, gestionDonneesFormulaire],
  );

  const texteLegende = (
    <>Dans quel état membre de l’Union Européenne êtes-vous établi&nbsp;?</>
  );
  const texteIndication = <>Localisation du siège social.</>;
  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <RadioButtons
          legend={texteLegende}
          hintText={texteIndication}
          options={options}
        />
      </div>
    </FormSimulateur>
  );
};

const EtapeLocalisation = React.memo(EtapeLocalisationCalculee);
export default EtapeLocalisation;
