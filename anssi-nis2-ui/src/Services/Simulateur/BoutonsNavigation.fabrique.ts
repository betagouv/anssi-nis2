import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/DonneesFormulaire.ts";
import { EtatEtapes } from "../../../../commun/core/src/Domain/Simulateur/EtatEtapes.ts";
import {
  fabriqueEtatEtapePrecedent,
  fabriqueEtatEtapeSuivant,
} from "../../../../commun/core/src/Domain/Simulateur/services/EtatEtape/EtatEtape.operations.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.tsx";
import { EnvoieDonneesFormulaire } from "./Operations/appelsApi";
import { donneesFormulaireSontCompletes } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.predicats.ts";

const centreSurHautFormulaire = () =>
  window.scrollTo({ top: document.getElementById("debutForm")?.offsetTop });

export const fabriqueGestionSuivant =
  (
    setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
    etatEtapes: EtatEtapes,
    donneesSimulateur: DonneesFormulaireSimulateur,
    envoieDonneesFormulaire: EnvoieDonneesFormulaire,
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    if (donneesFormulaireSontCompletes(donneesSimulateur)) {
      envoieDonneesFormulaire(donneesSimulateur).then(() =>
        setEtatEtape(fabriqueEtatEtapeSuivant(etatEtapes, donneesSimulateur)),
      );
    } else {
      setEtatEtape(fabriqueEtatEtapeSuivant(etatEtapes, donneesSimulateur));
    }
    centreSurHautFormulaire();
  };

export const fabriqueGestionPrecedent = (
  setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
  etatEtapes: EtatEtapes,
  donneesSimulateur: DonneesFormulaireSimulateur,
) => {
  if (etatEtapes.collectionEtapes.estPremiereEtape(etatEtapes.indiceCourant))
    return noRefClick;
  return (e: React.MouseEvent) => {
    e.preventDefault();
    setEtatEtape(fabriqueEtatEtapePrecedent(etatEtapes, donneesSimulateur));
    centreSurHautFormulaire();
  };
};

export const fabriqueInformationsBoutonsNavigation = (
  setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtapes>>,
  etatEtapes: EtatEtapes,
  donneesFormulaireSimulateur: DonneesFormulaireSimulateur,
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
