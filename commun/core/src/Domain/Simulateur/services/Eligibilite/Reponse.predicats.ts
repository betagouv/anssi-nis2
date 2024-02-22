import { tous } from "../../../../../../utils/services/sets.operations";
import { estSecteurNecessitantLocalisationRepresentantPetiteEntite } from "../../SecteurActivite.constantes";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { estSecteurAutre } from "../SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurAutre } from "../SousSecteurActivite/SousSecteurActivite.predicats";
import { ResultatEvaluationRegulation } from "./EtatRegulation.definitions";
import { estReponseEtatInformationsSecteur } from "./EtatRegulation.predicats";
import {
  EtablissementPrincipalFournitUE,
  InformationSecteurLocalisablePetiteEntite,
  InformationSecteurPossible,
  InformationSecteurPossiblePetit,
  InformationsSecteurPossibleNonLocalisees,
  InformationsSecteurPossiblesAutre,
  InformationsSecteursComposite,
  ReponseInformationsSecteurGrand,
  ReponseInformationsSecteurPetit,
} from "./Reponse.definitions";

export const estReponseInformationsSecteurPetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
): info is ReponseInformationsSecteurPetit => info._categorieTaille === "Petit";

export const eqInformationsSecteur = (
  a: InformationSecteurPossible,
  b: InformationSecteurPossible,
) => a.secteurActivite === b.secteurActivite;
export const estEtablissementPrincipalFournitUE = (
  reponse:
    | InformationSecteurLocalisablePetiteEntite
    | EtablissementPrincipalFournitUE,
): reponse is EtablissementPrincipalFournitUE =>
  reponse.fournitServicesUnionEuropeenne === "oui";

export const estInformationSecteurNecessitantLocalisationRepresentantPetiteEntite =
  (informationsSecteur: InformationSecteurPossible) =>
    estSecteurNecessitantLocalisationRepresentantPetiteEntite(
      informationsSecteur.secteurActivite as SecteurActivite,
    );

export const estInformationSecteurLocalisablePetiteEntreprise = (
  sec:
    | InformationSecteurPossiblePetit
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
): sec is InformationSecteurLocalisablePetiteEntite =>
  estSecteurNecessitantLocalisationRepresentantPetiteEntite(
    sec.secteurActivite as SecteurActivite,
  );
export const estSecteurBienLocalisePetit = (
  sec:
    | InformationSecteurPossiblePetit
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
) =>
  estInformationSecteurLocalisablePetiteEntreprise(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "france";
export const estSecteurBienLocaliseHorsFrancePetit = (
  sec:
    | InformationSecteurPossiblePetit
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
) =>
  estInformationSecteurLocalisablePetiteEntreprise(sec) &&
  (sec.fournitServicesUnionEuropeenne === "non" ||
    (sec.fournitServicesUnionEuropeenne === "oui" &&
      sec.localisationRepresentant !== "france"));
export const contientEnsembleAutresSecteurs = (
  info: ResultatEvaluationRegulation,
) =>
  estReponseEtatInformationsSecteur(info) &&
  tous(
    (sec: InformationSecteurPossiblePetit) =>
      estSecteurAutre(sec.secteurActivite as SecteurActivite) ||
      estSousSecteurAutre(
        (sec as InformationsSecteursComposite)
          ?.sousSecteurActivite as SousSecteurActivite,
      ),
  )(info.InformationsSecteur.secteurs);
export const contientEnsembleSecteursRepresentantsLocalisesFrancePetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
) =>
  estReponseInformationsSecteurPetit(info) &&
  tous(estSecteurBienLocalisePetit)(info.secteurs);
export const contientEnsembleSecteursRepresentantsLocalisesHorsFrancePetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
) =>
  estReponseInformationsSecteurPetit(info) &&
  tous(estSecteurBienLocaliseHorsFrancePetit)(info.secteurs);
export const contientEnsembleSecteursNonEligiblesPetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
) =>
  estReponseInformationsSecteurPetit(info) &&
  tous(estInformationSecteurNecessitantLocalisationRepresentantPetiteEntite)(
    info.secteurs,
  );
