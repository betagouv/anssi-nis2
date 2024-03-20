import { toujoursFaux } from "../../../../utils/services/commun.predicats";
import { EtatEtape } from "./EtatEtape.definitions";
import { DonneesFormulaireSimulateur } from "./services/DonneesFormulaire/DonneesFormulaire.definitions";
import { fabriqueEtatEtapeSuivant } from "./services/EtatEtape/EtatEtape.operations";

export const etapeSuivanteEstResultat =
  (etatEtapes: EtatEtape) => (donnees: DonneesFormulaireSimulateur) =>
    fabriqueEtatEtapeSuivant(etatEtapes, donnees).typeEtapeCourante ===
    "resultat";
export const suivantEstIgnore = (
  suivant: EtatEtape,
  donnees: DonneesFormulaireSimulateur,
) => suivant.contenuEtapeCourante.estIgnoree(donnees);

export const ignoreEtapeSuivante = (etatEtape: EtatEtape) =>
  etatEtape.etapeSuivantExiste ? suivantEstIgnore : toujoursFaux;
