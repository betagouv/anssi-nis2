import { useState } from "react";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import {
  TrancheBilanFinancier,
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
    bilanFinancier: TrancheBilanFinancier[],
  ) => void;
  onPrecedent: () => void;
}) {
  const [reponseNombre, setReponseNombre] = useState<TrancheNombreEmployes[]>(
    [],
  );
  const [reponseChiffreAffaire, setReponseChiffreAffaire] = useState<
    TrancheChiffreAffaire[]
  >([]);
  const [reponseBilanFinancier, setReponseBilanFinancier] = useState<
    TrancheBilanFinancier[]
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
                label: "10 à 50 millions €",
                nativeInputProps: {
                  checked: reponseChiffreAffaire[0] === "moyen",
                  onChange: () => setReponseChiffreAffaire(["moyen"]),
                },
              },
              {
                label: "≥ 50 millions €",
                nativeInputProps: {
                  checked: reponseChiffreAffaire[0] === "grand",
                  onChange: () => setReponseChiffreAffaire(["grand"]),
                },
              },
            ]}
          />
          {doitDemanderBilanFinancier(reponseNombre, reponseChiffreAffaire) && (
            <RadioButtons
              legend="Bilan financier annuel de l'année passée"
              options={[
                {
                  label: "< 10 millions €",
                  nativeInputProps: {
                    checked: reponseBilanFinancier[0] === "petit",
                    onChange: () => setReponseBilanFinancier(["petit"]),
                  },
                },
                {
                  label: "10 à 43 millions €",
                  nativeInputProps: {
                    checked: reponseBilanFinancier[0] === "moyen",
                    onChange: () => setReponseBilanFinancier(["moyen"]),
                  },
                },
                {
                  label: "≥ 43 millions €",
                  nativeInputProps: {
                    checked: reponseBilanFinancier[0] === "grand",
                    onChange: () => setReponseBilanFinancier(["grand"]),
                  },
                },
              ]}
            />
          )}
        </div>
      </FormSimulateur>

      <PrecedentSuivant
        message="Sélectionnez une réponse pour chaque critère"
        onSuivant={() =>
          onValider(reponseNombre, reponseChiffreAffaire, reponseBilanFinancier)
        }
        suivantDisabled={
          reponseNombre.length === 0 ||
          reponseChiffreAffaire.length === 0 ||
          (doitDemanderBilanFinancier(reponseNombre, reponseChiffreAffaire) &&
            reponseBilanFinancier.length === 0)
        }
        onPrecedent={onPrecedent}
      />
    </BlocPrincipal>
  );
}

function doitDemanderBilanFinancier(
  trancheNombre: TrancheNombreEmployes[],
  trancheCa: TrancheChiffreAffaire[],
): boolean {
  const [nombre] = trancheNombre;
  const [ca] = trancheCa;

  if (nombre === "petit" && (ca === "moyen" || ca === "grand")) return true;
  if (nombre === "moyen" && ca === "grand") return true;

  return false;
}
