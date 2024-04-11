import { useState } from "react";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { AppartenancePaysUnionEuropeenne } from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { contientUnParmi } from "../../../../../commun/utils/services/commun.predicats.ts";
import { PrecedentSuivant } from "../PrecedentSuivant.tsx";
import { TitresEtapes } from "../TitresEtapes.ts";

type StateDeReponse = {
  paysDecision: AppartenancePaysUnionEuropeenne[];
  paysOperation: AppartenancePaysUnionEuropeenne[];
  paysSalaries: AppartenancePaysUnionEuropeenne[];
};

export function EtapeLocalisationEtablissementPrincipal({
  onValider,
  onPrecedent,
}: {
  onValider: (
    paysDecision: AppartenancePaysUnionEuropeenne[],
    paysOperation: AppartenancePaysUnionEuropeenne[],
    paysSalaries: AppartenancePaysUnionEuropeenne[],
  ) => void;
  onPrecedent: () => void;
}) {
  const [reponse, setReponse] = useState<StateDeReponse>({
    paysDecision: [],
    paysOperation: [],
    paysSalaries: [],
  });

  const paysDecisionEstHorsUE = reponse.paysDecision.includes("horsue");
  const paysOperationEstHorsUE = reponse.paysOperation.includes("horsue");

  return (
    <BlocPrincipal className="fond-gris" id="etape-formulaire">
      <Stepper
        currentStep={6}
        stepCount={6}
        title={TitresEtapes["localisationEtablissementPrincipal"]}
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />

      <FormSimulateur>
        <ChoixPaysDecision
          valeur={reponse.paysDecision[0]}
          onChange={(pays) =>
            setReponse({
              paysDecision: [pays],
              paysOperation: [],
              paysSalaries: [],
            })
          }
        />

        {paysDecisionEstHorsUE && (
          <ChoixPaysOperation
            valeur={reponse.paysOperation[0]}
            onChange={(pays) =>
              setReponse({
                ...reponse,
                paysOperation: [pays],
                paysSalaries: [],
              })
            }
          />
        )}

        {paysOperationEstHorsUE && (
          <ChoixPaysSalarie
            valeur={reponse.paysSalaries[0]}
            onChange={(pays) =>
              setReponse({ ...reponse, paysSalaries: [pays] })
            }
          />
        )}
      </FormSimulateur>

      <PrecedentSuivant
        message="Sélectionnez au moins une réponse"
        onSuivant={() =>
          onValider(
            reponse.paysDecision,
            reponse.paysOperation,
            reponse.paysSalaries,
          )
        }
        suivantDisabled={!reponseEstComplete(reponse)}
        onPrecedent={onPrecedent}
      />
    </BlocPrincipal>
  );
}

function ChoixPaysDecision({
  onChange,
  valeur,
}: {
  valeur: AppartenancePaysUnionEuropeenne;
  onChange: (pays: AppartenancePaysUnionEuropeenne) => void;
}) {
  return (
    <div className="fr-fieldset__element">
      <RadioButtons
        legend="Dans quel pays sont principalement prises les décisions relatives aux mesures de gestion des risques en matière de cybersécurité ?"
        options={[
          uneOption("France", "france", valeur === "france", () =>
            onChange("france"),
          ),
          uneOption(
            "Autres états membres de l'Union Européenne",
            "autre",
            valeur === "autre",
            () => onChange("autre"),
          ),
          uneOption(
            "Autres états hors Union Européenne",
            "horsue",
            valeur === "horsue",
            () => onChange("horsue"),
          ),
        ]}
      />
    </div>
  );
}

function ChoixPaysOperation(props: {
  valeur: AppartenancePaysUnionEuropeenne;
  onChange: (pays: AppartenancePaysUnionEuropeenne) => void;
}) {
  const { valeur, onChange } = props;
  return (
    <div className="fr-fieldset__element">
      <RadioButtons
        legend="Dans quel pays les opérations de cybersécurité sont-elles effectuées ?"
        options={[
          uneOption("France", "france", valeur === "france", () =>
            onChange("france"),
          ),
          uneOption(
            "Autres états membres de l'Union Européenne",
            "autre",
            valeur === "autre",
            () => onChange("autre"),
          ),
          uneOption(
            "Autres états hors Union Européenne",
            "horsue",
            valeur === "horsue",
            () => onChange("horsue"),
          ),
        ]}
      />
    </div>
  );
}

function ChoixPaysSalarie({
  onChange,
  valeur,
}: {
  valeur: AppartenancePaysUnionEuropeenne;
  onChange: (pays: AppartenancePaysUnionEuropeenne) => void;
}) {
  return (
    <div className="fr-fieldset__element">
      <RadioButtons
        legend="Dans quel pays votre entité possède-t-elle l’établissement comptant le plus grand nombre de salariés dans l’Union Européenne ?"
        options={[
          uneOption("France", "france", valeur === "france", () =>
            onChange("france"),
          ),
          uneOption(
            "Autres états membres de l'Union Européenne",
            "autre",
            valeur === "autre",
            () => onChange("autre"),
          ),
        ]}
      />
    </div>
  );
}

function uneOption(
  label: string,
  value: AppartenancePaysUnionEuropeenne,
  checked: boolean,
  onChange: () => void,
) {
  return { label, nativeInputProps: { value, checked, onChange } };
}

function reponseEstComplete(reponse: StateDeReponse) {
  const { paysDecision, paysOperation, paysSalaries } = reponse;

  const decisionEnFranceOuUE = contientUnParmi(...paysDecision)([
    "france",
    "autre",
  ]);

  const decisionHorsUE = paysDecision[0] === "horsue";
  const operationEnFranceOuUE = contientUnParmi(...paysOperation)([
    "france",
    "autre",
  ]);

  const operationHorsUE = paysOperation[0] === "horsue";
  const paysSalariesRepondu = paysSalaries.length > 0;

  return (
    decisionEnFranceOuUE ||
    (decisionHorsUE && operationEnFranceOuUE) ||
    (operationHorsUE && paysSalariesRepondu)
  );
}
