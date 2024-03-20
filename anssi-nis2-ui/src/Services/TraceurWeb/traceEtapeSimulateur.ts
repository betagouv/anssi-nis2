import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import { EtatEtape } from "../../../../commun/core/src/Domain/Simulateur/EtatEtape.definitions.ts";

export const traceEtapeSimulateur = (
  etatEtapes: EtatEtape,
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => {
  window._mtm ||= [];
  window._mtm.push({
    event: "EtapeFormulaire",
    "EtapeFormulaire.titre": etatEtapes.contenuEtapeCourante.titre,
    "EtapeFormulaire.donnees": JSON.stringify(donneesFormulaireSimulateur),
  });
};
