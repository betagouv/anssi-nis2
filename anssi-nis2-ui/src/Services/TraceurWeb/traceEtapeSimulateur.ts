import { EtatEtapes } from "../Simulateur/EtatEtapes.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";

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
