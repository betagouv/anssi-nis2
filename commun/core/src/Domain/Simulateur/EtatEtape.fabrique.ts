import { CollectionInformationsEtapes } from "./CollectionInformationsEtapes.definitions";
import { EtatEtape } from "./EtatEtape.definitions";
import { donneesFormulaireSimulateurVide } from "./services/DonneesFormulaire/DonneesFormulaire.constantes";
import { DonneesFormulaireSimulateur } from "./services/DonneesFormulaire/DonneesFormulaire.definitions";

export const fabriqueEtatEtape: (
  collectionEtapes: CollectionInformationsEtapes,
  indiceEtape: number,
  indiceSousEtape?: number,
  donneesFormulaire?: DonneesFormulaireSimulateur,
) => EtatEtape = (
  collectionEtapes,
  indiceEtape,
  indiceSousEtape = 0,
  donneesFormulaire = donneesFormulaireSimulateurVide,
) => {
  const contenuEtapeCourante = collectionEtapes.contenuEtape(
    indiceEtape,
    indiceSousEtape,
  );
  return {
    typeEtapeCourante: collectionEtapes.typeEtape(indiceEtape, indiceSousEtape),
    donneesFormulaire: donneesFormulaire,
    collectionEtapes: collectionEtapes,
    varianteEtape: contenuEtapeCourante.varianteAffichee(donneesFormulaire),
    numero: collectionEtapes.numero(indiceEtape),
    estSurSousEtape: collectionEtapes.estSurSousEtape(indiceSousEtape),
    estSurEtapeInitiale: collectionEtapes.estSurEtapeInitiale(indiceEtape),
    etapeSuivantExiste: collectionEtapes.existeEtapeSuivante(indiceEtape),
    indiceCourant: indiceEtape,
    indiceSousEtape: indiceSousEtape,
    contenuEtapeCourante: contenuEtapeCourante,
  };
};
