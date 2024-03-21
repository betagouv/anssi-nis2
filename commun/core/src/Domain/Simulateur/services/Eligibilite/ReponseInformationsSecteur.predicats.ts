import { flow } from "fp-ts/lib/function";
import { isMatching, P } from "ts-pattern";
import {
  est,
  estParmi,
  et,
  non,
} from "../../../../../../utils/services/commun.predicats";
import { prop } from "../../../../../../utils/services/objects.operations";
import { certains } from "../../../../../../utils/services/sets.operations";
import { Activite } from "../../Activite.definitions";
import { AppartenancePaysUnionEuropeenne } from "../../ChampsSimulateur.definitions";
import { SecteurActivite } from "../../SecteurActivite.definitions";
import { ValeursSecteursActivitesAnnexe1 } from "../../SecteurActivite.valeurs";
import { SousSecteurActivite } from "../../SousSecteurActivite.definitions";
import {
  estActiviteAutre,
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
import { InformationsSecteursComposite } from "./InformationsSecteur.definitions";
import {
  InformationsSecteurPossible,
  PredicatInformationSecteurPossible,
  RepInfoSecteur,
  RepInfoSecteurInfranum,
  RepInfoSecteurListes,
  RepInfoSecteurLocalEtab,
  ReponseInformationsSecteurInfranumActiviteLocalEtabLot1,
  ReponseInformationsSecteurInfranumActiviteLocalServices,
} from "./ReponseInformationsSecteur.definitions";
import { CategorieTaille } from "./ReponseStructure.definitions";

export const eqInformationsSecteur = (
  a: InformationsSecteurPossible<CategorieTaille>,
  b: InformationsSecteurPossible<CategorieTaille>,
) => a.secteurActivite === b.secteurActivite;

export const contientLocalisationFournitureServicesNumeriques =
  (localisation: AppartenancePaysUnionEuropeenne) =>
  <Taille extends CategorieTaille>(
    reponse: RepInfoSecteur<Taille>,
  ): reponse is ReponseInformationsSecteurInfranumActiviteLocalServices<Taille> =>
    "localisationFournitureServicesNumeriques" in reponse &&
    reponse.localisationFournitureServicesNumeriques.has(localisation);
export const estEtablissementPrincipalLocalise =
  (localisation: AppartenancePaysUnionEuropeenne) =>
  <Taille extends CategorieTaille>(
    reponse: RepInfoSecteur<Taille>,
  ): reponse is ReponseInformationsSecteurInfranumActiviteLocalEtabLot1<Taille> =>
    ("paysDecisionsCyber" in reponse &&
      reponse.paysDecisionsCyber === localisation) ||
    ("paysOperationsCyber" in reponse &&
      reponse.paysOperationsCyber === localisation) ||
    ("paysPlusGrandNombreSalaries" in reponse &&
      reponse.paysPlusGrandNombreSalaries === localisation);
export const estEtablissementPrincipalFrance = <Taille extends CategorieTaille>(
  reponse: RepInfoSecteur<Taille>,
): reponse is ReponseInformationsSecteurInfranumActiviteLocalEtabLot1<Taille> =>
  ("paysDecisionsCyber" in reponse &&
    reponse.paysDecisionsCyber === "france") ||
  ("paysOperationsCyber" in reponse &&
    reponse.paysOperationsCyber === "france") ||
  ("paysPlusGrandNombreSalaries" in reponse &&
    reponse.paysPlusGrandNombreSalaries === "france");

/**
 *   "infrastructureNumerique",
 * @param sec
 */
export const estInformationSecteurAvecActivitesEssentielles = <
  Taille extends CategorieTaille,
>(
  sec: InformationsSecteurPossible<Taille>,
): sec is RepInfoSecteurInfranum<Taille> | RepInfoSecteurLocalEtab<Taille> =>
  estSecteurAvecActivitesEssentielles(sec.secteurActivite as SecteurActivite);

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

export const estInformationsSecteurAvecActivitesListeesPourSecteur = (
  secteur: SecteurActivite,
) =>
  isMatching({
    secteurActivite: secteur,
    activites: P.when(
      certains<Activite>(non(estActiviteAutre)) as (
        a: Set<Activite>,
      ) => a is Set<Activite>,
    ),
  });
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
export const auMoinsUneActiviteEstParmis = (
  ...listeActiviteCherchee: Activite[]
) =>
  flow<[{ activites: Set<Activite> }], Set<Activite>, boolean>(
    prop("activites"),
    certains(estParmi(...listeActiviteCherchee)),
  ) as PredicatInformationSecteurPossible;

export const contientActivitesListees = <T extends CategorieTaille>(
  s: InformationsSecteurPossible<T>,
) => certains(estActiviteListee)((s as RepInfoSecteurListes<T>).activites);
export const certainsSontInfrastructureNumeriqueAvecActivite = (
  ...activiteCherchee: Activite[]
) =>
  certains(
    isMatching({
      secteurActivite: "infrastructureNumerique",
      activites: P.when(
        certains<Activite>((a) => activiteCherchee.includes(a)) as (
          a: Set<Activite>,
        ) => a is Set<Activite>,
      ),
    }),
  );
export const contientValeurLocalisationFournitureServicesNumeriques =
  <Taille extends CategorieTaille>(valeur: AppartenancePaysUnionEuropeenne) =>
  (element: RepInfoSecteur<Taille>): boolean =>
    "localisationFournitureServicesNumeriques" in element &&
    element.localisationFournitureServicesNumeriques.has(valeur);
