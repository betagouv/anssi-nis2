import { ResultatEligibilite } from "./Eligibilite.definitions.ts";
import { ValeursActivites } from "./Activite.definitions.ts";
import { ValeursResultatEligibilite } from "./Eligibilite.valeurs.ts";

export const Eligibilite: Readonly<
  Record<ResultatEligibilite, ResultatEligibilite>
> = {
  NonEligible: "NonEligible",
  EligiblePetiteEntreprise: "EligiblePetiteEntreprise",
  EligibleMoyenneGrandeEntreprise: "EligibleMoyenneGrandeEntreprise",
  Incertain: "Incertain",
} as const;
export const ValeursActivitesConcernesInfrastructureNumerique: ValeursActivites[] =
  [
    "fournisseurReseauxCommunicationElectroniquesPublics",
    "fournisseurServiceCommunicationElectroniquesPublics",
    "prestataireServiceConfiance",
  ];
export const ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement: ValeursActivites[] =
  ["registresNomsDomainesPremierNiveau", "fournisseurServicesDNS"];
export const R: { [k in ResultatEligibilite]: () => ResultatEligibilite } =
  ValeursResultatEligibilite.reduce(
    (rec, res) => ({ ...rec, [res]: () => Eligibilite[res] }),
    {} as { [key in ResultatEligibilite]: () => ResultatEligibilite }
  );
