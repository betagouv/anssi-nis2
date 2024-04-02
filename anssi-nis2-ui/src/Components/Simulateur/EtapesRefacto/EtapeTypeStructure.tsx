import BlocPrincipal from "../../BlocPrincipal.tsx";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import { FormSimulateur } from "../Etapes";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { useState } from "react";
import { TypeStructure } from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { PrecedentSuivant } from "../PrecedentSuivant.tsx";

export const EtapeTypeStructure = ({
  onValider,
  onPrecedent,
}: {
  onValider: (typeStructure: TypeStructure[]) => void;
  onPrecedent: () => void;
}) => {
  const [reponse, setReponse] = useState<TypeStructure[]>([]);

  return (
    <BlocPrincipal className="fond-gris" id="etape-formulaire">
      <Stepper
        currentStep={3}
        stepCount={6}
        title="Type de structure"
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />

      <FormSimulateur>
        <div className="fr-fieldset__element">
          <RadioButtons
            legend="Quel type de structure qualifie votre entité ?"
            options={[
              {
                label: "Entreprise privée ou publique",
                nativeInputProps: {
                  value: "privee",
                  checked: reponse[0] === "privee",
                  onChange: () => setReponse(["privee"]),
                },
              },
              {
                label: "Administration publique",
                nativeInputProps: {
                  value: "publique",
                  checked: reponse[0] === "publique",
                  onChange: () => setReponse(["publique"]),
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
            Le test est dans un premier temps focalisé sur les entreprises
            privées ou publiques. Il sera par la suite disponible pour les
            administrations publiques.
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
