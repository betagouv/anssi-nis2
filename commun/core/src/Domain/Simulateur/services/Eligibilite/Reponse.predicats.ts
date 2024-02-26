import { flow } from "fp-ts/lib/function";
import { prop } from "../../../../../../utils/services/objects.operations";
import {
  certains,
  tous,
} from "../../../../../../utils/services/sets.operations";
import { Activite } from "../../Activite.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import { estActiviteListee } from "../Activite/Activite.predicats";
import {
  estSecteurAutre,
  estSecteurAvecBesoinLocalisationRepresentantGrandeEntite,
  estSecteurListe,
  estSecteurAvecActivitesEssentielles,
} from "../SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurAutre } from "../SousSecteurActivite/SousSecteurActivite.predicats";
import { ResultatEvaluationRegulation } from "./EtatRegulation.definitions";
import { estReponseEtatInformationsSecteur } from "./EtatRegulation.predicats";
import {
  CategorieTaille,
  EtablissementPrincipalFournitUE,
  InformationSecteurLocalisable,
  InformationSecteurPossible,
  InformationsSecteurPossibleNonLocalisees,
  InformationsSecteurPossiblesAutre,
  InformationsSecteursComposite,
  ReponseInformationsSecteur,
} from "./Reponse.definitions";

export const estReponseInformationsSecteurPetit = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
): info is ReponseInformationsSecteur<"Petit"> =>
  info._categorieTaille === "Petit";
export const eqInformationsSecteur = (
  a: InformationSecteurPossible<CategorieTaille>,
  b: InformationSecteurPossible<CategorieTaille>,
) => a.secteurActivite === b.secteurActivite;
export const estEtablissementPrincipalFournitUE = (
  reponse:
    | InformationSecteurLocalisable<"Petit">
    | EtablissementPrincipalFournitUE,
): reponse is EtablissementPrincipalFournitUE =>
  reponse.fournitServicesUnionEuropeenne === "oui";

export const estInformationSecteurAvecActivitesEssentielles = (
  informationsSecteur: InformationSecteurPossible<CategorieTaille>,
) =>
  estSecteurAvecActivitesEssentielles(
    informationsSecteur.secteurActivite as SecteurActivite,
  );
export const estInformationSecteurAvecActivitesEssentiellesGrand = (
  informationsSecteur: InformationSecteurPossible<CategorieTaille>,
) =>
  estSecteurAvecActivitesEssentielles(
    informationsSecteur.secteurActivite as SecteurActivite,
  );

export const estInformationSecteurLocalisablePetiteEntreprise = (
  sec:
    | InformationSecteurPossible<"Petit">
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
): sec is InformationSecteurLocalisable<"Petit"> =>
  estSecteurAvecActivitesEssentielles(sec.secteurActivite as SecteurActivite);
export const estInformationSecteurLocalisableGrandeEntite = (
  sec:
    | InformationSecteurPossible<"Grand">
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
): sec is InformationSecteurLocalisable<"Grand"> =>
  estSecteurAvecBesoinLocalisationRepresentantGrandeEntite(
    sec.secteurActivite as SecteurActivite,
  ) ||
  estSecteurAvecActivitesEssentielles(sec.secteurActivite as SecteurActivite);
export const estSecteurBienLocalisePetit = (
  sec:
    | InformationSecteurPossible<"Petit">
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
) =>
  estInformationSecteurLocalisablePetiteEntreprise(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "france";
export const estSecteurBienLocaliseGrand = (
  sec:
    | InformationSecteurPossible<"Grand">
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
) =>
  estInformationSecteurLocalisableGrandeEntite(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "france";
export const estSecteurBienLocaliseHorsFrancePetit = (
  sec:
    | InformationSecteurPossible<"Petit">
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
    (sec: InformationSecteurPossible<"Petit">) =>
      estSecteurAutre(sec.secteurActivite as SecteurActivite) ||
      estSousSecteurAutre(
        (sec as InformationsSecteursComposite)
          ?.sousSecteurActivite as SousSecteurActivite,
      ),
  )(info.InformationsSecteur.secteurs);
export type predicatInformationSecteurPossible = (
  i: InformationSecteurPossible<CategorieTaille>,
) => boolean;
export const estInformationsSecteurEligible = flow<
  [{ secteurActivite: SecteurActivite }],
  SecteurActivite,
  boolean
>(
  prop("secteurActivite"),
  estSecteurListe,
) as predicatInformationSecteurPossible;
export const auMoinsUneActiviteListee = flow<
  [{ activites: Set<Activite> }],
  Set<Activite>,
  boolean
>(
  prop<Set<Activite>, "activites">("activites"),
  certains(estActiviteListee),
) as predicatInformationSecteurPossible;
export const contientEnsembleSecteursRepresentantsLocalisesHorsFrancePetit = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
) =>
  estReponseInformationsSecteurPetit(info) &&
  tous(estSecteurBienLocaliseHorsFrancePetit)(info.secteurs);
export const contientEnsembleSecteursNonEligiblesPetit = (
  info:
    | ReponseInformationsSecteur<"Petit">
    | ReponseInformationsSecteur<"Grand">,
) =>
  estReponseInformationsSecteurPetit(info) &&
  tous(estInformationSecteurAvecActivitesEssentielles)(info.secteurs);
