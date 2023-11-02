import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire.ts";
import { contientAutreSecteurActiviteUniquement } from "../SecteurActivite/SecteurActivite.predicats.ts";
import { contientSousSecteurAutresUniquement } from "../ChampSimulateur/champs.predicats.ts";

export const verifieCompletudeDonneesFormulaire = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  donnees.designeOperateurServicesEssentiels.length == 1 &&
  donnees.etatMembre.length == 1 &&
  donnees.trancheCA.length == 1 &&
  donnees.trancheNombreEmployes.length == 1 &&
  donnees.typeStructure.length == 1 &&
  donnees.secteurActivite.length > 0 &&
  (contientAutreSecteurActiviteUniquement(donnees) ||
    contientSousSecteurAutresUniquement(donnees) ||
    donnees.activites.length > 0);
