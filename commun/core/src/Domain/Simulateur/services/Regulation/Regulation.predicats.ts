import { flow } from "fp-ts/lib/function";
import { prop } from "../../../../../../utils/services/objects.operations";
import { PredicatResultatRegulationEntite } from "../../Regulation.definitions";
import {
  auMoinsUneActiviteInfraNumConcernee,
  auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
} from "../Activite/Activite.predicats";
import { et } from "../ChampSimulateur/champs.predicats";
import { predicatDonneesFormulaire } from "../DonneesFormulaire/DonneesFormulaire.predicats";

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
