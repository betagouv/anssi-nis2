import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import { useState } from "react";
import { SecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";

export const EtapeSecteursActivite = ({
  onValider,
}: {
  onValider: (reponse: SecteurActivite[]) => void;
}) => {
  const [reponse, setReponse] = useState<SecteurActivite[]>([]);

  return (
    <BlocPrincipal className="fond-gris" id="etape-formulaire">
      <Stepper
        currentStep={5}
        stepCount={6}
        title="Secteurs d'activité"
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />

      <FormSimulateur>
        <div className="fr-fieldset__element">
          <Checkbox
            legend="Dans quels secteurs d'activités votre organisation produit-elle des biens et/ou des services ?"
            options={Object.entries(libellesSecteursActivite).map(
              ([id, libelle]) => ({
                label: libelle,
                nativeInputProps: {
                  checked: reponse.includes(id as SecteurActivite),
                  onChange: (event) => {
                    if (event.target.checked)
                      setReponse([...reponse, id as SecteurActivite]);
                    else setReponse(reponse.filter((s) => s !== id));
                  },
                },
              }),
            )}
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
};
