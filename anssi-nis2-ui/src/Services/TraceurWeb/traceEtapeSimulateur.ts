import { IDonneesBrutesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.ts";
import { EtatEtapes } from "../../../../commun/core/src/Domain/Simulateur/EtatEtapes.ts";

export const traceEtapeSimulateur = (
  etatEtapes: EtatEtapes,
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
) => {
  window._mtm ||= [];
  window._mtm.push({
    event: "EtapeFormulaire",
    "EtapeFormulaire.titre": etatEtapes.contenuEtapeCourante.titre,
    "EtapeFormulaire.donnees": JSON.stringify(donneesFormulaireSimulateur),
  });
};
