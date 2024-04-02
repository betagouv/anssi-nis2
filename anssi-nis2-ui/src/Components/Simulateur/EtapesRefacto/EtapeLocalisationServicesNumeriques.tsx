import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { useState } from "react";
import { AppartenancePaysUnionEuropeenne } from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";

export function EtapeLocalisationServicesNumeriques({
  onValider,
}: {
  onValider: (pays: AppartenancePaysUnionEuropeenne[]) => void;
}) {
  const [reponse, setReponse] = useState<AppartenancePaysUnionEuropeenne[]>([]);

  const coche = (pays: AppartenancePaysUnionEuropeenne) => {
    setReponse([...reponse, pays]);
  };

  const decoche = (pays: AppartenancePaysUnionEuropeenne) => {
    setReponse(reponse.filter((r) => r !== pays));
  };

  return (
    <BlocPrincipal className="fond-gris" id="etape-formulaire">
      <Stepper
        currentStep={6}
        stepCount={6}
        title="Localisation de votre activité"
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />

      <FormSimulateur>
        <div className="fr-fieldset__element">
          <p>
            Dans quels états membres de l’Union Européenne fournissez-vous des
            services numériques ?
          </p>
          <p className="fr-text-mention--grey fr-text--sm">
            Fournisseur de réseaux de communications électroniques publics, ou
            Fournisseur de services de communications électroniques accessibles
            au public.
          </p>
          <Checkbox
            options={[
              {
                label: "France",
                nativeInputProps: {
                  value: "france",
                  checked: reponse.includes("france"),
                  onChange: (e) => {
                    if (e.target.checked) coche("france");
                    else decoche("france");
                  },
                },
              },
              {
                label: "Autres états membres de l'Union Européenne",
                nativeInputProps: {
                  value: "autre",
                  checked: reponse.includes("autre"),
                  onChange: (e) => {
                    if (e.target.checked) coche("autre");
                    else decoche("autre");
                  },
                },
              },
              {
                label: "Autres états hors Union Européenne",
                nativeInputProps: {
                  value: "horsue",
                  checked: reponse.includes("horsue"),
                  onChange: (e) => {
                    if (e.target.checked) coche("horsue");
                    else decoche("horsue");
                  },
                },
              },
            ]}
          />
        </div>
      </FormSimulateur>

      <div id="stepper-navigation">
        <p className="message-validation">Sélectionnez au moins une réponse</p>
        <div className="conteneur-actions">
          <ButtonsGroup
            alignment="right"
            buttons={[
              {
                children: "Suivant",
                onClick: () => onValider(reponse),
                type: "submit",
                disabled: reponse.length === 0,
              },
            ]}
            inlineLayoutWhen="sm and up"
          />
        </div>
      </div>
    </BlocPrincipal>
  );
}
