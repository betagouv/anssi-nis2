import { DonneesFormulaireSimulateur } from "./DonneesFormulaire.ts";
import { listeActivitesSaufAutre } from "./Activite.ts";

export type ResultatEligibilite = "NonEligible" | "Eligible";
export const ResultatEligibiliteEnum = {
  NonEligible: "NonEligible",
  Eligible: "Eligible",
} as const;

export const eligibilite: (
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ResultatEligibilite = ({
  designeOperateurServicesEssentiels,
  etatMembre,
  typeStructure,
  trancheNombreEmployes,
  trancheCA,
  secteurActivite,
  activites,
}) => {
  if (designeOperateurServicesEssentiels.includes("oui")) {
    return ResultatEligibiliteEnum.Eligible;
  }
  if (
    etatMembre.includes("france") &&
    typeStructure.includes("privee") &&
    trancheNombreEmployes.includes("petit") &&
    trancheCA.includes("petit") &&
    secteurActivite.includes("infrastructureNumerique") &&
    activites.every((activite) => listeActivitesSaufAutre.includes(activite))
  )
    return ResultatEligibiliteEnum.Eligible;
  return ResultatEligibiliteEnum.NonEligible;
};
