import {
  donneesFormulaireSimulateurVide,
  IDonneesBrutesFormulaireSimulateur,
} from "anssi-nis2-domain/src/Simulateur/DonneesFormulaire";
import { EtatEtapes } from "anssi-nis2-domain/src/Simulateur/EtatEtapes";
import { CollectionInformationsEtapes } from "anssi-nis2-domain/src/Simulateur/CollectionInformationsEtapes";

const suivantEstIgnore = <TypeConteneur, TypeSimulateurEtapeNodeComponent>(
  suivant: EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent>,
  donnees: IDonneesBrutesFormulaireSimulateur,
) => suivant.contenuEtapeCourante.estIgnoree(donnees);
const fabriqueIgnoreEtape = (etapeSuivantExiste: boolean) =>
  etapeSuivantExiste ? suivantEstIgnore : () => false;

export const fabriqueEtatEtape: <
  TypeConteneur,
  TypeSimulateurEtapeNodeComponent,
>(
  collectionEtapes: CollectionInformationsEtapes<
    TypeConteneur,
    TypeSimulateurEtapeNodeComponent
  >,
  indiceEtape: number,
  indiceSousEtape?: number,
  donneesFormulaire?: IDonneesBrutesFormulaireSimulateur,
) => EtatEtapes<TypeConteneur, TypeSimulateurEtapeNodeComponent> = (
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
