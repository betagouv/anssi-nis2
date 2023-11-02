import { EtatEtapes } from "../Services/Simulateur/EtatEtapes.ts";
import { IDonneesBrutesFormulaireSimulateur } from "../Domaine/Simulateur/DonneesFormulaire.ts";
import {
  fabriqueEtatEtapePrecedent,
  fabriqueEtatEtapeSuivant,
} from "../Domaine/Simulateur/services/fabriqueSuccesseurEtatEtape.ts";
import { noRefClick } from "../Services/Echaffaudages/AssistantsEchaffaudages.tsx";
import { EnvoieDonneesFormulaire } from "../Services/Simulateur/Operations/appelsApi";
import { contientSousSecteurAutresUniquement } from "../Domaine/Simulateur/services/ChampSimulateur/champs.predicats.ts";
import { contientAutreSecteurActiviteUniquement } from "../Domaine/Simulateur/services/SecteurActivite/SecteurActivite.predicats.ts";

const verifieCompletudeDonneesFormulaire = (
  donnees: IDonneesBrutesFormulaireSimulateur,
) =>
  donnees.designeOperateurServicesEssentiels.length == 1 &&
  donnees.etatMembre.length == 1 &&
  donnees.trancheCA.length == 1 &&
  donnees.trancheNombreEmployes.length == 1 &&
  donnees.typeStructure.length == 1 &&
  donnees.secteurActivite.length > 0 &&
  (contientAutreSecteurActiviteUniquement(donnees) ||
    contientSousSecteurAutresUniquement(donnees) ||
    donnees.activites.length > 0);

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
  if (etatEtapes.collectionEtapes.estPremiereEtape(etatEtapes.indice))
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
