import { useMemo } from "react";
import { FormSimulateur } from ".";
import { AppartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { NomsChampsSimulateur } from "../../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import {
  libellesPaysUnionEuropeenneLocalisation,
  libellesPaysUnionEuropeenneLocalisationUE,
} from "../../../References/Libelles.ts";
import {
  texteQuestionLocalisastionsEtabDecisionsCyber,
  texteQuestionLocalisastionsEtabOperationsCyber,
  texteQuestionLocalisastionsEtabPlusGrandNombreSalaries,
} from "../../../References/LibellesQuestionsSimulateur.ts";
import { genereTransformateurValeursVersOptions } from "../../../Services/Simulateur/genereTransformateurValeursVersOptions.ts";
import { fabriqueGestionChangementSimple } from "../../../Services/Simulateur/gestionnaires.ts";
import { SimulateurContenuEtapeProps } from "../../../Services/Simulateur/Props/simulateurEtapeProps";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";

const fabriqueTransformateurOptionsCompletes = <
  TypeChamp extends AppartenancePaysUnionEuropeenne,
>(
  nomChamps: Extract<
    NomsChampsSimulateur,
    "paysDecisionsCyber" | "paysOperationsCyber" | "paysPlusGrandNombreSalaries"
  >,
) =>
  genereTransformateurValeursVersOptions<TypeChamp, string>(
    (valeur) => libellesPaysUnionEuropeenneLocalisation[valeur],
    nomChamps,
  );

const EtapeLocalisationsServices = ({
  donneesFormulaire,
  propageActionSimulateur,
}: SimulateurContenuEtapeProps) => {
  const gestionDonneesFormulaire = fabriqueGestionChangementSimple(
    propageActionSimulateur,
  );
  const optionsPaysDecisionsCyber = useMemo(
    () =>
      fabriqueTransformateurOptionsCompletes("paysDecisionsCyber")(
        libellesPaysUnionEuropeenneLocalisation,
        gestionDonneesFormulaire,
        donneesFormulaire,
      ),
    [gestionDonneesFormulaire, donneesFormulaire],
  );
  const optionsPaysOperationsCyber = useMemo(
    () =>
      fabriqueTransformateurOptionsCompletes("paysOperationsCyber")(
        libellesPaysUnionEuropeenneLocalisation,
        gestionDonneesFormulaire,
        donneesFormulaire,
      ),
    [gestionDonneesFormulaire, donneesFormulaire],
  );
  const optionsPaysPlusGrandNombreSalaries = useMemo(
    () =>
      fabriqueTransformateurOptionsCompletes<
        Exclude<AppartenancePaysUnionEuropeenne, "horsue">
      >("paysPlusGrandNombreSalaries")(
        libellesPaysUnionEuropeenneLocalisationUE,
        gestionDonneesFormulaire,
        donneesFormulaire,
      ),
    [gestionDonneesFormulaire, donneesFormulaire],
  );

  const paysDecisionsCyberEstHorsUE = useMemo(
    () => donneesFormulaire.paysDecisionsCyber.includes("horsue"),
    [donneesFormulaire],
  );
  const paysOperationsCyberEstHorsUE = useMemo(
    () => donneesFormulaire.paysOperationsCyber.includes("horsue"),
    [donneesFormulaire],
  );

  return (
    <FormSimulateur>
      <div className="fr-fieldset__element">
        <RadioButtons
          legend={texteQuestionLocalisastionsEtabDecisionsCyber}
          options={optionsPaysDecisionsCyber}
        />
      </div>

      {paysDecisionsCyberEstHorsUE && (
        <div className="fr-fieldset__element">
          <RadioButtons
            legend={texteQuestionLocalisastionsEtabOperationsCyber}
            options={optionsPaysOperationsCyber}
          />
        </div>
      )}
      {paysOperationsCyberEstHorsUE && (
        <div className="fr-fieldset__element">
          <RadioButtons
            legend={texteQuestionLocalisastionsEtabPlusGrandNombreSalaries}
            options={optionsPaysPlusGrandNombreSalaries}
          />
        </div>
      )}
    </FormSimulateur>
  );
};

export default EtapeLocalisationsServices;
