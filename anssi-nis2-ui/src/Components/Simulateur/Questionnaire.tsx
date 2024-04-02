import { useReducer } from "react";
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
import { EtapeDesignation } from "./EtapesRefacto/EtapeDesignation.tsx";
import { EtapeAppartenanceUE } from "./EtapesRefacto/EtapeAppartenanceUE.tsx";
import { EtapeTypeStructure } from "./EtapesRefacto/EtapeTypeStructure.tsx";
import { EtapeTailleEntitePrivee } from "./EtapesRefacto/EtapeTailleEntitePrivee.tsx";
import { EtapeSecteursActivite } from "./EtapesRefacto/EtapeSecteursActivite.tsx";
import { SousSecteurActivite } from "anssi-nis2-core/src/Domain/Simulateur/SousSecteurActivite.definitions.ts";
import { EtapeSousSecteursActivite } from "./EtapesRefacto/EtapeSousSecteursActivite.tsx";
import { EtapeResultat } from "./EtapesRefacto/EtapeResultat.tsx";
import { EtapeActivites } from "./EtapesRefacto/EtapeActivites.tsx";
import { selectSecteursPourSaisieActivites } from "../../questionnaire/selecteursQuestionnaire.ts";
import { estUnSecteurAvecDesSousSecteurs } from "anssi-nis2-core/src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";
import { SecteurComposite } from "anssi-nis2-core/src/Domain/Simulateur/SecteurActivite.definitions.ts";
import { EtapeLocalisationServicesNumeriques } from "./EtapesRefacto/EtapeLocalisationServicesNumeriques.tsx";
import { EtapeLocalisationEtablissementPrincipal } from "./EtapesRefacto/EtapeLocalisationEtablissementPrincipal.tsx";
import { quiSupporteUndo, undo } from "../../questionnaire/quiSupporteUndo.ts";

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
        <EtapeDesignation
          onValider={(reponse) => dispatch(valideEtapeDesignation(reponse))}
        />
      );
    case "appartenanceUnionEuropeenne":
      return (
        <EtapeAppartenanceUE
          onValider={(reponse) => dispatch(valideEtapeAppartenanceUE(reponse))}
          onPrecedent={() => dispatch(undo())}
        />
      );
    case "typeStructure":
      return (
        <EtapeTypeStructure
          onValider={(reponse) => dispatch(valideTypeStructure(reponse))}
          onPrecedent={() => dispatch(undo())}
        />
      );
    case "tailleEntitePrivee":
      return (
        <EtapeTailleEntitePrivee
          onValider={(nombre, chiffreAffaire) =>
            dispatch(valideTailleEntitePrivee(nombre, chiffreAffaire))
          }
          onPrecedent={() => dispatch(undo())}
        />
      );
    case "secteursActivite":
      return (
        <EtapeSecteursActivite
          onValider={(reponse) => dispatch(valideSecteursActivite(reponse))}
          onPrecedent={() => dispatch(undo())}
        />
      );

    case "sousSecteursActivite":
      return (
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
      );

    case "activites":
      return (
        <EtapeActivites
          secteursChoisis={selectSecteursPourSaisieActivites(etat.courant)}
          onValider={(reponse) => dispatch(valideActivites(reponse))}
          onPrecedent={() => dispatch(undo())}
        />
      );

    case "localisationEtablissementPrincipal":
      return (
        <EtapeLocalisationEtablissementPrincipal
          onValider={(...pays) =>
            dispatch(valideLocalisationEtablissementPrincipal(...pays))
          }
          onPrecedent={() => dispatch(undo())}
        />
      );

    case "localisationFournitureServicesNumeriques":
      return (
        <EtapeLocalisationServicesNumeriques
          onValider={(pays) =>
            dispatch(valideLocalisationServicesNumeriques(pays))
          }
          onPrecedent={() => dispatch(undo())}
        />
      );

    case "resultat":
      return <EtapeResultat reponses={etat.courant} />;
  }
};
