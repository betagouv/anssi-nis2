import {
  DonneesFormulaireSimulateur,
  donneesFormulaireSimulateurVide,
} from "../DonneesFormulaire.ts";
import {
  ConstantesEtatEtape,
  EtatEtapes,
} from "../../../Services/Simulateur/EtatEtapes.ts";
import { match, P } from "ts-pattern";
import { InformationEtapeForm } from "../../../Services/Simulateur/InformationsEtape.ts";
import { CollectionInformationsEtapes } from "../../../Services/Simulateur/CollectionInformationsEtapes.ts";

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
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur,
) => () => EtatEtapes;
type FabriqueChangementEtatEtape = (
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur,
) => EtatEtapes;

export const fabriqueEtatEtape: FabriqueEtatEtape = (
  collectionEtapes,
  indiceEtape,
  indiceSousEtape = 0,
  donneesFormulaire = donneesFormulaireSimulateurVide,
) => {
  const sousEtapeNonActivee =
    indiceSousEtape == ConstantesEtatEtape.indiceSousEtapeInitial;
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
    indiceCourant: indiceEtape,
    indiceSousEtape: indiceSousEtape,
    donneesFormulaire: donneesFormulaire,
    indice: indiceEtape,
    numero: collectionEtapes.numeroCourant(indiceEtape),
    contenuEtapeCourante: contenuEtapeCourante,
    titre: contenuEtapeCourante.titre,
    conteneurElement: informationEtapeForm.conteneurElementRendu,
    etapeSuivantExiste: indiceEtape < collectionEtapes.length - 1,
    sousEtapeNonActivee: sousEtapeNonActivee,
    surEtapeInitiale: indiceEtape === ConstantesEtatEtape.indiceEtapeInitial,
    informationEtapeForm: informationEtapeForm,
    rempliContitionSousEtape: rempliContitionSousEtape,
  };
};

const construitEtatEtapeSuccesseur: ConstruitSuccesseur = (
  etatEtapes,
  indiceEtape,
  indiceSousEtape,
  donneesFormulaire,
) =>
  fabriqueEtatEtape(
    etatEtapes.collectionEtapes,
    indiceEtape,
    indiceSousEtape,
    donneesFormulaire,
  );
const fabriqueAvanceEtape: FabriqueChangementEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant + 1,
      0,
      donnees,
    );
const fabriqueReculeEtape: FabriqueChangementEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant - 1,
      0,
      donnees,
    );
const fabriqueReculeEtapeParente: FabriqueChangementEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant,
      ConstantesEtatEtape.indiceSousEtapeInitial,
      donnees,
    );
const fabriqueAvanceSousEtape: FabriqueChangementEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant,
      etatEtapes.indiceSousEtape + 1,
      donnees,
    );

const quandRempliContitionSousEtape = (
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur,
) => P.when(() => etatEtapes.rempliContitionSousEtape(donnees));

function fabriqueEtatEtapeSuivantSansCondition(
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur,
) {
  return match<EtatEtapes>(etatEtapes)
    .with(
      {
        rempliContitionSousEtape: quandRempliContitionSousEtape(
          etatEtapes,
          donnees,
        ),
        sousEtapeNonActivee: true,
      },
      fabriqueAvanceSousEtape(etatEtapes, donnees),
    )
    .with(
      { etapeSuivantExiste: true },
      fabriqueAvanceEtape(etatEtapes, donnees),
    )
    .otherwise(() => etatEtapes);
}

export const fabriqueEtatEtapeSuivant: FabriqueChangementEtatEtape = (
  etatEtapes,
  donnees,
) => {
  const etatEtapeSuivantSansCondition = fabriqueEtatEtapeSuivantSansCondition(
    etatEtapes,
    donnees,
  );
  const ignoreSi =
    etatEtapeSuivantSansCondition.informationEtapeForm.options.ignoreSi;
  if (ignoreSi && ignoreSi(donnees)) {
    return fabriqueEtatEtapeSuivant(etatEtapeSuivantSansCondition, donnees);
  }
  return etatEtapeSuivantSansCondition;
};

export const fabriqueEtatEtapePrecedent: FabriqueChangementEtatEtape = (
  etatEtapes,
  donnees,
) =>
  match(etatEtapes)
    .with({ surEtapeInitiale: true }, () => etatEtapes)
    .with(
      { sousEtapeNonActivee: false },
      fabriqueReculeEtapeParente(etatEtapes, donnees),
    )
    .otherwise(fabriqueReculeEtape(etatEtapes, donnees));
