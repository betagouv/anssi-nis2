import { EtatEtapes } from "../../../../anssi-nis2-domain/src/Simulateur/EtatEtapes.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../../../anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";

export const traceEtapeSimulateur = <TypeConteneur>(
  etatEtapes: EtatEtapes<TypeConteneur>,
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
) => {
  window._mtm ||= [];
  window._mtm.push({
    event: "EtapeFormulaire",
    "EtapeFormulaire.titre": etatEtapes.contenuEtapeCourante.titre,
    "EtapeFormulaire.donnees": JSON.stringify(donneesFormulaireSimulateur),
  });
};
