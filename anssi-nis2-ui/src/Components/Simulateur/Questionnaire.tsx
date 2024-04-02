import { useReducer, useRef } from "react";
import {
  etatParDefaut,
  EtatQuestionnaire,
  reducerQuestionnaire,
} from "../../questionnaire/reducerQuestionnaire.ts";
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

function executer(actions: ActionQuestionnaire[]): EtatQuestionnaire {
  return actions.reduce(
    (etat: EtatQuestionnaire, action: ActionQuestionnaire) =>
      reducerQuestionnaire(etat, action),
    etatParDefaut,
  );
}

export const Questionnaire = () => {
  const etatInitial: EtatQuestionnaire = useRef(
    executer([
      valideEtapePrealable(),
      valideEtapeDesignation(["non"]),
      valideEtapeAppartenanceUE(["france"]),
      valideTypeStructure(["privee"]),
      valideTailleEntitePrivee(["petit"], ["petit"]),
      valideSecteursActivite(["banqueSecteurBancaire", "eauxUsees", "energie"]),
      valideSousSecteursActivite(["gaz", "hydrogene"]),
      valideActivites(["fournisseurReseauxCommunicationElectroniquesPublics"]),
    ]),
  ).current;

  const [etat, dispatch] = useReducer(reducerQuestionnaire, etatInitial);

  switch (etat.etapeCourante) {
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
        />
      );
    case "typeStructure":
      return (
        <EtapeTypeStructure
          onValider={(reponse) => dispatch(valideTypeStructure(reponse))}
        />
      );
    case "tailleEntitePrivee":
      return (
        <EtapeTailleEntitePrivee
          onValider={(nombre, chiffreAffaire) =>
            dispatch(valideTailleEntitePrivee(nombre, chiffreAffaire))
          }
        />
      );
    case "secteursActivite":
      return (
        <EtapeSecteursActivite
          onValider={(reponse) => dispatch(valideSecteursActivite(reponse))}
        />
      );

    case "sousSecteursActivite":
      return (
        <EtapeSousSecteursActivite
          secteursChoisis={
            etat.secteurActivite.filter((s) =>
              estUnSecteurAvecDesSousSecteurs(s),
            ) as SecteurComposite[]
          }
          onValider={(reponse: SousSecteurActivite[]) =>
            dispatch(valideSousSecteursActivite(reponse))
          }
        />
      );

    case "activites":
      return (
        <EtapeActivites
          secteursChoisis={selectSecteursPourSaisieActivites(etat)}
          onValider={(reponse) => dispatch(valideActivites(reponse))}
        />
      );

    case "localisationEtablissementPrincipal":
      return (
        <EtapeLocalisationEtablissementPrincipal
          onValider={(...pays) =>
            dispatch(valideLocalisationEtablissementPrincipal(...pays))
          }
        />
      );

    case "localisationFournitureServicesNumeriques":
      return (
        <EtapeLocalisationServicesNumeriques
          onValider={(pays) =>
            dispatch(valideLocalisationServicesNumeriques(pays))
          }
        />
      );

    case "resultat":
      return <EtapeResultat reponses={etat} />;
  }
};
