import { match, P } from "ts-pattern";
import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";

import { auMoinsUnSecteurListe } from "../SecteurActivite/SecteurActivite.predicats.ts";
import {
  Eligibilite,
  ResultatEligibilite,
} from "../../Eligibilite.definitions.ts";
import {
  aucuneActiviteListee,
  auMoinsUneActiviteListee,
} from "../Activite/Activite.predicats.ts";

export const estEligible: (
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
) => ResultatEligibilite = (donneesFormulaireSimulateur) => {
  return match(donneesFormulaireSimulateur)
    .with({ typeStructure: [] }, () => Eligibilite.Incertain)
    .with(
      {
        designeOperateurServicesEssentiels: ["oui"],
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
      },
      () => Eligibilite.EligiblePetiteEntreprise,
    )
    .with(
      { designeOperateurServicesEssentiels: ["oui"] },
      () => Eligibilite.EligibleMoyenneGrandeEntreprise,
    )
    .with(
      {
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        activites: P.when(aucuneActiviteListee),
      },
      () => Eligibilite.NonEligible,
    )
    .with(
      {
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        secteurActivite: ["infrastructureNumerique"],
        activites: P.when(auMoinsUneActiviteListee),
      },
      () => Eligibilite.EligiblePetiteEntreprise,
    )
    .with(
      {
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        trancheCA: ["petit"],
        trancheNombreEmployes: ["petit"],
        secteurActivite: P.not(["infrastructureNumerique"]),
        activites: P.when(auMoinsUneActiviteListee),
      },
      () => Eligibilite.NonEligible,
    )
    .with(
      {
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        trancheCA: P.union(["moyen"], ["grand"]),
        secteurActivite: P.when(auMoinsUnSecteurListe),
        activites: P.when(auMoinsUneActiviteListee),
      },
      () => Eligibilite.EligibleMoyenneGrandeEntreprise,
    )
    .with(
      {
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        trancheNombreEmployes: P.union(["moyen"], ["grand"]),
        secteurActivite: P.when(auMoinsUnSecteurListe),
        activites: P.when(auMoinsUneActiviteListee),
      },
      () => Eligibilite.EligibleMoyenneGrandeEntreprise,
    )
    .otherwise(() => Eligibilite.Incertain);
};
