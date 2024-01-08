import { match, P } from "ts-pattern";
import { DonneesFormulaireSimulateur } from "../../DonneesFormulaire";
import { ConstantesEtatEtape } from "../../EtatEtape.constantes";
import { EtatEtapes } from "../../EtatEtapes";
import { fabriqueEtatEtape } from "../../fabriques/EtatEtape.fabrique";

type ConstruitSuccesseur = (
  etatEtapeCourant: EtatEtapes,
  indiceEtape: number,
  indiceSousEtape: number,
  donneesFormulaire: DonneesFormulaireSimulateur
) => EtatEtapes;
type FabriqueSuccesseurEtatEtape = (
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur
) => EtatEtapes;
type FabriqueChangementEtatEtape = (
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur
) => () => EtatEtapes;
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
const quandRempliContitionSousEtape = (
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur
) =>
  P.when(() =>
    etatEtapes.contenuEtapeCourante.remplitContitionSousEtape(donnees)
  );
const fabriqueEtatEtapeSuivantSansCondition = (
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur
) => {
  return match<EtatEtapes>(etatEtapes)
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
