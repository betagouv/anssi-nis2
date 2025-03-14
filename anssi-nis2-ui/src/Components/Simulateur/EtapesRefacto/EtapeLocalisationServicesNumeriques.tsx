import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { useState } from "react";
import { AppartenancePaysUnionEuropeenne } from "../../../../../commun/core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { PrecedentSuivant } from "../PrecedentSuivant.tsx";
import { TitresEtapes } from "../TitresEtapes.ts";

export function EtapeLocalisationServicesNumeriques({
  onValider,
  onPrecedent,
}: {
  onValider: (pays: AppartenancePaysUnionEuropeenne[]) => void;
  onPrecedent: () => void;
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
        title={TitresEtapes["localisationFournitureServicesNumeriques"]}
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

      <PrecedentSuivant
        message="Sélectionnez au moins une réponse"
        onSuivant={() => onValider(reponse)}
        suivantDisabled={reponse.length === 0}
        onPrecedent={onPrecedent}
      />
    </BlocPrincipal>
  );
}
