import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { libellesSecteursActivite } from "../../../../../commun/core/src/Domain/Simulateur/LibellesSecteursActivite.ts";
import { useState } from "react";
import { SecteurActivite } from "../../../../../commun/core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { PrecedentSuivant } from "../PrecedentSuivant.tsx";
import { TitresEtapes } from "../TitresEtapes.ts";

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
        title={TitresEtapes["secteursActivite"]}
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />

      <FormSimulateur>
        <div className="fr-fieldset__element">
          <legend className="fr-text--regular">
            Dans quels secteurs d&apos;activités votre organisation produit-elle
            des biens et/ou des services ?
          </legend>

          <div className="fr-notice fr-notice--info fr-mb-3w fr-mt-3w">
            <div className="fr-container">
              <div className="fr-notice__body">
                <p>
                  Il a été observé que certaines entités, lors de leur
                  utilisation du simulateur, sélectionnent le secteur
                  d&apos;activité d&apos;entités dont elles sont les
                  fournisseurs ou les sous-traitants au lieu du secteur de
                  réalisation de leurs propres activités. <br />
                  À titre d&apos;exemple, un fournisseur de turbine
                  d&apos;éolienne, pouvant se considérer comme étant du secteur
                  «&nbsp;Énergie&nbsp;», sera en réalité associé au secteur
                  «&nbsp;Fabrication&nbsp;» (correspondant à l&apos;industrie
                  manufacturière) selon le prisme établi par la directive
                  NIS&nbsp;2. <br />
                  Une telle confusion fausse les résultats du test. Les entités
                  utilisant le simulateur sont donc invitées à renseigner les
                  différentes rubriques avec le plus grand soin, avec un focus
                  particulier sur le secteur Fabrication qui regroupe plus de
                  500 activités distinctes.
                </p>
              </div>
            </div>
          </div>

          <Checkbox
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
