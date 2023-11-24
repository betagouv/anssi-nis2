import { ResultatEligibilite } from "./Eligibilite.definitions";
import { ValeursActivites } from "./Activite.definitions";
import { ValeursResultatEligibilite } from "./Eligibilite.valeurs";

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
    {} as { [key in ResultatEligibilite]: () => ResultatEligibilite },
  );
