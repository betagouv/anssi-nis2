import { EtatEtapes } from "../Services/Simulateur/EtatEtapes.ts";
import { DonneesFormulaireSimulateur } from "../Domaine/Simulateur/DonneesFormulaire.ts";

export const fabriqueGestionSuivant =
  (
    setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
    etatEtapes: EtatEtapes,
    inputsState: DonneesFormulaireSimulateur,
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    setEtatEtape(etatEtapes.suivant(inputsState));
  };
export const fabriqueGestionPrecedent =
  (
    setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
    etatEtapes: EtatEtapes,
    inputsState: DonneesFormulaireSimulateur,
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    setEtatEtape(etatEtapes.precedent(inputsState));
  };
