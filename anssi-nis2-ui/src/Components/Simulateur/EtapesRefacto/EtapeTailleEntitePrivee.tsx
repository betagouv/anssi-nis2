import { useState } from "react";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import {
  TrancheChiffreAffaire,
  TrancheNombreEmployes,
} from "anssi-nis2-core/src/Domain/Simulateur/ChampsSimulateur.definitions.ts";
import { PrecedentSuivant } from "../PrecedentSuivant.tsx";
import { TitresEtapes } from "../TitresEtapes.ts";

export function EtapeTailleEntitePrivee({
  onValider,
  onPrecedent,
}: {
  onValider: (
    nombre: TrancheNombreEmployes[],
    chiffreAffaire: TrancheChiffreAffaire[],
  ) => void;
  onPrecedent: () => void;
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
        title={TitresEtapes["tailleEntitePrivee"]}
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
                label: "50 à 249",
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

      <PrecedentSuivant
        message="Sélectionnez une réponse pour chaque critère"
        onSuivant={() => onValider(reponseNombre, reponseChiffreAffaire)}
        suivantDisabled={
          reponseNombre.length === 0 || reponseChiffreAffaire.length === 0
        }
        onPrecedent={onPrecedent}
      />
    </BlocPrincipal>
  );
}
