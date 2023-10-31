import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../DonneesFormulaire.ts";
import {
  ConstantesEtatEtape,
  EtatEtapes,
} from "../../../Services/Simulateur/EtatEtapes.ts";
import { InformationEtapeForm } from "../../../Services/Simulateur/InformationsEtape.ts";
import { CollectionInformationsEtapes } from "../../../Services/Simulateur/CollectionInformationsEtapes.ts";
import { VVV } from "../../../utilitaires/debug.ts";

type EtatEtapeFabrique = (
  collectionEtapes: CollectionInformationsEtapes,
  indiceEtape: number,
  indiceSousEtape?: number,
  donneesFormulaire?: DonneesFormulaireSimulateur,
) => EtatEtapes;

function fabriqueIgnoreEtape(etapeSuivantExiste: boolean) {
  return etapeSuivantExiste
    ? (suivant: EtatEtapes, donnees: DonneesFormulaireSimulateur) => {
        return suivant.informationEtapeForm.estIgnoree(donnees);
      }
    : () => false;
}

export const fabriqueEtatEtape: EtatEtapeFabrique = (
  collectionEtapes,
  indiceEtape,
  indiceSousEtape = 0,
  donneesFormulaire = donneesFormulaireSimulateurVide,
) => {
  const estSurEtapeInitiale =
    indiceEtape === ConstantesEtatEtape.indiceEtapeInitial;
  const estSurSousEtape =
    indiceSousEtape != ConstantesEtatEtape.indiceSousEtapeInitial;
  const etapeCourantePrincipale =
    collectionEtapes.recupereEtapeCourante(indiceEtape);
  const contenuEtapeCourante = estSurSousEtape
    ? collectionEtapes.recupereSousEtape(indiceEtape) || etapeCourantePrincipale
    : etapeCourantePrincipale;
  const informationEtapeForm = contenuEtapeCourante as InformationEtapeForm;
  const remplitContitionSousEtape = (donnees: DonneesFormulaireSimulateur) =>
    informationEtapeForm.remplitContitionSousEtape(donnees);
  const etapeSuivantExiste = indiceEtape < collectionEtapes.length - 1;
  VVV(
    "Titre: ",
    etapeCourantePrincipale.titre,
    ", Element=",
    informationEtapeForm.conteneurElementRendu.name,
  );
  return {
    donneesFormulaire: donneesFormulaire,
    collectionEtapes: collectionEtapes,
    titre: contenuEtapeCourante.titre,
    indice: indiceEtape,
    indiceCourant: indiceEtape,
    indiceSousEtape: indiceSousEtape,
    numero: collectionEtapes.numeroCourant(indiceEtape),
    contenuEtapeCourante: contenuEtapeCourante,
    conteneurElement: informationEtapeForm.conteneurElementRendu,
    etapeSuivantExiste: etapeSuivantExiste,
    estSurSousEtape: estSurSousEtape,
    estSurEtapeInitiale: estSurEtapeInitiale,
    informationEtapeForm: informationEtapeForm,
    ignoreEtapeSuivante: fabriqueIgnoreEtape(etapeSuivantExiste),
    remplitContitionSousEtape: remplitContitionSousEtape,
  };
};
