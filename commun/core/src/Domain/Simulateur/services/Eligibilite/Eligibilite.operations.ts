import { match, P } from "ts-pattern";
import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire.definitions";
import { R } from "../../Eligibilite.constantes";
import {
  aucuneActiviteInfraNumConcernee,
  aucuneActiviteListee,
  auMoinsUneActiviteInfraNumConcernee,
  auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
  auMoinsUneActiviteListee,
} from "../Activite/Activite.predicats";
import { contientSecteurNecessitantLocalisation } from "../DonneesFormulaire/DonneesFormulaire.predicats";
import { auMoinsUnSecteurListe } from "../SecteurActivite/SecteurActivite.predicats";
import { OperationCalculeEligibilite } from "./Eligibilite.definition";

const calculeEligibiliteOperateurServiceEssentielNis1: OperationCalculeEligibilite =
  (donnees) =>
    match(donnees)
      .with(
        {
          trancheChiffreAffaire: ["petit"],
          trancheNombreEmployes: ["petit"],
        },
        R.EligiblePetiteEntreprise,
      )
      .otherwise(R.EligibleMoyenneGrandeEntreprise);
const calculeEligibilitePetiteStructurePrivee: OperationCalculeEligibilite = (
  donnees,
) =>
  match(donnees)
    .with(
      {
        secteurActivite: ["infrastructureNumerique"],
        activites: P.when(auMoinsUneActiviteInfraNumConcernee),
      },
      R.EligiblePetiteEntreprise,
    )
    .with(
      {
        secteurActivite: ["infrastructureNumerique"],
        fournitServicesUnionEuropeenne: ["oui"],
        localisationRepresentant: ["france"],
        activites: P.when(
          auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
        ),
      },
      R.EligiblePetiteEntreprise,
    )
    .with(
      {
        secteurActivite: ["infrastructureNumerique"],
        activites: P.when(aucuneActiviteInfraNumConcernee),
      },
      R.NonEligible,
    )
    .with(
      {
        secteurActivite: P.not(["infrastructureNumerique"]),
      },
      R.NonEligible,
    )
    .otherwise(R.Incertain);

const calculeEligibiliteRepresentantFrance: OperationCalculeEligibilite = (
  donnees
) =>
  match(donnees)
    .with(
      {
        fournitServicesUnionEuropeenne: ["oui"],
        localisationRepresentant: ["france"],
      },
      R.EligibleMoyenneGrandeEntreprise
    )
    .otherwise(R.NonEligible);

const calculeEligibiliteGrandeServicesTicEtFournisseurNum = (
  donnees: DonneesFormulaireSimulateur,
) =>
  match(donnees)
    .with(
      {
        secteurActivite: ["infrastructureNumerique"],
        activites: P.when(
          auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
        ),
      },
      calculeEligibiliteRepresentantFrance,
    )
    .with(
      {
        secteurActivite: P.array(
          P.union("gestionServicesTic", "fournisseursNumeriques"),
        ),
        activites: P.when(auMoinsUneActiviteListee),
      },
      calculeEligibiliteRepresentantFrance,
    )
    .with(
      {
        secteurActivite: ["infrastructureNumerique"],
        activites: P.intersection(P.when(auMoinsUneActiviteListee)),
      },
      R.EligibleMoyenneGrandeEntreprise,
    )
    .otherwise(R.NonEligible);
const calculeEligibiliteMoyenneOuGrandeStructurePrivee: OperationCalculeEligibilite =
  (donnees: DonneesFormulaireSimulateur) =>
    match(donnees)
      .when(
        contientSecteurNecessitantLocalisation,
        calculeEligibiliteGrandeServicesTicEtFournisseurNum,

      )
      .with(
        {
          secteurActivite: P.when(auMoinsUnSecteurListe),
          activites: P.when(auMoinsUneActiviteListee),
        },
        R.EligibleMoyenneGrandeEntreprise,
      )
      .otherwise(R.Incertain);

const calculeEligibiliteStructurePrivee: OperationCalculeEligibilite = (
  donnees,
) =>
  match(donnees)
    .with(
      {
        activites: P.when(aucuneActiviteListee),
      },
      R.NonEligible,
    )
    .with({ appartenancePaysUnionEuropeenne: ["horsue"] }, R.Incertain)
    .with({ appartenancePaysUnionEuropeenne: ["autre"] }, R.Incertain)
    .with(
      {
        trancheChiffreAffaire: ["petit"],
        trancheNombreEmployes: ["petit"],
      },
      calculeEligibilitePetiteStructurePrivee,
    )
    .with(
      P.union(
        {
          trancheNombreEmployes: P.union(["moyen"], ["grand"]),
        },
        {
          trancheChiffreAffaire: P.union(["moyen"], ["grand"]),
        },
      ),
      calculeEligibiliteMoyenneOuGrandeStructurePrivee,
    )
    .otherwise(R.Incertain);
export const calculeEligibilite: OperationCalculeEligibilite = (donnees) =>
  match(donnees)
    .with(
      { designationOperateurServicesEssentiels: ["oui"] },
      calculeEligibiliteOperateurServiceEssentielNis1,
    )
    .with({ typeStructure: ["privee"] }, calculeEligibiliteStructurePrivee)
    .otherwise(R.Incertain);
