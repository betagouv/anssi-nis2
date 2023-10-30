import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../DonneesFormulaire.ts";
import {
  EtatEtapes,
  EtatEtapesManipulable,
} from "../../../Services/Simulateur/EtatEtapes.ts";
import { match, P } from "ts-pattern";
import { CollectionInformationsEtapes } from "../../../Services/Simulateur/CollectionInformationsEtapes.ts";
import { InformationEtapeForm } from "../../../Services/Simulateur/InformationsEtape.ts";

type FabriqueEtatEtape = (
  collectionEtapes: CollectionInformationsEtapes,
  indiceEtape: number,
  indiceSousEtape?: number,
  donneesFormulaire?: DonneesFormulaireSimulateur,
) => EtatEtapes;

type ConstruitSuccesseur = (
  etatEtapeCourant: EtatEtapes,
  indiceEtape: number,
  indiceSousEtape: number,
  donneesFormulaire: DonneesFormulaireSimulateur,
) => EtatEtapes;

type FabriqueChangementEtape = (
  etatEtapeCourant: EtatEtapes,
  donnees: DonneesFormulaireSimulateur,
) => () => EtatEtapes;

type FabriqueChangementEtatEtape = (
  etatEtapeCourant: EtatEtapes,
  donnees: DonneesFormulaireSimulateur,
) => EtatEtapes;

export const fabriqueEtatEtape: FabriqueEtatEtape = (
  collectionEtapes,
  indiceEtape,
  indiceSousEtape = 0,
  donneesFormulaire = donneesFormulaireSimulateurVide,
) => {
  const sousEtapeNonActivee =
    indiceSousEtape == EtatEtapesManipulable.indiceSousEtapeInitial;
  const etapeCourantePrincipale =
    collectionEtapes.recupereEtapeCourante(indiceEtape);
  const contenuEtapeCourante = sousEtapeNonActivee
    ? etapeCourantePrincipale
    : collectionEtapes.recupereSousEtape(indiceEtape) ||
      etapeCourantePrincipale;
  const informationEtapeForm = contenuEtapeCourante as InformationEtapeForm;
  const rempliContitionSousEtape = (donnees: DonneesFormulaireSimulateur) =>
    informationEtapeForm.rempliContitionSousEtape(donnees);
  return {
    collectionEtapes: collectionEtapes,
    indiceEtapeCourante: indiceEtape,
    indiceSousEtape: indiceSousEtape,
    donneesFormulaire: donneesFormulaire,
    indice: indiceEtape,
    numero: collectionEtapes.numeroCourant(indiceEtape),
    contenuEtapeCourante: contenuEtapeCourante,
    titre: contenuEtapeCourante.titre,
    // titreSuivant: fabriqueEtatEtapeSuivant(et, donneesFormulaire).titre,
    conteneurElement: informationEtapeForm.conteneurElementRendu,
    etapeSuivantExiste: indiceEtape < collectionEtapes.length - 1,
    sousEtapeNonActivee: sousEtapeNonActivee,
    surEtapeInitiale: indiceEtape === EtatEtapesManipulable.indiceEtapeInitial,
    informationEtapeForm: informationEtapeForm,
    rempliContitionSousEtape: rempliContitionSousEtape,
  };
};

const construitEtatEtapeSuccesseur: ConstruitSuccesseur = (
  etatEtapeCourant,
  indiceEtape,
  indiceSousEtape,
  donneesFormulaire,
) =>
  fabriqueEtatEtape(
    etatEtapeCourant.collectionEtapes,
    indiceEtape,
    indiceSousEtape,
    donneesFormulaire,
  );
const fabriqueAvanceEtape: FabriqueChangementEtape =
  (etatEtapeCourant, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapeCourant,
      etatEtapeCourant.indiceEtapeCourante + 1,
      0,
      donnees,
    );
const fabriqueReculeEtape: FabriqueChangementEtape =
  (etatEtapeCourant, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapeCourant,
      etatEtapeCourant.indiceEtapeCourante - 1,
      0,
      donnees,
    );
const fabriqueReculeEtapeParente: FabriqueChangementEtape =
  (etatEtapeCourant, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapeCourant,
      etatEtapeCourant.indiceEtapeCourante,
      EtatEtapesManipulable.indiceSousEtapeInitial,
      donnees,
    );
const fabriqueAvanceSousEtape: FabriqueChangementEtape = (
  etatEtapeCourant,
  donneesFormulaire,
) => {
  return () => {
    return construitEtatEtapeSuccesseur(
      etatEtapeCourant,
      etatEtapeCourant.indiceEtapeCourante,
      etatEtapeCourant.indiceSousEtape + 1,
      donneesFormulaire,
    );
  };
};

export const fabriqueEtatEtapeSuivant: FabriqueChangementEtatEtape = (
  etatEtapeCourant,
  donnees,
) => {
  return match<EtatEtapes>(etatEtapeCourant)
    .with(
      {
        rempliContitionSousEtape: P.when(() =>
          etatEtapeCourant.rempliContitionSousEtape(donnees),
        ),
        sousEtapeNonActivee: true,
      },
      fabriqueAvanceSousEtape(etatEtapeCourant, donnees),
    )
    .with(
      { etapeSuivantExiste: true },
      fabriqueAvanceEtape(etatEtapeCourant, donnees),
    )
    .otherwise(() => etatEtapeCourant);
};

export const fabriqueEtatEtapePrecedent: FabriqueChangementEtatEtape = (
  etatEtapeCourant,
  donnees,
) => {
  return match(etatEtapeCourant)
    .with({ surEtapeInitiale: true }, () => etatEtapeCourant)
    .with(
      { sousEtapeNonActivee: false },
      fabriqueReculeEtapeParente(etatEtapeCourant, donnees),
    )
    .otherwise(fabriqueReculeEtape(etatEtapeCourant, donnees));
};
