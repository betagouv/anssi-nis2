import { match, P } from "ts-pattern";
import { IDonneesBrutesFormulaireSimulateur } from "../../DonneesFormulaire";
import {
  ConstantesEtatEtape,
  EtatEtapes,
} from "anssi-nis2-domain/src/Simulateur/EtatEtapes";
import { fabriqueEtatEtape } from "../../fabriques/EtatEtape.fabrique";

type ConstruitSuccesseur = <TypeConteneur>(
  etatEtapeCourant: EtatEtapes<TypeConteneur>,
  indiceEtape: number,
  indiceSousEtape: number,
  donneesFormulaire: IDonneesBrutesFormulaireSimulateur
) => EtatEtapes<TypeConteneur>;
type FabriqueSuccesseurEtatEtape = <TypeConteneur>(
  etatEtapes: EtatEtapes<TypeConteneur>,
  donnees: IDonneesBrutesFormulaireSimulateur
) => EtatEtapes<TypeConteneur>;
type FabriqueChangementEtatEtape = <TypeConteneur>(
  etatEtapes: EtatEtapes<TypeConteneur>,
  donnees: IDonneesBrutesFormulaireSimulateur
) => () => EtatEtapes<TypeConteneur>;
const construitEtatEtapeSuccesseur: ConstruitSuccesseur = (
  etatEtapes,
  indiceEtape,
  indiceSousEtape,
  donneesFormulaire
) =>
  fabriqueEtatEtape(
    etatEtapes.collectionEtapes,
    indiceEtape,
    indiceSousEtape,
    donneesFormulaire
  );
const incrementeEtatEtape: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant + 1,
      ConstantesEtatEtape.indiceSousEtapeInitial,
      donnees
    );
const decrementeEtatEtape: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant - 1,
      ConstantesEtatEtape.indiceSousEtapeInitial,
      donnees
    );

const remonteEtatEtapePrincipal: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant,
      ConstantesEtatEtape.indiceSousEtapeInitial,
      donnees
    );
const descendSousEtape: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant,
      etatEtapes.indiceSousEtape + 1,
      donnees
    );
const quandRempliContitionSousEtape = <TypeConteneur>(
  etatEtapes: EtatEtapes<TypeConteneur>,
  donnees: IDonneesBrutesFormulaireSimulateur
) =>
  P.when(() =>
    etatEtapes.contenuEtapeCourante.remplitContitionSousEtape(donnees)
  );
const fabriqueEtatEtapeSuivantSansCondition = <TypeConteneur>(
  etatEtapes: EtatEtapes<TypeConteneur>,
  donnees: IDonneesBrutesFormulaireSimulateur
) => {
  return match<EtatEtapes<TypeConteneur>>(etatEtapes)
    .with(
      {
        estSurSousEtape: false,
        contenuEtapeCourante: quandRempliContitionSousEtape(
          etatEtapes,
          donnees
        ),
      },
      descendSousEtape(etatEtapes, donnees)
    )
    .with(
      { etapeSuivantExiste: true },
      incrementeEtatEtape(etatEtapes, donnees)
    )
    .otherwise(() => etatEtapes);
};
export const fabriqueEtatEtapeSuivant: FabriqueSuccesseurEtatEtape = (
  etatEtapes,
  nouvellesDonnees
) => {
  const etatEtapeSuivantSansCondition = fabriqueEtatEtapeSuivantSansCondition(
    etatEtapes,
    nouvellesDonnees
  );
  if (
    etatEtapes.ignoreEtapeSuivante(
      etatEtapeSuivantSansCondition,
      nouvellesDonnees
    )
  ) {
    return fabriqueEtatEtapeSuivant(
      etatEtapeSuivantSansCondition,
      nouvellesDonnees
    );
  }
  return etatEtapeSuivantSansCondition;
};
export const fabriqueEtatEtapePrecedent: FabriqueSuccesseurEtatEtape = (
  etatEtapes,
  donnees
) =>
  match(etatEtapes)
    .with({ estSurEtapeInitiale: true }, () => etatEtapes)
    .with(
      { estSurSousEtape: true },
      remonteEtatEtapePrincipal(etatEtapes, donnees)
    )
    .otherwise(decrementeEtatEtape(etatEtapes, donnees));
