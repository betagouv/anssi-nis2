import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import { ResultatEligibilite } from "../../Eligibilite.definitions";
import { fabriqueRegule } from "../../fabriques/Regulation.fabrique";
import {
  causeReguleOSE,
  resultatIncertain,
  resultatNonRegule,
} from "../../Regulation.constantes";
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import {
  auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
  estActiviteInfraNumConcerneeFranceUniquement,
  estActiviteListee,
} from "../Activite/Activite.predicats";
import { non } from "../ChampSimulateur/champs.predicats";
import {
  contientInfrastructureNumerique,
  contientOperateurServicesEssentiels,
  contientPetiteEntreprise,
  predicatDonneesFormulaire as donneesSimu,
} from "../DonneesFormulaire/DonneesFormulaire.predicats";
import {
  auMoinsUnSecteurListe,
  estSecteurListe,
} from "../SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../SousSecteurActivite/SousSecteurActivite.predicats";
import { CalculeRegulationOperation } from "./Regulation.service.definitions";
import { P, match } from "ts-pattern";

const calculateurRegulationParStatutEligibilite: Record<
  ResultatEligibilite,
  (d: DonneesFormulaireSimulateur) => ResultatRegulationEntite
> = {
  EligibleMoyenneGrandeEntreprise: () => fabriqueRegule(causeReguleOSE),
  EligiblePetiteEntreprise: () => fabriqueRegule(causeReguleOSE),
  Incertain: () => resultatIncertain,
  NonEligible: () => resultatNonRegule,
};

export const transformeEligibiliteEnRegulationEntite = (
  e: ResultatEligibilite,
) => calculateurRegulationParStatutEligibilite[e];

const regulationInfrastructureNumerique = (
  donnees: DonneesFormulaireSimulateur,
) =>
  match(donnees)
    .with(
      {
        activites: P.when(
          auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
        ),
        fournitServicesUnionEuropeenne: ["oui"],
        localisationRepresentant: ["france"],
      },
      () =>
        fabriqueRegule({
          secteurActivite: ["infrastructureNumerique"],
          activites: donnees.activites.filter(
            estActiviteInfraNumConcerneeFranceUniquement,
          ),
          sousSecteurActivite:
            donnees.sousSecteurActivite.filter(estSousSecteurListe),
          fournitServicesUnionEuropeenne: ["oui"],
          localisationRepresentant: ["france"],
        }),
    )
    .with(
      {
        fournitServicesUnionEuropeenne: ["oui"],
        localisationRepresentant: ["france"],
      },
      () =>
        fabriqueRegule({
          trancheNombreEmployes: donnees.trancheNombreEmployes,
          trancheChiffreAffaire: donnees.trancheChiffreAffaire,
          secteurActivite: ["infrastructureNumerique"],
          sousSecteurActivite:
            donnees.sousSecteurActivite.filter(estSousSecteurListe),
          activites: ["prestataireServiceConfiance"],
          fournitServicesUnionEuropeenne: ["oui"],
          localisationRepresentant: ["france"],
        }),
    )
    .otherwise(() => resultatNonRegule);

const calculeRegulationPetite = (donnees: DonneesFormulaireSimulateur) =>
  match(donnees).otherwise(() => resultatNonRegule);
const calculeRegulationGrande = (donnees: DonneesFormulaireSimulateur) =>
  match(donnees)
    .with(
      {
        secteurActivite: P.when((liste) =>
          liste.some((secteur) =>
            ["gestionServicesTic", "fournisseursNumeriques"].includes(secteur),
          ),
        ),
      },
      () =>
        fabriqueRegule({
          trancheNombreEmployes: donnees.trancheNombreEmployes,
          trancheChiffreAffaire: donnees.trancheChiffreAffaire,
          secteurActivite: donnees.secteurActivite.filter((secteur) =>
            ["gestionServicesTic", "fournisseursNumeriques"].includes(secteur),
          ),
          activites: donnees.activites.filter(estActiviteListee),
          sousSecteurActivite:
            donnees.sousSecteurActivite.filter(estSousSecteurListe),
          fournitServicesUnionEuropeenne: ["oui"],
          localisationRepresentant: ["france"],
        }),
    )
    .with(
      {
        secteurActivite: P.when(auMoinsUnSecteurListe),
      },
      () =>
        fabriqueRegule({
          trancheNombreEmployes: donnees.trancheNombreEmployes,
          trancheChiffreAffaire: donnees.trancheChiffreAffaire,
          secteurActivite: donnees.secteurActivite.filter(estSecteurListe),
          sousSecteurActivite:
            donnees.sousSecteurActivite.filter(estSousSecteurListe),
          activites: donnees.activites.filter(estActiviteListee),
        }),
    )
    .otherwise(() => resultatNonRegule);

/**
 * Première application du calcul régulation entité utilisant le shift (début de railway)
 * @param donnees
 */
export const calculeRegulationEntite: CalculeRegulationOperation = (
  donnees,
): ResultatRegulationEntite =>
  match(donnees)
    .when(contientOperateurServicesEssentiels, () =>
      fabriqueRegule(causeReguleOSE),
    )
    .when(donneesSimu.uniquement.activiteAutre, () => resultatNonRegule)
    .when(contientInfrastructureNumerique, regulationInfrastructureNumerique)
    .when(contientPetiteEntreprise, calculeRegulationPetite)
    .when(non(contientPetiteEntreprise), calculeRegulationGrande)
    .otherwise(() => resultatIncertain);
