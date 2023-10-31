import { EtatEtapes } from "../Services/Simulateur/EtatEtapes.ts";
import { DonneesFormulaireSimulateur } from "../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  fabriqueEtatEtapePrecedent,
  fabriqueEtatEtapeSuivant,
} from "../Domaine/Simulateur/services/fabriqueSuccesseurEtatEtape.ts";

export const fabriqueGestionSuivant =
  (
    setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
    etatEtapes: EtatEtapes,
    donneesSimulateur: DonneesFormulaireSimulateur,
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    setEtatEtape(fabriqueEtatEtapeSuivant(etatEtapes, donneesSimulateur));
  };
export const fabriqueGestionPrecedent =
  (
    setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
    etatEtapes: EtatEtapes,
    donneesSimulateur: DonneesFormulaireSimulateur,
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    setEtatEtape(fabriqueEtatEtapePrecedent(etatEtapes, donneesSimulateur));
  };

export const fabriqueInformationsBoutonsNavigation = (
  setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
  etatEtapes: EtatEtapes,
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
) => ({
  suivant: fabriqueGestionSuivant(
    setEtatEtape,
    etatEtapes,
    donneesFormulaireSimulateur,
  ),
  precedent: fabriqueGestionPrecedent(
    setEtatEtape,
    etatEtapes,
    donneesFormulaireSimulateur,
  ),
});
