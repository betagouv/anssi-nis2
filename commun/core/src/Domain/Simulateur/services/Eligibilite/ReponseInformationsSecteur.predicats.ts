import { flow } from "fp-ts/lib/function";
import { prop } from "../../../../../../utils/services/objects.operations";
import {
  est,
  et,
  non,
} from "../../../../../../utils/services/predicats.operations";
import { certains } from "../../../../../../utils/services/sets.operations";
import { ExtraitAutre } from "../../../../../../utils/types/Extrait";
import {
  Activite,
  ActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  ActiviteSecteursSimples,
  ActivitesEnergie,
  ActivitesFabrication,
  ActivitesFournisseursNumeriques,
  ActivitesGestionServicesTic,
  ActivitesTransports,
} from "../../Activite.definitions";
import { AppartenancePaysUnionEuropeenne } from "../../ChampsSimulateur.definitions";
import {
  SecteurActivite,
  SecteurAvecBesoinLocalisationRepresentant,
  SecteursAvecSousSecteurs,
  SecteursDefinitsSansBesoinLocalisationRepresentant,
  SousSecteurAutrePour,
} from "../../SecteurActivite.definitions";
import { ValeursSecteursActivitesAnnexe1 } from "../../SecteurActivite.valeurs";
import {
  SousSecteurActivite,
  SousSecteurEnergie,
  SousSecteurFabrication,
  SousSecteurTransport,
} from "../../SousSecteurActivite.definitions";
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
import {
  CategorieTaille,
  CategoriseTaille,
} from "./ReponseStructure.definitions";

export type InformationSousSecteurAutre<S extends SecteursAvecSousSecteurs> = {
  secteurActivite: S;
  sousSecteurActivite: SousSecteurAutrePour<S>;
};
export type InformationsSecteurCompositeEnergie = {
  secteurActivite: "energie";
  sousSecteurActivite: Omit<SousSecteurEnergie, "autreSousSecteurEnergie">;
  activites: Set<ActivitesEnergie>;
};
export type InformationsSecteurCompositeFabrication = {
  secteurActivite: "fabrication";
  sousSecteurActivite: Omit<
    SousSecteurFabrication,
    "autreSousSecteurFabrication"
  >;
  activites: Set<ActivitesFabrication>;
};
export type InformationsSecteurCompositeTransport = {
  secteurActivite: "transports";
  sousSecteurActivite: Omit<SousSecteurTransport, "autreSousSecteurTransports">;
  activites: Set<ActivitesTransports>;
};
export type InformationSecteurSimple = {
  secteurActivite: SecteursDefinitsSansBesoinLocalisationRepresentant;
  activites: Set<ActiviteSecteursSimples>;
};
export type InformationsSecteursCompositeListe =
  | InformationsSecteurCompositeEnergie
  | InformationsSecteurCompositeFabrication
  | InformationsSecteurCompositeTransport;
export type EtablissementPrincipalNeFournitPasUE = {
  fournitServicesUnionEuropeenne: "non";
};
export type EtablissementPrincipalFournitUE = {
  fournitServicesUnionEuropeenne: "oui";
  localisationRepresentant: AppartenancePaysUnionEuropeenne;
};
export type EtablissementPrincipalLocalisation =
  | EtablissementPrincipalNeFournitPasUE
  | EtablissementPrincipalFournitUE;
export type ActivitesAvecBesoinLocalisationRepresentant<
  Taille extends CategorieTaille,
> = Taille extends "Petit"
  ? ActiviteInfrastructureNumeriqueAvecBesoinLocalisation
  :
      | ActiviteInfrastructureNumeriqueAvecBesoinLocalisation
      | ActivitesFournisseursNumeriques
      | ActivitesGestionServicesTic;
export type InformationsSecteurAvecBesoinLocalisation<
  Taille extends CategorieTaille,
> = {
  secteurActivite: SecteurAvecBesoinLocalisationRepresentant;
  activites: Set<ActivitesAvecBesoinLocalisationRepresentant<Taille>>;
} & EtablissementPrincipalLocalisation;
export type InformationSecteurSimpleAutre = {
  secteurActivite: ExtraitAutre<SecteurActivite>;
};
export type InformationsSecteurAutre =
  | InformationSecteurSimpleAutre
  | InformationSousSecteurAutre<SecteursAvecSousSecteurs>;
export type InformationsSecteurSansBesoinLocalisation =
  | InformationsSecteursCompositeListe
  | InformationSecteurSimple;
export type InformationsSecteurPossible<Taille extends CategorieTaille> =
  | InformationsSecteurSansBesoinLocalisation
  | InformationsSecteurAvecBesoinLocalisation<Taille>
  | InformationsSecteurAutre;
export type InformationsSecteursComposite =
  | InformationSousSecteurAutre<SecteursAvecSousSecteurs>
  | InformationsSecteursCompositeListe;
export type InformationsSecteur<T extends CategorieTaille> = {
  secteurs: Set<InformationsSecteurPossible<T>>;
};
export type ReponseInformationsSecteur<T extends CategorieTaille> =
  CategoriseTaille<T> & InformationsSecteur<T>;
export type PredicatInformationSecteurPossible = (
  i: InformationsSecteurPossible<CategorieTaille>,
) => boolean;
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
