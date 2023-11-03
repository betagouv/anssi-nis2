import { libellesTypesStructure } from "../../../References/Libelles.ts";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { FormSimulateur } from "./index.ts";
import React, { useMemo } from "react";
import { SimulateurEtapeNodeComponent } from "../../../Services/Simulateur/Props/component";
import { fabriqueGestionChangementSimple } from "../../../Services/Simulateur/gestionnaires.ts";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { transformeTypeStructureVersOptions } from "../../../Services/Simulateur/Transformateurs/TransformeTypeStructureVersOptions.ts";
import { OptionsChampSimulateur } from "../../../Services/Simulateur/Props/optionChampSimulateur";

const EtapeTypeStructureCalculee: SimulateurEtapeNodeComponent = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gestionDonneesFormulaire = fabriqueGestionChangementSimple(
    propageActionSimulateur,
  );

  const texteLegendeTypeStructure =
    "Quel type de structure qualifie votre organisation ?";
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
  const texteLegendeTypeEntitePublique = "Précisez le type d’entité publique :";
  const optionsTypeEntitePublique: OptionsChampSimulateur = [
    {
      label: "Administration centrale",
      nativeInputProps: {
        name: "typeEntitePublique",
        value: "administrationCentrale",
        onChange: gestionDonneesFormulaire,
        checked: false,
      },
    },
    {
      label: "Collectivité territoriale",
      nativeInputProps: {
        name: "typeEntitePublique",
        value: "administrationCentrale",
        onChange: gestionDonneesFormulaire,
        checked: false,
      },
    },
    {
      label: "Autre structure publique",
      nativeInputProps: {
        name: "typeEntitePublique",
        value: "administrationCentrale",
        onChange: gestionDonneesFormulaire,
        checked: false,
      },
    },
  ];
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
            legend={texteLegendeTypeEntitePublique}
            options={optionsTypeEntitePublique}
          />
        </div>
      )}
    </FormSimulateur>
  );
};

const EtapeTypeStructure = React.memo(EtapeTypeStructureCalculee);

export default EtapeTypeStructure;
