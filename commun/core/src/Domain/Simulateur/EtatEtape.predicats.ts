import { toujoursFaux } from "../../../../utils/services/commun.predicats";
import { EtatEtape } from "./EtatEtape.definitions";
import { DonneesFormulaireSimulateur } from "./services/DonneesFormulaire/DonneesFormulaire.definitions";

export const suivantEstIgnore = (
  suivant: EtatEtape,
  donnees: DonneesFormulaireSimulateur
) => suivant.contenuEtapeCourante.estIgnoree(donnees);

export const ignoreEtapeSuivante = (etatEtape: EtatEtape) =>
  etatEtape.etapeSuivantExiste ? suivantEstIgnore : toujoursFaux;
