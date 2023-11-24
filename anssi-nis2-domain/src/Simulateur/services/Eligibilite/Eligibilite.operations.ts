import { match, P } from "ts-pattern";

import { auMoinsUnSecteurListe } from "../SecteurActivite/SecteurActivite.predicats";
import {
  aucuneActiviteInfraNumConcernee,
  aucuneActiviteListee,
  auMoinsUneActiviteInfraNumConcernee,
  auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
  auMoinsUneActiviteListee,
} from "../Activite/Activite.predicats";
import { donneesFormulaireSontIncompletes } from "../DonneesFormulaire/DonneesFormulaire.predicats";
import { OperationCalculeEligibilite } from "./Eligibilite.definition";
import { R } from "../../Eligibilite.constantes";

const calculeEligibiliteOperateurServiceEssentielNis1: OperationCalculeEligibilite =
  (donnees) =>
    match(donnees)
      .with(
        {
          trancheCA: ["petit"],
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
        activites: P.when(
          auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
        ),
      },
      R.Incertain,
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
const calculeEligibiliteMoyenneOuGrandeStructurePrivee: OperationCalculeEligibilite =
  (donnees) =>
    match(donnees)
      .with(
        {
          secteurActivite: ["infrastructureNumerique"],
          activites: P.when(
            auMoinsUneActiviteInfraNumConcerneeEnFranceUniquement,
          ),
        },
        R.Incertain,
      )
      .with(
        {
          secteurActivite: P.array(
            P.union("gestionServicesTic", "fournisseursNumeriques"),
          ),
          activites: P.when(auMoinsUneActiviteListee),
        },
        R.Incertain,
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
    .with({ etatMembre: ["horsue"] }, R.Incertain)
    .with(
      {
        trancheCA: ["petit"],
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
          trancheCA: P.union(["moyen"], ["grand"]),
        },
      ),
      calculeEligibiliteMoyenneOuGrandeStructurePrivee,
    )
    .otherwise(R.Incertain);
export const calculeEligibilite: OperationCalculeEligibilite = (donnees) =>
  match(donnees)
    .when(donneesFormulaireSontIncompletes, R.Incertain)
    .with(
      { designeOperateurServicesEssentiels: ["oui"] },
      calculeEligibiliteOperateurServiceEssentielNis1,
    )
    .with({ typeStructure: ["privee"] }, calculeEligibiliteStructurePrivee)
    .otherwise(R.Incertain);
