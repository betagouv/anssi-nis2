import { ValeursSecteursNecessitantLocalisationRepresentantPetiteEntite } from "../../SecteurActivite.constantes";
import { SecteursAvecBesoinLocalisationRepresentant } from "../../SecteurActivite.definitions";
import { ResultatEvaluationRegulation } from "./EtatRegulation.definition";
import {
  EtablissementPrincipalFournitUE,
  InformationSecteurLocalisablePetiteEntreprise,
  InformationSecteurPossible,
  InformationSecteurPossiblePetit,
  InformationsSecteurPossibleNonLocalisees,
  InformationsSecteurPossiblesAutre,
  ReponseEtatInformationsSecteur,
  ReponseInformationsSecteurGrand,
  ReponseInformationsSecteurPetit,
} from "./Reponse.definitions";

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
export const estReponseEtatInformationsSecteur = (
  resultat: ResultatEvaluationRegulation | ReponseEtatInformationsSecteur,
): resultat is ReponseEtatInformationsSecteur =>
  "_tag" in resultat && resultat._tag === "InformationsSecteur";
export const estReponseInformationsSecteurPetit = (
  info: ReponseInformationsSecteurPetit | ReponseInformationsSecteurGrand,
): info is ReponseInformationsSecteurPetit => info._categorieTaille === "Petit";
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
