import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import {
  SecteurActivite,
  SecteurComposite,
} from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import { fabriqueTupleSecteurSousSecteurs } from "anssi-nis2-core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.operations.ts";
import { libellesSousSecteursActivite } from "../../../References/LibellesSousSecteursActivite.ts";
import { useState } from "react";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { PrecedentSuivant } from "../PrecedentSuivant.tsx";

export function EtapeSousSecteursActivite({
  secteursChoisis,
  onValider,
  onPrecedent,
}: {
  secteursChoisis: SecteurComposite[];
  onValider: (sousSecteurs: SousSecteurActivite[]) => void;
  onPrecedent: () => void;
}) {
  const [reponse, setReponse] = useState<
    Partial<Record<SecteurActivite, SousSecteurActivite[]>>
  >(dictionnaireParSecteur(secteursChoisis));

  const cocheSousSecteur = (
    secteur: SecteurActivite,
    nouveau: SousSecteurActivite,
  ) => {
    const existants = reponse[secteur];
    const apresAjout = [...existants!, nouveau];
    setReponse({ ...reponse, [secteur]: apresAjout });
  };

  const enleveSousSecteur = (
    secteur: SecteurActivite,
    cible: SousSecteurActivite,
  ) => {
    const existants = reponse[secteur];
    const apresRetrait = existants!.filter(
      (sousSecteur) => sousSecteur !== cible,
    );
    setReponse({ ...reponse, [secteur]: apresRetrait });
  };

  return (
    <BlocPrincipal className="fond-gris" id="etape-formulaire">
      <Stepper
        currentStep={5}
        stepCount={6}
        title="Sous-secteurs d'activité"
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />

      <FormSimulateur>
        <legend className="fr-text--medium">
          Précisez les sous-secteurs concernés :
        </legend>
        <div className="fr-fieldset__element">
          {secteursChoisis.map((s) => (
            <Checkbox
              key={s}
              legend={libellesSecteursActivite[s]}
              options={recupereSousSecteursDe(s as SecteurComposite).map(
                (sousSecteur) => ({
                  label: libellesSousSecteursActivite[sousSecteur],
                  nativeInputProps: {
                    checked: reponse[s]!.includes(sousSecteur),
                    onChange: (event) => {
                      if (event.target.checked)
                        cocheSousSecteur(s, sousSecteur);
                      else enleveSousSecteur(s, sousSecteur);
                    },
                  },
                }),
              )}
            />
          ))}
        </div>
      </FormSimulateur>

      <PrecedentSuivant
        message="Sélectionnez au moins une réponse par secteur"
        onSuivant={() => onValider(tousLesSousSecteursDe(reponse))}
        suivantDisabled={unSecteurEstSansReponse(reponse)}
        onPrecedent={onPrecedent}
      />
    </BlocPrincipal>
  );
}

function dictionnaireParSecteur(secteurs: SecteurActivite[]) {
  return secteurs.reduce((resultat, s) => ({ ...resultat, [s]: [] }), {});
}

function recupereSousSecteursDe(secteur: SecteurComposite) {
  return fabriqueTupleSecteurSousSecteurs(secteur)[1];
}

function tousLesSousSecteursDe(
  reponse: Partial<Record<SecteurActivite, SousSecteurActivite[]>>,
): SousSecteurActivite[] {
  return Object.values(reponse).flat();
}

function unSecteurEstSansReponse(
  reponse: Partial<Record<SecteurActivite, SousSecteurActivite[]>>,
) {
  return Object.values(reponse).some((sousSecteur) => sousSecteur.length === 0);
}
