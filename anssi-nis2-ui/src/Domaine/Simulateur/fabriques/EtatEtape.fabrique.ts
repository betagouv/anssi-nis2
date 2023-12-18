import { IDonneesBrutesFormulaireSimulateur } from "../DonneesFormulaire";
import { donneesFormulaireSimulateurVide } from "../DonneesFormulaire.constantes";
import { EtatEtapes } from "../EtatEtapes";
import { CollectionInformationsEtapes } from "../CollectionInformationsEtapes";

const suivantEstIgnore = (
  suivant: EtatEtapes,
  donnees: IDonneesBrutesFormulaireSimulateur,
) => suivant.contenuEtapeCourante.estIgnoree(donnees);
const fabriqueIgnoreEtape = (etapeSuivantExiste: boolean) =>
  etapeSuivantExiste ? suivantEstIgnore : () => false;

export const fabriqueEtatEtape: (
  collectionEtapes: CollectionInformationsEtapes,
  indiceEtape: number,
  indiceSousEtape?: number,
  donneesFormulaire?: IDonneesBrutesFormulaireSimulateur,
) => EtatEtapes = (
  collectionEtapes,
  indiceEtape,
  indiceSousEtape = 0,
  donneesFormulaire = donneesFormulaireSimulateurVide,
) => {
  const contenuEtapeCourante = collectionEtapes.contenuEtape(
    indiceEtape,
    indiceSousEtape,
  );
  const etapeSuivantExiste = collectionEtapes.existeEtapeSuivante(indiceEtape);
  return {
    typeEtapeCourante: collectionEtapes.typeEtape(indiceEtape, indiceSousEtape),
    donneesFormulaire: donneesFormulaire,
    collectionEtapes: collectionEtapes,
    varianteEtape: contenuEtapeCourante.varianteAffichee(donneesFormulaire),
    numero: collectionEtapes.numero(indiceEtape),
    estSurSousEtape: collectionEtapes.estSurSousEtape(indiceSousEtape),
    estSurEtapeInitiale: collectionEtapes.estSurEtapeInitiale(indiceEtape),
    etapeSuivantExiste: etapeSuivantExiste,
    ignoreEtapeSuivante: fabriqueIgnoreEtape(etapeSuivantExiste),
    indiceCourant: indiceEtape,
    indiceSousEtape: indiceSousEtape,
    contenuEtapeCourante: contenuEtapeCourante,
  };
};
