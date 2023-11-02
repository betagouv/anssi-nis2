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