import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { RegulationEntite } from "../../../../commun/core/src/Domain/Simulateur/Regulation.definitions.ts";
import {
  estIncertain,
  estRegule,
} from "../../../../commun/core/src/Domain/Simulateur/Regulation.predicats.ts";
import { estPetiteEntreprise } from "../../../../commun/core/src/Domain/Simulateur/services/TailleEntreprise/TailleEntite.predicats.ts";

export const getModeFormulaireEmail = (regulation: RegulationEntite) =>
  estRegule(regulation) ? "complet" : "simple";

export const affichePdf =
  (regulation: RegulationEntite) => (d: DonneesFormulaireSimulateur) =>
    estIncertain(regulation) ||
    estPetiteEntreprise(d.trancheNombreEmployes, d.trancheChiffreAffaire);
