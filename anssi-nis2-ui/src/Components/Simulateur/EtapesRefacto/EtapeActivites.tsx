import BlocPrincipal from "../../BlocPrincipal.tsx";
import { Stepper } from "@codegouvfr/react-dsfr/Stepper";
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

export function EtapeActivites({
  secteurActivites,
}: {
  secteurActivites: (SecteurSimple | SousSecteurActivite)[];
}) {
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

          {secteurActivites.map((s) => (
            <EnsembleChamps
              legende={libelleSecteurOuSousSecteur(s)}
              optionsSecteurActivite={activitesParSecteurEtSousSecteur[s].map(
                (activite) => ({
                  label: libellesActivites[activite],
                  contenuInfobulle: listeDescriptionsActivites[activite],
                  nativeInputProps: {
                    name: activite,
                    value: activite,
                    onChange: () => {},
                    checked: false,
                  },
                }),
              )}
              key={s}
            />
          ))}
        </div>
      </FormSimulateur>
    </BlocPrincipal>
  );
}

function libelleSecteurOuSousSecteur(s: SecteurSimple | SousSecteurActivite) {
  const estSousSecteur = Object.keys(libellesSousSecteursActivite).includes(s);

  if (!estSousSecteur) return libellesSecteursActivite[s as SecteurSimple];

  const secteurAssocie = secteurDe(s as SousSecteurActivite);
  const racine = libellesSecteursActivite[secteurAssocie];
  const detail = libellesSousSecteursActivite[s as SousSecteurActivite];
  return `${racine} / ${detail}`;
}
