import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import { useState } from "react";
import { SecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { PrecedentSuivant } from "../PrecedentSuivant.tsx";

export const EtapeSecteursActivite = ({
  onValider,
  onPrecedent,
}: {
  onValider: (reponse: SecteurActivite[]) => void;
  onPrecedent: () => void;
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
            options={(
              Object.entries(libellesSecteursActivite) as [
                SecteurActivite,
                string,
              ][]
            ).map(([id, libelle]) => ({
              label: libelle,
              nativeInputProps: {
                checked: reponse.includes(id),
                onChange: (event) => {
                  if (event.target.checked) setReponse([...reponse, id]);
                  else setReponse(reponse.filter((s) => s !== id));
                },
              },
            }))}
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
};
