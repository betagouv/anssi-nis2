import { EtatEtapes } from "./EtatEtapes.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  fabriqueEtatEtapePrecedent,
  fabriqueEtatEtapeSuivant,
} from "../../Domaine/Simulateur/services/EtatEtape/EtatEtape.operations.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.tsx";
import { EnvoieDonneesFormulaire } from "./Operations/appelsApi";
import { verifieCompletudeDonneesFormulaire } from "../../Domaine/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats.ts";

export const fabriqueGestionSuivant =
  (
    setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
    etatEtapes: EtatEtapes,
    donneesSimulateur: IDonneesBrutesFormulaireSimulateur,
    envoieDonneesFormulaire: EnvoieDonneesFormulaire,
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    if (verifieCompletudeDonneesFormulaire(donneesSimulateur)) {
      envoieDonneesFormulaire(donneesSimulateur).then(() =>
        setEtatEtape(fabriqueEtatEtapeSuivant(etatEtapes, donneesSimulateur)),
      );
    } else {
      setEtatEtape(fabriqueEtatEtapeSuivant(etatEtapes, donneesSimulateur));
    }
  };

export const fabriqueGestionPrecedent = (
  setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
  etatEtapes: EtatEtapes,
  donneesSimulateur: IDonneesBrutesFormulaireSimulateur,
) => {
  if (etatEtapes.collectionEtapes.estPremiereEtape(etatEtapes.indiceCourant))
    return noRefClick;
  return (e: React.MouseEvent) => {
    e.preventDefault();
    setEtatEtape(fabriqueEtatEtapePrecedent(etatEtapes, donneesSimulateur));
  };
};

export const fabriqueInformationsBoutonsNavigation = (
  setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
  etatEtapes: EtatEtapes,
  donneesFormulaireSimulateur: IDonneesBrutesFormulaireSimulateur,
  envoieDonneesFormulaire: EnvoieDonneesFormulaire,
) => ({
  suivant: fabriqueGestionSuivant(
    setEtatEtape,
    etatEtapes,
    donneesFormulaireSimulateur,
    envoieDonneesFormulaire,
  ),
  precedent: fabriqueGestionPrecedent(
    setEtatEtape,
    etatEtapes,
    donneesFormulaireSimulateur,
  ),
});