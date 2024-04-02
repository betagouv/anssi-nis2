import { useState } from "react";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import { AppartenancePaysUnionEuropeenne } from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { PrecedentSuivant } from "../PrecedentSuivant.tsx";

export const EtapeAppartenanceUE = ({
  onValider,
  onPrecedent,
}: {
  onValider: (reponse: AppartenancePaysUnionEuropeenne[]) => void;
  onPrecedent: () => void;
}) => {
  const [reponse, setReponse] = useState<AppartenancePaysUnionEuropeenne[]>([]);

  return (
    <BlocPrincipal className="fond-gris" id="etape-formulaire">
      <Stepper
        currentStep={2}
        stepCount={6}
        title="Localisation de l'activité"
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />

      <FormSimulateur>
        <div className="fr-fieldset__element">
          <RadioButtons
            legend="Dans quel état membre de l’Union Européenne êtes-vous établi ?"
            hintText="Pour votre entreprise filiale si celle-ci fait partie d’un groupe,
            ou pour le groupe si celui-ci mène une activité économique.
            Ce sujet pourra être précisé par la Commission Européenne."
            options={[
              {
                label: "France",
                nativeInputProps: {
                  checked: reponse[0] === "france",
                  onChange: () => setReponse(["france"]),
                },
              },
              {
                label: "Autres états membres de l'Union Européenne",
                nativeInputProps: {
                  checked: reponse[0] === "autre",
                  onChange: () => setReponse(["autre"]),
                  disabled: true,
                },
              },
              {
                label: "Autres états hors Union Européenne",
                nativeInputProps: {
                  checked: reponse[0] === "horsue",
                  onChange: () => setReponse(["horsue"]),
                  disabled: true,
                },
              },
            ]}
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

      <PrecedentSuivant
        message="Sélectionnez une réponse"
        onSuivant={() => onValider(reponse)}
        suivantDisabled={reponse.length === 0}
        onPrecedent={onPrecedent}
      />
    </BlocPrincipal>
  );
};
