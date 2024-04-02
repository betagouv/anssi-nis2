import { useState } from "react";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
import BlocPrincipal from "../../BlocPrincipal.tsx";
import { FormSimulateur } from "../Etapes";
import { SecteurSimple } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { EnsembleChamps } from "../Inputs/EnsembleChamps.tsx";
import { libellesSecteursActivite } from "../../../References/LibellesSecteursActivite.ts";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { libellesSousSecteursActivite } from "../../../References/LibellesSousSecteursActivite.ts";
import { secteurDe } from "anssi-nis2-core/src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.operations.ts";
import { activitesParSecteurEtSousSecteur } from "anssi-nis2-core/src/Domain/Simulateur/Activite.operations.ts";
import { libellesActivites } from "../../../References/LibellesActivites.ts";
import { listeDescriptionsActivites } from "../../../References/ListeDescriptionsActivites.ts";
import ButtonsGroup from "@codegouvfr/react-dsfr/ButtonsGroup";
import { Activite } from "anssi-nis2-core/src/Domain/Simulateur/Activite.definitions.ts";

type SecteurAvecActivite = SecteurSimple | SousSecteurActivite;
type StateDeReponse = Partial<Record<SecteurAvecActivite, Activite[]>>;

export function EtapeActivites({
  secteursChoisis,
  onValider,
}: {
  secteursChoisis: SecteurAvecActivite[];
  onValider: (activites: Activite[]) => void;
}) {
  const [reponse, setReponse] = useState<StateDeReponse>(
    dictionnaireParSecteur(secteursChoisis),
  );

  const cocheActivite = (secteur: SecteurAvecActivite, cochee: Activite) => {
    const existantes = reponse[secteur];
    const apresAjout = [...existantes!, cochee];
    setReponse({ ...reponse, [secteur]: apresAjout });
  };

  const enleveActivite = (secteur: SecteurAvecActivite, cible: Activite) => {
    const existantes = reponse[secteur];
    const apresRetrait = existantes!.filter((activite) => activite !== cible);
    setReponse({ ...reponse, [secteur]: apresRetrait });
  };

  return (
    <BlocPrincipal className="fond-gris" id="etape-formulaire">
      <Stepper
        currentStep={6}
        stepCount={6}
        title="Activités pratiquées"
        className="fr-mb-5w"
      />
      <hr className="fr-pb-5w" />
      <FormSimulateur>
        <div className="fr-fieldset__element">
          <p>
            Quelles sont les activités pratiquées dans les secteurs sélectionnés
            ?
          </p>
          <p className="fr-text-mention--grey fr-text--sm">
            Cliquez sur les info-bulles pour obtenir plus d’informations sur les
            définitions des activités.
          </p>

          {secteursChoisis.map((s) => (
            <EnsembleChamps
              legende={libelleSecteurOuSousSecteur(s)}
              optionsSecteurActivite={activitesParSecteurEtSousSecteur[s].map(
                (activite) => ({
                  label: libellesActivites[activite],
                  contenuInfobulle: listeDescriptionsActivites[activite],
                  nativeInputProps: {
                    name: activite,
                    value: activite,
                    onChange: (event) => {
                      if (event.target.checked) cocheActivite(s, activite);
                      else enleveActivite(s, activite);
                    },
                    checked: reponse[s]!.includes(activite),
                  },
                }),
              )}
              key={s}
            />
          ))}
        </div>
      </FormSimulateur>

      <div id="stepper-navigation">
        <p className="message-validation">
          Sélectionnez au moins une réponse par secteur
        </p>
        <div className="conteneur-actions">
          <ButtonsGroup
            alignment="right"
            buttons={[
              {
                children: "Suivant",
                onClick: () => onValider(toutesLesActivitesDe(reponse)),
                type: "submit",
                disabled: unSecteurEstSansReponse(reponse),
              },
            ]}
            inlineLayoutWhen="sm and up"
          />
        </div>
      </div>
    </BlocPrincipal>
  );
}

function dictionnaireParSecteur(secteurs: SecteurAvecActivite[]) {
  return secteurs.reduce((resultat, s) => ({ ...resultat, [s]: [] }), {});
}

function libelleSecteurOuSousSecteur(s: SecteurAvecActivite) {
  const estSousSecteur = Object.keys(libellesSousSecteursActivite).includes(s);

  if (!estSousSecteur) return libellesSecteursActivite[s as SecteurSimple];

  const secteurAssocie = secteurDe(s as SousSecteurActivite);
  const racine = libellesSecteursActivite[secteurAssocie];
  const detail = libellesSousSecteursActivite[s as SousSecteurActivite];
  return `${racine} / ${detail}`;
}

function unSecteurEstSansReponse(reponse: StateDeReponse) {
  return Object.values(reponse).some((activites) => activites.length === 0);
}

function toutesLesActivitesDe(reponse: StateDeReponse) {
  return Object.values(reponse).flat();
}
