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
  verifie.secteurActivite.contient("infrastructureNumerique"),
  verifie.activites.satisfait(auMoinsUneActiviteInfraNumConcernee),
);
export const carEstSecteurInfranumConcerneRepresentantFrance = car(
  verifie.secteurActivite.contient("infrastructureNumerique"),
  verifie.activites.satisfait(
    auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
  ),
);

export const carEstGrandeSecteurTicEtActiviteListee = car(
  verifie.secteurActivite.contient("gestionServicesTic"),
  verifie.activites.satisfait(auMoinsUneActiviteListee),
  verifie.fournitServicesUnionEuropeenne.est(["oui"]),
  verifie.localisationRepresentant.est(["france"]),
  non(contientPetiteEntreprise),
);
export const carEstGrandeSecteurFournisseurNumeriqueEtActiviteListee = car(
  verifie.secteurActivite.contient("fournisseursNumeriques"),
  verifie.activites.satisfait(auMoinsUneActiviteListee),
  verifie.fournitServicesUnionEuropeenne.est(["oui"]),
  verifie.localisationRepresentant.est(["france"]),
  non(contientPetiteEntreprise),
);

export const carEstGrandeDansSecteurListeSansBesoinLocalisation = car(
  verifie.secteurActivite.satisfait(auMoinsUnSecteurListe),
  ou(
    verifie.sousSecteurActivite.est([]),
    verifie.sousSecteurActivite.satisfait(auMoinsUnSousSecteurListe),
  ),
  verifie.activites.satisfait(auMoinsUneActiviteListee),
  non(contientPetiteEntreprise),
);

export const carEstGrandeDansSecteurListeAvecBesoinLocalisation = car(
  verifie.secteurActivite.satisfait(auMoinsUnSecteurListe),
  ou(
    verifie.sousSecteurActivite.est([]),
    verifie.sousSecteurActivite.satisfait(auMoinsUnSousSecteurListe),
  ),
  verifie.activites.satisfait(auMoinsUneActiviteListee),
  verifie.fournitServicesUnionEuropeenne.est(["oui"]),
  verifie.localisationRepresentant.est(["france"]),
  non(contientPetiteEntreprise),
);
