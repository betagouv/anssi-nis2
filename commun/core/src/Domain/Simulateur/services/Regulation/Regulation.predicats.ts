import { flow } from "fp-ts/lib/function";
import { prop } from "../../../../../../utils/services/objects.operations";
import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import { PredicatResultatRegulationEntite } from "../../Regulation.definitions";
import {
  auMoinsUneActiviteInfraNumConcernee,
  auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
  auMoinsUneActiviteListee,
} from "../Activite/Activite.predicats";
import { et, non, ou } from "../ChampSimulateur/champs.predicats";
import {
  contientPetiteEntreprise,
  predicatDonneesFormulaire as verifie,
} from "../DonneesFormulaire/DonneesFormulaire.predicats";
import { auMoinsUnSecteurListe } from "../SecteurActivite/SecteurActivite.predicats";
import { auMoinsUnSousSecteurListe } from "../SousSecteurActivite/SousSecteurActivite.predicats";

const car = (...predicats: ((d: DonneesFormulaireSimulateur) => boolean)[]) =>
  flow(prop("causes"), et(...predicats)) as PredicatResultatRegulationEntite;

export const carEstSecteurInfranumConcerne = car(
  verifie.champs("secteurActivite").contient("infrastructureNumerique"),
  verifie.champs("activites").verifie(auMoinsUneActiviteInfraNumConcernee),
);
export const carEstSecteurInfranumConcerneRepresentantFrance = car(
  verifie.champs("secteurActivite").contient("infrastructureNumerique"),
  verifie
    .champs("activites")
    .verifie(auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement),
);

export const carEstGrandeSecteurTicEtActiviteListee = car(
  verifie.champs("secteurActivite").contient("gestionServicesTic"),
  verifie.champs("activites").verifie(auMoinsUneActiviteListee),
  verifie.champs("fournitServicesUnionEuropeenne").est(["oui"]),
  verifie.champs("localisationRepresentant").est(["france"]),
  non(contientPetiteEntreprise),
);
export const carEstGrandeSecteurFournisseurNumeriqueEtActiviteListee = car(
  verifie.champs("secteurActivite").contient("fournisseursNumeriques"),
  verifie.champs("activites").verifie(auMoinsUneActiviteListee),
  verifie.champs("fournitServicesUnionEuropeenne").est(["oui"]),
  verifie.champs("localisationRepresentant").est(["france"]),
  non(contientPetiteEntreprise),
);

export const carEstGrandeDansSecteurListeSansBesoinLocalisation = car(
  verifie.champs("secteurActivite").verifie(auMoinsUnSecteurListe),
  ou(
    verifie.champs("sousSecteurActivite").est([]),
    verifie.champs("sousSecteurActivite").verifie(auMoinsUnSousSecteurListe),
  ),
  verifie.champs("activites").verifie(auMoinsUneActiviteListee),
  non(contientPetiteEntreprise),
);

export const carEstGrandeDansSecteurListeAvecBesoinLocalisation = car(
  verifie.champs("secteurActivite").verifie(auMoinsUnSecteurListe),
  ou(
    verifie.champs("sousSecteurActivite").est([]),
    verifie.champs("sousSecteurActivite").verifie(auMoinsUnSousSecteurListe),
  ),
  verifie.champs("activites").verifie(auMoinsUneActiviteListee),
  verifie.champs("fournitServicesUnionEuropeenne").est(["oui"]),
  verifie.champs("localisationRepresentant").est(["france"]),
  non(contientPetiteEntreprise),
);
