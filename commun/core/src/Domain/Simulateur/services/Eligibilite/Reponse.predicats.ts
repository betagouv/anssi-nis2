import {
  estSecteurNecessitantLocalisationRepresentantPetiteEntite,
  ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite,
} from "../../SecteurActivite.constantes";
import {
  SecteurActivite,
  SecteursAvecBesoinLocalisationRepresentant,
} from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { estSecteurAutre } from "../SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurAutre } from "../SousSecteurActivite/SousSecteurActivite.predicats";
import { ResultatEvaluationRegulation } from "./EtatRegulation.definitions";
import { estReponseEtatInformationsSecteur } from "./EtatRegulation.predicats";
import {
  EtablissementPrincipalFournitUE,
  InformationSecteurLocalisablePetiteEntreprise,
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
    | InformationSecteurLocalisablePetiteEntreprise
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
): sec is InformationSecteurLocalisablePetiteEntreprise =>
  ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite.includes(
    sec.secteurActivite as SecteursAvecBesoinLocalisationRepresentant,
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
  [...info.InformationsSecteur.secteurs].every(
    (sec) =>
      estSecteurAutre(sec.secteurActivite as SecteurActivite) ||
      estSousSecteurAutre(
        (sec as InformationsSecteursComposite)
          ?.sousSecteurActivite as SousSecteurActivite,
      ),
  );
export const contientEnsembleSecteursRepresentantsLocalisesFrancePetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
) =>
  estReponseInformationsSecteurPetit(info) &&
  [...info.secteurs].every(estSecteurBienLocalisePetit);
export const contientEnsembleSecteursRepresentantsLocalisesHorsFrancePetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
) =>
  estReponseInformationsSecteurPetit(info) &&
  [...info.secteurs].every(estSecteurBienLocaliseHorsFrancePetit);
export const contientEnsembleSecteursNonEligiblesPetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
) =>
  estReponseInformationsSecteurPetit(info) &&
  [...info.secteurs].every(
    estInformationSecteurNecessitantLocalisationRepresentantPetiteEntite,
  );
