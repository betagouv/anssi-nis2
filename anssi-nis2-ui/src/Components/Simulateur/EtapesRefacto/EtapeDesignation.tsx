import BlocPrincipal from "../../BlocPrincipal.tsx";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { FormSimulateur } from "../Etapes";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { DesignationOperateurServicesEssentiels } from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { useState } from "react";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";

export const EtapeDesignation = ({
  onValider,
}: {
  onValider: (reponse: DesignationOperateurServicesEssentiels[]) => void;
}) => {
  const [reponse, setReponse] = useState<
    DesignationOperateurServicesEssentiels[]
  >([]);

  return (
    <BlocPrincipal className="fond-gris" id="etape-formulaire">
      <Stepper
        currentStep={1}
        stepCount={6}
        title="Désignation éventuelle"
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />

      <FormSimulateur>
        <div className="fr-fieldset__element">
          <RadioButtons
            legend="Avez-vous été désigné opérateur de services essentiels (OSE) au titre de NIS 1 ?"
            options={[
              {
                label: "Oui",
                nativeInputProps: {
                  checked: reponse[0] === "oui",
                  onChange: () => setReponse(["oui"]),
                },
              },
              {
                label: "Non",
                nativeInputProps: {
                  checked: reponse[0] === "non",
                  onChange: () => setReponse(["non"]),
                },
              },
              {
                label: "Ne sais pas",
                nativeInputProps: {
                  checked: reponse[0] === "nsp",
                  onChange: () => setReponse(["nsp"]),
                },
              },
            ]}
          />
        </div>
      </FormSimulateur>

      <div id="stepper-navigation">
        <p className="message-validation">Sélectionnez une réponse</p>
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
};
