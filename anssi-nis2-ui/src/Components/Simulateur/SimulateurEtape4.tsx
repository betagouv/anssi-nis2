import React from 'react'
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { transformeSecteursActiviteVersOptions } from "../../Services/simulateurFrontServices.ts";
import { secteursActivite } from "../../Domaine/DomaineSimulateur.ts";

const SimulateurEtape4 = () => {
  const optionsSecteurActivite =
    transformeSecteursActiviteVersOptions(secteursActivite);

  return (
    <div className="fr-fieldset__element">
      <RadioButtons
        legend="Dans quels secteurs d’activités votre organisation produit-elle des biens et/ou des services ?"
        options={optionsSecteurActivite}
        className="fr-checkbox-group--sm"
      />
    </div>
  );
};

export default SimulateurEtape4;
