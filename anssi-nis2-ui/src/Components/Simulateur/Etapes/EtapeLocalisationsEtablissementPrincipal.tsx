import { AppartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { libellesPaysUnionEuropeenneLocalisation } from "../../../References/Libelles.ts";
import {
  texteQuestionLocalisastionsServices,
  texteQuestionLocalisastionsServicesMention,
} from "../../../References/LibellesQuestionsSimulateur.ts";
import { genereTransformateurValeursVersOptions } from "../../../Services/Simulateur/genereTransformateurValeursVersOptions.ts";
import { TransformeRecordToSelect } from "../../../Services/Simulateur/Operations/OptionsChampsSimulateur.declarations.ts";
import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import { FormSimulateur } from ".";
import { useCallback, useMemo } from "react";

const getAppartenancePaysUnionEuropeenneLabel = (
  value: AppartenancePaysUnionEuropeenne,
  secteurActivite: Record<AppartenancePaysUnionEuropeenne, string>,
) => secteurActivite[value];

const transformeAppartenancePaysUnionEuropeenneVersOptions: TransformeRecordToSelect<AppartenancePaysUnionEuropeenne> =
  genereTransformateurValeursVersOptions(
    getAppartenancePaysUnionEuropeenneLabel,
    "localisationFournitureServicesNumeriques",
  );

const EtapeLocalisationsServices = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gestionDonneesFormulaire = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value as AppartenancePaysUnionEuropeenne;
      propageActionSimulateur({
        type: "checkSingle",
        name: "pays",
        newValue: newValue,
      });
    },
    [propageActionSimulateur],
  );
  const options = useMemo(
    () =>
      transformeAppartenancePaysUnionEuropeenneVersOptions(
        libellesPaysUnionEuropeenneLocalisation,
        gestionDonneesFormulaire,
        donneesFormulaire,
      ),
    [gestionDonneesFormulaire, donneesFormulaire],
  );

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <p>{texteQuestionLocalisastionsServices}</p>
        <p className="fr-text-mention--grey fr-text--sm">
          {texteQuestionLocalisastionsServicesMention}
        </p>
        {options && <Checkbox options={options} />}
      </div>
    </FormSimulateur>
  );
};

export default EtapeLocalisationsServices;
