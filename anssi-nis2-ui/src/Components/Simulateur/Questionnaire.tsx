import { Dispatch, PropsWithChildren } from "react";
import { EtapePrealable } from "./EtapesRefacto/EtapePrealable.tsx";
import {
  ActionQuestionnaire,
  valideActivites,
  valideEtapeAppartenanceUE,
  valideEtapeDesignation,
  valideEtapePrealable,
  valideLocalisationEtablissementPrincipal,
  valideLocalisationServicesNumeriques,
  valideSecteursActivite,
  valideSousSecteursActivite,
  valideTailleEntitePrivee,
  valideTypeStructure,
} from "../../questionnaire/actions.ts";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { estUnSecteurAvecDesSousSecteurs } from "anssi-nis2-core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import { SecteurComposite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { selectSecteursPourSaisieActivites } from "../../questionnaire/selecteursQuestionnaire.ts";
import { ActionUndo, undo } from "../../questionnaire/quiSupporteUndo.ts";
import { EtapeDesignation } from "./EtapesRefacto/EtapeDesignation.tsx";
import { EtapeAppartenanceUE } from "./EtapesRefacto/EtapeAppartenanceUE.tsx";
import { EtapeTypeStructure } from "./EtapesRefacto/EtapeTypeStructure.tsx";
import { EtapeTailleEntitePrivee } from "./EtapesRefacto/EtapeTailleEntitePrivee.tsx";
import { EtapeSecteursActivite } from "./EtapesRefacto/EtapeSecteursActivite.tsx";
import { EtapeSousSecteursActivite } from "./EtapesRefacto/EtapeSousSecteursActivite.tsx";
import { EtapeActivites } from "./EtapesRefacto/EtapeActivites.tsx";
import { EtapeLocalisationServicesNumeriques } from "./EtapesRefacto/EtapeLocalisationServicesNumeriques.tsx";
import { EtapeLocalisationEtablissementPrincipal } from "./EtapesRefacto/EtapeLocalisationEtablissementPrincipal.tsx";
import { AidezNousAmeliorerService } from "../AidezNousAmeliorerService.tsx";
import { EnvoieDonneesFormulaire } from "../../Services/Simulateur/Operations/appelsApi";
import { centreSurHautFormulaire } from "./scroll.ts";
import { PersisteReponsesDuQuestionnaire } from "./EtapesRefacto/PersisteReponsesDuQuestionnaire.tsx";
import { AiguilleVersEtapeResultat } from "./AiguilleVersEtapeResultat.tsx";
import { EtatQuestionnaire } from "anssi-nis2-core/src/Domain/Questionnaire/EtatQuestionnaire";

export const Questionnaire = ({
  etat,
  dispatch,
  envoieDonneesFormulaire,
}: {
  etat: EtatQuestionnaire;
  dispatch: Dispatch<ActionQuestionnaire | ActionUndo>;
  envoieDonneesFormulaire: EnvoieDonneesFormulaire;
}) => {
  switch (etat.etapeCourante) {
    case "prealable":
      return (
        <EtapePrealable
          onValider={() => {
            dispatch(valideEtapePrealable());
            centreSurHautFormulaire();
          }}
        />
      );

    case "designationOperateurServicesEssentiels":
      return (
        <AvecDemandeDeFeedback>
          <EtapeDesignation
            onValider={(reponse) => dispatch(valideEtapeDesignation(reponse))}
          />
        </AvecDemandeDeFeedback>
      );

    case "appartenanceUnionEuropeenne":
      return (
        <AvecDemandeDeFeedback>
          <EtapeAppartenanceUE
            onValider={(reponse) =>
              dispatch(valideEtapeAppartenanceUE(reponse))
            }
            onPrecedent={() => dispatch(undo())}
          />
        </AvecDemandeDeFeedback>
      );

    case "typeStructure":
      return (
        <AvecDemandeDeFeedback>
          <EtapeTypeStructure
            onValider={(reponse) => dispatch(valideTypeStructure(reponse))}
            onPrecedent={() => dispatch(undo())}
          />
        </AvecDemandeDeFeedback>
      );

    case "tailleEntitePrivee":
      return (
        <AvecDemandeDeFeedback>
          <EtapeTailleEntitePrivee
            onValider={(nombre, chiffreAffaire, bilanFinancier) =>
              dispatch(
                valideTailleEntitePrivee(
                  nombre,
                  chiffreAffaire,
                  bilanFinancier,
                ),
              )
            }
            onPrecedent={() => dispatch(undo())}
          />
        </AvecDemandeDeFeedback>
      );

    case "secteursActivite":
      return (
        <AvecDemandeDeFeedback>
          <EtapeSecteursActivite
            onValider={(reponse) => dispatch(valideSecteursActivite(reponse))}
            onPrecedent={() => dispatch(undo())}
          />
        </AvecDemandeDeFeedback>
      );

    case "sousSecteursActivite":
      return (
        <AvecDemandeDeFeedback>
          <EtapeSousSecteursActivite
            secteursChoisis={
              etat.secteurActivite.filter((s) =>
                estUnSecteurAvecDesSousSecteurs(s),
              ) as SecteurComposite[]
            }
            onValider={(reponse: SousSecteurActivite[]) =>
              dispatch(valideSousSecteursActivite(reponse))
            }
            onPrecedent={() => dispatch(undo())}
          />
        </AvecDemandeDeFeedback>
      );

    case "activites":
      return (
        <AvecDemandeDeFeedback>
          <EtapeActivites
            secteursChoisis={selectSecteursPourSaisieActivites(etat)}
            onValider={(reponse) => dispatch(valideActivites(reponse))}
            onPrecedent={() => dispatch(undo())}
          />
        </AvecDemandeDeFeedback>
      );

    case "localisationEtablissementPrincipal":
      return (
        <AvecDemandeDeFeedback>
          <EtapeLocalisationEtablissementPrincipal
            onValider={(...pays) =>
              dispatch(valideLocalisationEtablissementPrincipal(...pays))
            }
            onPrecedent={() => dispatch(undo())}
          />
        </AvecDemandeDeFeedback>
      );

    case "localisationFournitureServicesNumeriques":
      return (
        <AvecDemandeDeFeedback>
          <EtapeLocalisationServicesNumeriques
            onValider={(pays) =>
              dispatch(valideLocalisationServicesNumeriques(pays))
            }
            onPrecedent={() => dispatch(undo())}
          />
        </AvecDemandeDeFeedback>
      );

    case "resultat":
      return (
        <PersisteReponsesDuQuestionnaire
          reponses={etat}
          persistance={envoieDonneesFormulaire}
        >
          <AiguilleVersEtapeResultat reponses={etat} />
        </PersisteReponsesDuQuestionnaire>
      );
  }
};

function AvecDemandeDeFeedback(props: PropsWithChildren) {
  return (
    <>
      {props.children}
      <AidezNousAmeliorerService />
    </>
  );
}
