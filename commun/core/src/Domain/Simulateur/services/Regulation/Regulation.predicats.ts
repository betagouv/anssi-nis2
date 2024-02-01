import { flow } from "fp-ts/lib/function";
import { prop } from "../../../../../../utils/services/objects.operations";
import { PredicatResultatRegulationEntite } from "../../Regulation.definitions";
import {
  auMoinsUneActiviteInfraNumConcernee,
  auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
  auMoinsUneActiviteListee,
  estActiviteListee,
} from "../Activite/Activite.predicats";
import { et, non, ou } from "../ChampSimulateur/champs.predicats";
import {
  contientPetiteEntreprise,
  predicatDonneesFormulaire,
} from "../DonneesFormulaire/DonneesFormulaire.predicats";
import { auMoinsUnSecteurListe } from "../SecteurActivite/SecteurActivite.predicats";
import { auMoinsUnSousSecteurListe } from "../SousSecteurActivite/SousSecteurActivite.predicats";

export const carEstSecteurInfranumConcerne = flow(
  prop("causes"),
  et(
    predicatDonneesFormulaire
      .champs("secteurActivite")
      .contient("infrastructureNumerique"),
    predicatDonneesFormulaire
      .champs("activites")
      .verifie(auMoinsUneActiviteInfraNumConcernee),
  ),
) as PredicatResultatRegulationEntite;
export const carEstSecteurInfranumConcerneRepresentantFrance = flow(
  prop("causes"),
  et(
    predicatDonneesFormulaire
      .champs("secteurActivite")
      .contient("infrastructureNumerique"),
    predicatDonneesFormulaire
      .champs("activites")
      .verifie(auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement),
  ),
) as PredicatResultatRegulationEntite;

export const carEstGrandeSecteurTicEtActiviteListee = flow(
  prop("causes"),
  et(
    predicatDonneesFormulaire
      .champs("secteurActivite")
      .contient("gestionServicesTic"),
    predicatDonneesFormulaire
      .champs("activites")
      .verifie((a) => a.every(estActiviteListee)),
    predicatDonneesFormulaire
      .champs("fournitServicesUnionEuropeenne")
      .est(["oui"]),
    predicatDonneesFormulaire
      .champs("localisationRepresentant")
      .est(["france"]),
    non(contientPetiteEntreprise),
  ),
) as PredicatResultatRegulationEntite;
export const carEstGrandeSecteurFournisseurNumeriqueEtActiviteListee = flow(
  prop("causes"),
  et(
    predicatDonneesFormulaire
      .champs("secteurActivite")
      .contient("fournisseursNumeriques"),
    predicatDonneesFormulaire
      .champs("activites")
      .verifie(auMoinsUneActiviteListee),
    predicatDonneesFormulaire
      .champs("fournitServicesUnionEuropeenne")
      .est(["oui"]),
    predicatDonneesFormulaire
      .champs("localisationRepresentant")
      .est(["france"]),
    non(contientPetiteEntreprise),
  ),
) as PredicatResultatRegulationEntite;

export const carEstGrandeDansSecteurListeSansBesoinLocalisation = flow(
  prop("causes"),
  et(
    predicatDonneesFormulaire
      .champs("secteurActivite")
      .verifie(auMoinsUnSecteurListe),
    ou(
      predicatDonneesFormulaire.champs("sousSecteurActivite").est([]),
      predicatDonneesFormulaire
        .champs("sousSecteurActivite")
        .verifie(auMoinsUnSousSecteurListe),
    ),
    predicatDonneesFormulaire
      .champs("activites")
      .verifie(auMoinsUneActiviteListee),
    non(contientPetiteEntreprise),
  ),
) as PredicatResultatRegulationEntite;
