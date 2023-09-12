import { transformeSecteursActiviteVersOptions } from "../../Services/simulateurFrontServices.ts";
import { secteursActivite } from "../../Domaine/DomaineSimulateur.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { FormSimulateur } from "./index.ts";
import { SimulateurContenuEtapeProps } from "./simulateurProps.ts";
import React from "react";

const SimulateurEtape4 = ({
  propageActionSimulateur,
  formData,
}: SimulateurContenuEtapeProps) => {
  const gereChangement = (event: React.ChangeEvent<HTMLInputElement>) =>
    propageActionSimulateur({
      type: "checkMulti",
      name: "secteurActivite",
      newValue: event.target.value,
    });
  const optionsSecteurActivite = transformeSecteursActiviteVersOptions(
    secteursActivite,
    gereChangement,
    formData,
  );

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <Checkbox
          legend="Dans quels secteurs d’activités votre organisation produit-elle des biens et/ou des services ?"
          options={optionsSecteurActivite}
        />
      </div>
    </FormSimulateur>
  );
};

export default SimulateurEtape4;
