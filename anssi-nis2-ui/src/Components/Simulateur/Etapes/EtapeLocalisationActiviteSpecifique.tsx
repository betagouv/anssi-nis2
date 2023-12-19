import {
  libellesFournitServicesUnionEuropeenne,
  libellesPaysUnionEuropeenneLocalisation,
} from "../../../References/Libelles.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import React, { useMemo } from "react";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import {
  AppartenancePaysUnionEuropeenne,
  FournitServicesUnionEuropeenne,
} from "../../../Domaine/Simulateur/ChampsSimulateur.definitions.ts";
import { transformeFournitServicesUnionEuropeennePourSelect } from "../../../Services/Simulateur/Transformateurs/TransformeFournitServicesUnionEuropeennePourSelect.ts";
import { transformeLocalisationRepresentantPourSelect } from "../../../Services/Simulateur/Transformateurs/transformeLocalisationRepresentantPourSelect.ts";
import {
  texteQuestionLocalisastionRepresentant,
  texteQuestionLocalisationActivite,
} from "../../../References/LibellesQuestionsSimulateur.ts";

const EtapeLocalisationActiviteSpecifiqueCalculee = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gereChangementFournitServicesUnionEuropeenne = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) =>
    propageActionSimulateur({
      type: "checkSingle",
      name: "fournitServicesUnionEuropeenne",
      newValue: event.target.value as FournitServicesUnionEuropeenne,
    });
  const gereChangementLocalisationRepresentant = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) =>
    propageActionSimulateur({
      type: "checkSingle",
      name: "localisationRepresentant",
      newValue: event.target.value as AppartenancePaysUnionEuropeenne,
    });
  const optionsFournitServicesUnionEuropeenne =
    transformeFournitServicesUnionEuropeennePourSelect(
      libellesFournitServicesUnionEuropeenne,
      gereChangementFournitServicesUnionEuropeenne,
      donneesFormulaire,
    );
  const optionsLocalisationRepresentant =
    transformeLocalisationRepresentantPourSelect(
      libellesPaysUnionEuropeenneLocalisation,
      gereChangementLocalisationRepresentant,
      donneesFormulaire,
    );
  const estFournisseurServiceUnionEuropeenne = useMemo(
    () => donneesFormulaire.fournitServicesUnionEuropeenne?.includes("oui"),
    [donneesFormulaire],
  );

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <legend className="fr-text--medium">
          {texteQuestionLocalisationActivite}
        </legend>
        <RadioButtons options={optionsFournitServicesUnionEuropeenne} />
      </div>
      {estFournisseurServiceUnionEuropeenne && (
        <div className="fr-fieldset__element">
          <legend className="fr-text--medium">
            {texteQuestionLocalisastionRepresentant}
          </legend>
          <RadioButtons options={optionsLocalisationRepresentant} />
        </div>
      )}
    </FormSimulateur>
  );
};

const EtapeLocalisationActiviteSpecifique = React.memo(
  EtapeLocalisationActiviteSpecifiqueCalculee,
);

export default EtapeLocalisationActiviteSpecifique;
