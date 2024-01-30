import { Activite } from "./Activite.definitions";
import { ResultatEligibilite } from "./Eligibilite.definitions";
import { ValeursResultatEligibilite } from "./Eligibilite.valeurs";

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
export const ValeursActivitesConcernesInfrastructureNumerique: Activite[] = [
  "fournisseurReseauxCommunicationElectroniquesPublics",
  "fournisseurServiceCommunicationElectroniquesPublics",
  "prestataireServiceConfiance",
];
/** Activités concernées uniquement si le représenbant est en France */
export const ValeursActivitesConcernesInfrastructureNumeriqueFranceUniquement: Activite[] =
  ["registresNomsDomainesPremierNiveau", "fournisseurServicesDNS"];

/** Enregistrement des types de résultats sous forme de fonction pour pqttern matching */
export const R: { [k in ResultatEligibilite]: () => ResultatEligibilite } =
  ValeursResultatEligibilite.reduce(
    (rec, res) => ({ ...rec, [res]: () => Eligibilite[res] }),
    {} as { [key in ResultatEligibilite]: () => ResultatEligibilite }
  );
