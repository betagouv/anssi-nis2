import { match, P } from "ts-pattern";
import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";

import {
  aucuneActiviteListee,
  auMoinsUneActiviteListee,
} from "./Operations/FiltreActivites.ts";
import { auMoinsUnSecteurListe } from "./Operations/FiltresSecteurs.ts";

export type ResultatEligibilite =
  | "NonEligible"
  | "EligiblePetiteEntreprise"
  | "EligibleMoyenneGrandeEntreprise"
  | "Incertain";

export const Eligibilite: Readonly<
  Record<ResultatEligibilite, ResultatEligibilite>
> = {
  NonEligible: "NonEligible",
  EligiblePetiteEntreprise: "EligiblePetiteEntreprise",
  EligibleMoyenneGrandeEntreprise: "EligibleMoyenneGrandeEntreprise",
  Incertain: "Incertain",
} as const;

export const eligibilite: (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatEligibilite = (donneesFormulaireSimulateur) => {
  return match(donneesFormulaireSimulateur)
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
        activites: P.when(auMoinsUneActiviteListee),
      },
      () => Eligibilite.EligiblePetiteEntreprise,
    )
    .with(
      {
        designeOperateurServicesEssentiels: ["non"],
        typeStructure: ["privee"],
        secteurActivite: P.when(auMoinsUnSecteurListe),
        activites: P.when(auMoinsUneActiviteListee),
      },
      () => Eligibilite.EligibleMoyenneGrandeEntreprise,
    )
    .otherwise(() => Eligibilite.Incertain);
};
