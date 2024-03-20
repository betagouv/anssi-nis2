import { EtatEtape } from "../../../../commun/core/src/Domain/Simulateur/EtatEtape.definitions.ts";
import { etapeSuivanteEstResultat } from "../../../../commun/core/src/Domain/Simulateur/EtatEtape.predicats.ts";
import { DonneesFormulaireSimulateur } from "../../../../commun/core/src/Domain/Simulateur/services/DonneesFormulaire/DonneesFormulaire.definitions.ts";
import {
  fabriqueEtatEtapePrecedent,
  fabriqueEtatEtapeSuivant,
} from "../../../../commun/core/src/Domain/Simulateur/services/EtatEtape/EtatEtape.operations.ts";
import { noRefClick } from "../Echaffaudages/AssistantsEchaffaudages.tsx";
import { EnvoieDonneesFormulaire } from "../Simulateur/Operations/appelsApi";

const centreSurHautFormulaire = () =>
  window.scrollTo({ top: document.getElementById("debutForm")?.offsetTop });

export const fabriqueGestionSuivant =
  (
    setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtape>>,
    etatEtapes: EtatEtape,
    donneesSimulateur: DonneesFormulaireSimulateur,
    envoieDonneesFormulaire: EnvoieDonneesFormulaire,
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();
    if (etapeSuivanteEstResultat(etatEtapes)(donneesSimulateur)) {
      envoieDonneesFormulaire(donneesSimulateur).then(() => {
        setEtatEtape(fabriqueEtatEtapeSuivant(etatEtapes, donneesSimulateur));
        centreSurHautFormulaire();
      });
    } else {
      setEtatEtape(fabriqueEtatEtapeSuivant(etatEtapes, donneesSimulateur));
      centreSurHautFormulaire();
    }
  };

export const fabriqueGestionPrecedent = (
  setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtape>>,
  etatEtapes: EtatEtape,
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
  setEtatEtape: React.Dispatch<React.SetStateAction<EtatEtape>>,
  etatEtapes: EtatEtape,
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
