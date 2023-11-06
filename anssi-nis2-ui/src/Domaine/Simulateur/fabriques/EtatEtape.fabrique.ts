import {
  donneesFormulaireSimulateurVide,
  IDonneesBrutesFormulaireSimulateur,
} from "../DonneesFormulaire.ts";
import { EtatEtapes } from "../../../Services/Simulateur/EtatEtapes.ts";
import { CollectionInformationsEtapes } from "../../../Services/Simulateur/CollectionInformationsEtapes.ts";

type EtatEtapeFabrique = (
  collectionEtapes: CollectionInformationsEtapes,
  indiceEtape: number,
  indiceSousEtape?: number,
  donneesFormulaire?: IDonneesBrutesFormulaireSimulateur,
) => EtatEtapes;

const suivantEstIgnore = (
  suivant: EtatEtapes,
  donnees: IDonneesBrutesFormulaireSimulateur,
) => suivant.informationEtapeForm.estIgnoree(donnees);
const fabriqueIgnoreEtape = (etapeSuivantExiste: boolean) =>
  etapeSuivantExiste ? suivantEstIgnore : () => false;

export const fabriqueEtatEtape: EtatEtapeFabrique = (
  collectionEtapes,
  indiceEtape,
  indiceSousEtape = 0,
  donneesFormulaire = donneesFormulaireSimulateurVide,
) => {
  const contenuEtapeCourante = collectionEtapes.contenuEtapeCourante(
    collectionEtapes,
    indiceEtape,
    indiceSousEtape,
  );
  const etapeSuivantExiste = collectionEtapes.existeEtapeSuivante(indiceEtape);
  return {
    donneesFormulaire: donneesFormulaire,
    collectionEtapes: collectionEtapes,
    titre: contenuEtapeCourante.titre,
    indice: indiceEtape,
    indiceCourant: indiceEtape,
    indiceSousEtape: indiceSousEtape,
    numero: collectionEtapes.numeroCourant(indiceEtape),
    contenuEtapeCourante: contenuEtapeCourante,
    conteneurElement: contenuEtapeCourante.conteneurElementRendu,
    etapeSuivantExiste: etapeSuivantExiste,
    estSurSousEtape: collectionEtapes.estSurSousEtape(indiceSousEtape),
    estSurEtapeInitiale: collectionEtapes.estSurEtapeInitiale(indiceEtape),
    informationEtapeForm: contenuEtapeCourante,
    ignoreEtapeSuivante: fabriqueIgnoreEtape(etapeSuivantExiste),
    remplitContitionSousEtape: contenuEtapeCourante.remplitContitionSousEtape,
  };
};
