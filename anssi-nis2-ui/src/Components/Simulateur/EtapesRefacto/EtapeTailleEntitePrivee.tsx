import { useState } from "react";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";

export function EtapeTailleEntitePrivee({
  onValider,
}: {
  onValider: (
    nombre: TrancheNombreEmployes[],
    chiffreAffaire: TrancheChiffreAffaire[],
  ) => void;
}) {
  const [reponseNombre, setReponseNombre] = useState<TrancheNombreEmployes[]>(
    [],
  );
  const [reponseChiffreAffaire, setReponseChiffreAffaire] = useState<
    TrancheChiffreAffaire[]
  >([]);

  return (
    <BlocPrincipal className="fond-gris" id="etape-formulaire">
      <Stepper
        currentStep={4}
        stepCount={6}
        title="Taille de l'organisation"
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />

      <FormSimulateur>
        <div className="fr-fieldset__element">
          <legend className="fr-text--medium">
            Quelles sont les caractéristiques clés de votre entité
          </legend>
          <RadioButtons
            legend="Nombre d’employés (équivalents temps pleins)"
            options={[
              {
                label: "1 à 49",
                nativeInputProps: {
                  checked: reponseNombre[0] === "petit",
                  onChange: () => setReponseNombre(["petit"]),
                },
              },
              {
                label: "50 à 49",
                nativeInputProps: {
                  checked: reponseNombre[0] === "moyen",
                  onChange: () => setReponseNombre(["moyen"]),
                },
              },
              {
                label: "≥ 250",
                nativeInputProps: {
                  checked: reponseNombre[0] === "grand",
                  onChange: () => setReponseNombre(["grand"]),
                },
              },
            ]}
          />
          <RadioButtons
            legend="Chiffre d’affaires annuel de l'année passée"
            options={[
              {
                label: "< 10 millions €",
                nativeInputProps: {
                  checked: reponseChiffreAffaire[0] === "petit",
                  onChange: () => setReponseChiffreAffaire(["petit"]),
                },
              },
              {
                label:
                  "10 à 50 millions €, ou bilan annuel de 10 à 43 millions €",
                nativeInputProps: {
                  checked: reponseChiffreAffaire[0] === "moyen",
                  onChange: () => setReponseChiffreAffaire(["moyen"]),
                },
              },
              {
                label: "≥ 50 millions €, ou bilan annuel ≥ 43 millions €",
                nativeInputProps: {
                  checked: reponseChiffreAffaire[0] === "grand",
                  onChange: () => setReponseChiffreAffaire(["grand"]),
                },
              },
            ]}
          />
        </div>
      </FormSimulateur>

      <div id="stepper-navigation">
        <p className="message-validation">
          Sélectionnez une réponse pour chaque critère
        </p>
        <div className="conteneur-actions">
          <ButtonsGroup
            alignment="right"
            buttons={[
              {
                children: "Suivant",
                onClick: () => onValider(reponseNombre, reponseChiffreAffaire),
                type: "submit",
                disabled:
                  reponseNombre.length === 0 ||
                  reponseChiffreAffaire.length === 0,
              },
            ]}
            inlineLayoutWhen="sm and up"
          />
        </div>
      </div>
    </BlocPrincipal>
  );
}
