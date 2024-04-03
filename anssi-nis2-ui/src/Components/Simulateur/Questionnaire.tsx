import { PropsWithChildren, useReducer } from "react";
import {
  etatParDefaut,
  reducerQuestionnaire,
} from "../../questionnaire/reducerQuestionnaire.ts";
import { EtapePrealable } from "./EtapesRefacto/EtapePrealable.tsx";
import {
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
import { quiSupporteUndo, undo } from "../../questionnaire/quiSupporteUndo.ts";
import { EtapeDesignation } from "./EtapesRefacto/EtapeDesignation.tsx";
import { EtapeAppartenanceUE } from "./EtapesRefacto/EtapeAppartenanceUE.tsx";
import { EtapeTypeStructure } from "./EtapesRefacto/EtapeTypeStructure.tsx";
import { EtapeTailleEntitePrivee } from "./EtapesRefacto/EtapeTailleEntitePrivee.tsx";
import { EtapeSecteursActivite } from "./EtapesRefacto/EtapeSecteursActivite.tsx";
import { EtapeSousSecteursActivite } from "./EtapesRefacto/EtapeSousSecteursActivite.tsx";
import { EtapeResultat } from "./EtapesRefacto/EtapeResultat.tsx";
import { EtapeActivites } from "./EtapesRefacto/EtapeActivites.tsx";
import { EtapeLocalisationServicesNumeriques } from "./EtapesRefacto/EtapeLocalisationServicesNumeriques.tsx";
import { EtapeLocalisationEtablissementPrincipal } from "./EtapesRefacto/EtapeLocalisationEtablissementPrincipal.tsx";
import { AidezNousAmeliorerService } from "../AidezNousAmeliorerService.tsx";

export const Questionnaire = () => {
  const [etat, dispatch] = useReducer(
    quiSupporteUndo(reducerQuestionnaire, etatParDefaut),
    { courant: etatParDefaut, precedents: [] },
  );

  switch (etat.courant.etapeCourante) {
    case "prealable":
      return (
        <EtapePrealable onValider={() => dispatch(valideEtapePrealable())} />
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
            onValider={(nombre, chiffreAffaire) =>
              dispatch(valideTailleEntitePrivee(nombre, chiffreAffaire))
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
              etat.courant.secteurActivite.filter((s) =>
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
            secteursChoisis={selectSecteursPourSaisieActivites(etat.courant)}
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
      return <EtapeResultat reponses={etat.courant} />;
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
