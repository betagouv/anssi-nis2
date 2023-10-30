import { EtatEtapesManipulable } from "../Simulateur/EtatEtapes.ts";
import { DonneesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";

export const traceEtapeSimulateur = (
  etatEtapes: EtatEtapesManipulable,
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => {
  window._mtm ||= [];
  window._mtm.push({
    event: "EtapeFormulaire",
    "EtapeFormulaire.titre": etatEtapes.titre,
    "EtapeFormulaire.donnees": JSON.stringify(donneesFormulaireSimulateur),
  });
};
