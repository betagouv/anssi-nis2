import { flow } from "fp-ts/lib/function";
import { prop } from "../../../../../../utils/services/objects.operations";
import {
  est,
  et,
  non,
} from "../../../../../../utils/services/predicats.operations";
import { certains } from "../../../../../../utils/services/sets.operations";
import { Activite } from "../../Activite.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { ValeursSecteursActivitesAnnexe1 } from "../../SecteurActivite.valeurs";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import {
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteListee,
} from "../Activite/Activite.predicats";
import {
  estSecteur,
  estSecteurAutre,
  estSecteurAvecActivitesEssentielles,
  estSecteurDansListe,
  estSecteurImportantsAvecBesoinLocalisation,
  estSecteurListe,
} from "../SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurAutre } from "../SousSecteurActivite/SousSecteurActivite.predicats";
import { EtablissementPrincipalFournitUE } from "./LocalisationsActivites.definitions";
import {
  InformationsSecteurAutre,
  InformationsSecteurAvecBesoinLocalisation,
  InformationsSecteurPossible,
  InformationsSecteurSansBesoinLocalisation,
  InformationsSecteursComposite,
  PredicatInformationSecteurPossible,
} from "./ReponseInformationsSecteur.definitions";
import { CategorieTaille } from "./ReponseStructure.definitions";

export const eqInformationsSecteur = (
  a: InformationsSecteurPossible<CategorieTaille>,
  b: InformationsSecteurPossible<CategorieTaille>,
) => a.secteurActivite === b.secteurActivite;
export const estEtablissementPrincipalFournitUE = (
  reponse:
    | InformationsSecteurAvecBesoinLocalisation<"Petit">
    | EtablissementPrincipalFournitUE,
): reponse is EtablissementPrincipalFournitUE =>
  reponse.fournitServicesUnionEuropeenne === "oui";
export const estInformationSecteurImportantAvecBesoinLocalisation = (
  informationsSecteur: InformationsSecteurPossible<CategorieTaille>,
) =>
  estSecteurImportantsAvecBesoinLocalisation(
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
): sec is InformationsSecteurAvecBesoinLocalisation<T> =>
  estSecteurAvecActivitesEssentielles(sec.secteurActivite as SecteurActivite);
export const estInformationSecteurAvecBesoinLocalisation = <
  Taille extends CategorieTaille,
>(
  sec:
    | InformationsSecteurPossible<Taille>
    | InformationsSecteurAutre
    | InformationsSecteurSansBesoinLocalisation,
): sec is InformationsSecteurAvecBesoinLocalisation<Taille> =>
  estSecteurImportantsAvecBesoinLocalisation(
    sec.secteurActivite as SecteurActivite,
  ) ||
  estSecteurAvecActivitesEssentielles(sec.secteurActivite as SecteurActivite);
export const estSecteurAvecActivitesEssentiellesBienLocalisees = (
  sec:
    | InformationsSecteurPossible<CategorieTaille>
    | InformationsSecteurAutre
    | InformationsSecteurSansBesoinLocalisation,
) =>
  estInformationSecteurAvecActivitesEssentielles<CategorieTaille>(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "france";
export const estSecteurBienLocaliseGrand = (
  sec:
    | InformationsSecteurPossible<"Grand">
    | InformationsSecteurAutre
    | InformationsSecteurSansBesoinLocalisation,
) =>
  estInformationSecteurAvecBesoinLocalisation(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "france";
export const estSecteurBienLocaliseUE = (
  sec:
    | InformationsSecteurPossible<"Grand">
    | InformationsSecteurAutre
    | InformationsSecteurSansBesoinLocalisation,
) =>
  estInformationSecteurAvecBesoinLocalisation(sec) &&
  sec.fournitServicesUnionEuropeenne === "oui" &&
  sec.localisationRepresentant === "autre";
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
  et(
    estSecteurListe,
    non(estSecteurImportantsAvecBesoinLocalisation),
    non(estSecteurAvecActivitesEssentielles),
  ),
) as PredicatInformationSecteurPossible;
export const estSecteurAnnexe1 = flow<
  [{ secteurActivite: SecteurActivite }],
  SecteurActivite,
  boolean
>(
  prop("secteurActivite"),
  estSecteurDansListe(
    ValeursSecteursActivitesAnnexe1 as unknown as SecteurActivite[],
  ),
) as PredicatInformationSecteurPossible;
export const estInformationsPourSecteur = (secteur: SecteurActivite) =>
  flow<[{ secteurActivite: SecteurActivite }], SecteurActivite, boolean>(
    prop("secteurActivite"),
    estSecteur(secteur),
  ) as PredicatInformationSecteurPossible;
export const estSecteurBancaire = flow<
  [{ secteurActivite: SecteurActivite }],
  SecteurActivite,
  boolean
>(
  prop("secteurActivite"),
  estSecteur("banqueSecteurBancaire"),
) as PredicatInformationSecteurPossible;
export const auMoinsUneActiviteListee = flow<
  [{ activites: Set<Activite> }],
  Set<Activite>,
  boolean
>(
  prop<Set<Activite>, "activites">("activites"),
  certains(estActiviteListee),
) as PredicatInformationSecteurPossible;
export const auMoinsUneActiviteEst = (activiteCherchee: Activite) =>
  flow<[{ activites: Set<Activite> }], Set<Activite>, boolean>(
    prop("activites"),
    certains(est(activiteCherchee)),
  ) as PredicatInformationSecteurPossible;
export const auMoinsUneActiviteEstDans = (
  activitesCherchees: readonly (Activite | string)[],
) =>
  flow<[{ activites: Set<Activite> }], Set<Activite>, boolean>(
    prop("activites"),
    certains((activite) => activitesCherchees.includes(activite)),
  ) as PredicatInformationSecteurPossible;
export const contientActivitesInfrastructureNumeriqueEligiblesPetitEntite = (
  s:
    | InformationsSecteurAvecBesoinLocalisation<"Petit">
    | InformationsSecteurPossible<"Petit">,
) =>
  certains(estActiviteInfrastructureNumeriqueEligiblesPetitEntite)(
    (s as InformationsSecteurAvecBesoinLocalisation<"Petit">).activites,
  );
export const contientDesActivitesInfrastructureNumeriqueEssentielles = <
  T extends CategorieTaille,
>(
  s: InformationsSecteurPossible<T>,
) =>
  certains(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation)(
    (s as InformationsSecteurAvecBesoinLocalisation<T>).activites,
  );
export const contientActivitesListees = <T extends CategorieTaille>(
  s: InformationsSecteurPossible<T>,
) =>
  certains(estActiviteListee)(
    (s as InformationsSecteurAvecBesoinLocalisation<T>).activites,
  );
