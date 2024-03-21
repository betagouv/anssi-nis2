import {
  libellesTypeEntitePublique,
  libellesTypesStructure,
} from "../../../References/Libelles.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import React, { useMemo } from "react";
import { SimulateurEtapeNodeComponent } from "../../../Services/Simulateur/Props/component";
import { fabriqueGestionChangementSimple } from "../../../Services/Simulateur/gestionnaires.ts";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import {
  transformeTypeEntitePubliqueVersOptions,
  transformeTypeStructureVersOptions,
} from "../../../Services/Simulateur/Transformateurs/TransformeTypeStructureVersOptions.ts";
import {
  texteLegendeTypeStructure,
  texteQuestionTypeEntitePublique,
} from "../../../References/LibellesQuestionsSimulateur.ts";

const EtapeTypeStructureCalculee: SimulateurEtapeNodeComponent = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gestionDonneesFormulaire = fabriqueGestionChangementSimple(
    propageActionSimulateur,
  );

  const optionsTypeStructure = useMemo(() => {
    const optionChampSimulateurs = transformeTypeStructureVersOptions(
      libellesTypesStructure,
      gestionDonneesFormulaire,
      donneesFormulaire,
    );
    optionChampSimulateurs[1].nativeInputProps.disabled = true;
    return optionChampSimulateurs;
  }, [donneesFormulaire, gestionDonneesFormulaire]);
  const estEntitePublique = useMemo(
    () => donneesFormulaire.typeStructure.includes("publique"),
    [donneesFormulaire],
  );
  const optionsTypeEntitePublique = transformeTypeEntitePubliqueVersOptions(
    libellesTypeEntitePublique,
    gestionDonneesFormulaire,
    donneesFormulaire,
  );

  return (
    <>
      <FormSimulateur>
        <div className="fr-fieldset__element">
          <RadioButtons
            legend={texteLegendeTypeStructure}
            options={optionsTypeStructure}
          />
        </div>
        {estEntitePublique && (
          <div className="fr-fieldset__element">
            <RadioButtons
              legend={texteQuestionTypeEntitePublique}
              options={optionsTypeEntitePublique}
            />
          </div>
        )}
      </FormSimulateur>
      <div className="fr-col-12 fr-mb-5w fr-notice fr-notice--info">
        <div className="fr-container">
          <p className="fr-notice__body">
            Le test est dans un premier temps focalisé sur les entreprises
            privées ou publiques. Il sera par la suite disponible pour les
            administrations publiques.
          </p>
        </div>
      </div>
    </>
  );
};

const EtapeTypeStructure = React.memo(EtapeTypeStructureCalculee);

export default EtapeTypeStructure;
