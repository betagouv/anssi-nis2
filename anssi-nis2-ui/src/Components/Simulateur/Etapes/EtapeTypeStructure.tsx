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

  const optionsTypeStructure = useMemo(
    () =>
      transformeTypeStructureVersOptions(
        libellesTypesStructure,
        gestionDonneesFormulaire,
        donneesFormulaire,
      ),
    [donneesFormulaire, gestionDonneesFormulaire],
  );

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
  );
};

const EtapeTypeStructure = React.memo(EtapeTypeStructureCalculee);

export default EtapeTypeStructure;
