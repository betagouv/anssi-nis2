import { libellesPaysUnionEuropeenneLocalisation } from "../../../References/Libelles.ts";
import { FormSimulateur } from "./index.ts";
import { useMemo } from "react";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { fabriqueGestionChangementSimple } from "../../../Services/Simulateur/gestionnaires.ts";
import React from "react";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { transformePaysUnionEuropeennePourSelect } from "../../../Services/Simulateur/Transformateurs/TransformePaysUnionEuropeennePourSelect.ts";
import {
  texteQuestionMembreUE,
  texteQuestionMembreUEIndication,
} from "../../../References/LibellesQuestionsSimulateur.ts";

const EtapeLocalisationCalculee = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gestionDonneesFormulaire = fabriqueGestionChangementSimple(
    propageActionSimulateur,
  );
  const options = useMemo(() => {
    const optionChampSimulateurs = transformePaysUnionEuropeennePourSelect(
      libellesPaysUnionEuropeenneLocalisation,
      gestionDonneesFormulaire,
      donneesFormulaire,
    );
    optionChampSimulateurs[1].nativeInputProps.disabled = true;
    optionChampSimulateurs[2].nativeInputProps.disabled = true;
    return optionChampSimulateurs;
  }, [donneesFormulaire, gestionDonneesFormulaire]);

  return (
    <>
      <FormSimulateur>
        <div className="fr-fieldset__element">
          <RadioButtons
            legend={texteQuestionMembreUE}
            hintText={texteQuestionMembreUEIndication}
            options={options}
          />
        </div>
      </FormSimulateur>
      <div className="fr-col-12 fr-mb-5w fr-notice fr-notice--info">
        <div className="fr-container">
          <p className="fr-notice__body">
            Le test est dans un premier temps focalisé sur les entités établies
            en France, il sera par la suite disponible pour les entités établies
            dans les autres États de l&apos;Union Européenne et dans les États
            hors Union Européenne.
          </p>
        </div>
      </div>
    </>
  );
};

const EtapeLocalisation = React.memo(EtapeLocalisationCalculee);
export default EtapeLocalisation;
