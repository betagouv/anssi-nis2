import { flow } from "fp-ts/lib/function";
import { prop } from "../../../../../../utils/services/objects.operations";
import { certains } from "../../../../../../utils/services/sets.operations";
import { Activite } from "../../Activite.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import {
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteListee,
} from "../Activite/Activite.predicats";
import {
  estSecteurAutre,
  estSecteurAvecActivitesEssentielles,
  estSecteurAvecBesoinLocalisationRepresentantGrandeEntite,
  estSecteurListe,
} from "../SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurAutre } from "../SousSecteurActivite/SousSecteurActivite.predicats";
import {
  CategorieTaille,
  EtablissementPrincipalFournitUE,
  InformationSecteurLocalisable,
  InformationsSecteurPossible,
  InformationsSecteurPossibleNonLocalisees,
  InformationsSecteurPossiblesAutre,
  InformationsSecteursComposite,
  predicatInformationSecteurPossible,
} from "./Reponse.definitions";

export const eqInformationsSecteur = (
  a: InformationsSecteurPossible<CategorieTaille>,
  b: InformationsSecteurPossible<CategorieTaille>,
) => a.secteurActivite === b.secteurActivite;
export const estEtablissementPrincipalFournitUE = (
  reponse:
    | InformationSecteurLocalisable<"Petit">
    | EtablissementPrincipalFournitUE,
): reponse is EtablissementPrincipalFournitUE =>
  reponse.fournitServicesUnionEuropeenne === "oui";

export const estInformationSecteurAvecBesoinLocalisation = (
  informationsSecteur: InformationsSecteurPossible<CategorieTaille>,
) =>
  estSecteurAvecBesoinLocalisationRepresentantGrandeEntite(
    informationsSecteur.secteurActivite as SecteurActivite,
  );

/**
 *   "infrastructureNumerique",
 * @param sec
 */
export const estInformationSecteurAvecActivitesEssentielles = <
  T extends CategorieTaille,
>(
  sec: InformationsSecteurPossible<T>,
): sec is InformationSecteurLocalisable<T> =>
  estSecteurAvecActivitesEssentielles(sec.secteurActivite as SecteurActivite);
export const estInformationSecteurLocalisableGrandeEntite = (
  sec:
    | InformationsSecteurPossible<"Grand">
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
): sec is InformationSecteurLocalisable<"Grand"> =>
  estSecteurAvecBesoinLocalisationRepresentantGrandeEntite(
    sec.secteurActivite as SecteurActivite,
  ) ||
  estSecteurAvecActivitesEssentielles(sec.secteurActivite as SecteurActivite);
export const estSecteurBienLocalisePetit = (
  sec:
    | InformationsSecteurPossible<"Petit">
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
) =>
  estInformationSecteurAvecActivitesEssentielles<"Petit">(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "france";
export const estSecteurBienLocaliseGrand = (
  sec:
    | InformationsSecteurPossible<"Grand">
    | InformationsSecteurPossiblesAutre
    | InformationsSecteurPossibleNonLocalisees,
) =>
  estInformationSecteurLocalisableGrandeEntite(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "france";
export const estSecteurBienLocaliseHorsFrance = <T extends CategorieTaille>(
  sec: InformationsSecteurPossible<T>,
) =>
  estInformationSecteurAvecActivitesEssentielles(sec) &&
  (sec.fournitServicesUnionEuropeenne === "non" ||
    (sec.fournitServicesUnionEuropeenne === "oui" &&
      sec.localisationRepresentant !== "france"));

export const estInformationSecteurSecteurAutre = (
  sec: InformationsSecteurPossible<CategorieTaille>,
) => estSecteurAutre(sec.secteurActivite as SecteurActivite);
export const estInformationSecteurSousSecteurAutre = (
  sec: InformationsSecteurPossible<CategorieTaille>,
) =>
  estSecteurAutre(sec.secteurActivite as SecteurActivite) ||
  estSousSecteurAutre(
    (sec as InformationsSecteursComposite)
      ?.sousSecteurActivite as SousSecteurActivite,
  );
export const estInformationsSecteurEligibleSansBesoinLocalisation = flow<
  [{ secteurActivite: SecteurActivite }],
  SecteurActivite,
  boolean
>(
  prop("secteurActivite"),
  (s) =>
    estSecteurListe(s) &&
    !estSecteurAvecBesoinLocalisationRepresentantGrandeEntite(s) &&
    !estSecteurAvecActivitesEssentielles(s),
) as predicatInformationSecteurPossible;
export const auMoinsUneActiviteListee = flow<
  [{ activites: Set<Activite> }],
  Set<Activite>,
  boolean
>(
  prop<Set<Activite>, "activites">("activites"),
  certains(estActiviteListee),
) as predicatInformationSecteurPossible;
export const contientActivitesInfrastructureNumeriqueEligiblesPetitEntite = (
  s:
    | InformationSecteurLocalisable<"Petit">
    | InformationsSecteurPossible<"Petit">,
) =>
  certains(estActiviteInfrastructureNumeriqueEligiblesPetitEntite)(
    (s as InformationSecteurLocalisable<"Petit">).activites,
  );
export const contientDesActivitesEssentielles = <T extends CategorieTaille>(
  s: InformationsSecteurPossible<T>,
) =>
  certains(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation)(
    (s as InformationSecteurLocalisable<T>).activites,
  );
export const contientActivitesListees = <T extends CategorieTaille>(
  s: InformationsSecteurPossible<T>,
) =>
  certains(estActiviteListee)(
    (s as InformationSecteurLocalisable<T>).activites,
  );
