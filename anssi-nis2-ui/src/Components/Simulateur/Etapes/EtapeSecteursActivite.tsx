import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { SecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { FormSimulateur } from "./index.ts";

import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import { useCallback, useMemo } from "react";
import React from "react";

import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { OptionsChampSimulateur } from "../../../Services/Simulateur/Props/optionChampSimulateur";
import { transformeSecteursActiviteVersOptions } from "../../../Services/Simulateur/Transformateurs/TransformeSecteursActiviteVersOptions.ts";
import { texteQuestionSecteurActivites } from "../../../References/LibellesQuestionsSimulateur.ts";

const EtapeSecteursActiviteCalculee = ({
  propageActionSimulateur,
  donneesFormulaire,
}: SimulateurContenuEtapeProps) => {
  const gestionDonneesFormulaire = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as SecteurActivite;
      propageActionSimulateur({
        type: "checkMulti",
        name: "secteurActivite",
        newValue: newValue,
      });
    },
    [propageActionSimulateur],
  );

  const options = useMemo(
    () =>
      transformeSecteursActiviteVersOptions(
        libellesSecteursActivite,
        gestionDonneesFormulaire,
        donneesFormulaire,
      ),
    [gestionDonneesFormulaire, donneesFormulaire],
  );

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        {options && (
          <Checkbox legend={texteQuestionSecteurActivites} options={options} />
        )}
      </div>
    </FormSimulateur>
  );
};

const EtapeSecteursActivite = React.memo(EtapeSecteursActiviteCalculee);

export default EtapeSecteursActivite;
