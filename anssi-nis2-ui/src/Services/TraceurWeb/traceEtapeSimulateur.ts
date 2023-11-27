import { EtatEtapes } from "anssi-nis2-domain/src/Simulateur/EtatEtapes.ts";
import { IDonneesBrutesFormulaireSimulateur } from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire.ts";

export const traceEtapeSimulateur = <
  TypeConteneur,
  TypeSimulateurEtapeNodeComponent,
>(
  etatEtapes: EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent>,
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
) => {
  window._mtm ||= [];
  window._mtm.push({
    event: "EtapeFormulaire",
    "EtapeFormulaire.titre": etatEtapes.contenuEtapeCourante.titre,
    "EtapeFormulaire.donnees": JSON.stringify(donneesFormulaireSimulateur),
  });
};
