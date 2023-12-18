import { ResultatEligibilite } from "./Eligibilite.definitions.ts";
import { ValeursActivites } from "./Activite.definitions.ts";
import { ValeursResultatEligibilite } from "./Eligibilite.valeurs.ts";

/** Enumération des résultats d'éligibilité */
export const Eligibilite: Readonly<
  Record<ResultatEligibilite, ResultatEligibilite>
> = {
  NonEligible: "NonEligible",
  EligiblePetiteEntreprise: "EligiblePetiteEntreprise",
  EligibleMoyenneGrandeEntreprise: "EligibleMoyenneGrandeEntreprise",
  Incertain: "Incertain",
} as const;

/** Activités toujours concernées pour une petite entreprise privée */
export const ValeursActivitesConcernesInfrastructureNumerique: ValeursActivites[] =
  [
    "fournisseurReseauxCommunicationElectroniquesPublics",
    "fournisseurServiceCommunicationElectroniquesPublics",
    "prestataireServiceConfiance",
  ];
/** Activités concernées uniquement si le représenbant est en France */
export const ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement: ValeursActivites[] =
  ["registresNomsDomainesPremierNiveau", "fournisseurServicesDNS"];

/** Enregistrement des types de résultats sous forme de fonction pour pqttern matching */
export const R: { [k in ResultatEligibilite]: () => ResultatEligibilite } =
  ValeursResultatEligibilite.reduce(
    (rec, res) => ({ ...rec, [res]: () => Eligibilite[res] }),
    {} as { [key in ResultatEligibilite]: () => ResultatEligibilite },
  );
