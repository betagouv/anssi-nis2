import { match, P } from "ts-pattern";
import { ignoreEtapeSuivante } from "../../EtatEtape.predicats";
import { DonneesFormulaireSimulateur } from "../DonneesFormulaire/DonneesFormulaire.definitions";
import { ConstantesEtatEtape } from "../../EtatEtape.constantes";
import { EtatEtape } from "../../EtatEtape.definitions";
import { fabriqueEtatEtape } from "../../EtatEtape.fabrique";

type ConstruitSuccesseur = (
  etatEtapeCourant: EtatEtape,
  indiceEtape: number,
  indiceSousEtape: number,
  donneesFormulaire: DonneesFormulaireSimulateur,
) => EtatEtape;
type FabriqueSuccesseurEtatEtape = (
  etatEtapes: EtatEtape,
  donnees: DonneesFormulaireSimulateur,
) => EtatEtape;
type FabriqueChangementEtatEtape = (
  etatEtapes: EtatEtape,
  donnees: DonneesFormulaireSimulateur,
) => () => EtatEtape;
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
const incrementeEtatEtape: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant + 1,
      ConstantesEtatEtape.indiceSousEtapeInitial,
      donnees,
    );
const decrementeEtatEtape: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant - 1,
      ConstantesEtatEtape.indiceSousEtapeInitial,
      donnees,
    );

const remonteEtatEtapePrincipal: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant,
      ConstantesEtatEtape.indiceSousEtapeInitial,
      donnees,
    );
const descendSousEtape: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant,
      etatEtapes.indiceSousEtape + 1,
      donnees,
    );
const quandRempliContitionSousEtape = (
  etatEtapes: EtatEtape,
  donnees: DonneesFormulaireSimulateur,
) =>
  P.when(() =>
    etatEtapes.contenuEtapeCourante.remplitContitionSousEtape(donnees),
  );
const fabriqueEtatEtapeSuivantSansCondition = (
  etatEtapes: EtatEtape,
  donnees: DonneesFormulaireSimulateur,
) =>
  match<EtatEtape>(etatEtapes)
    .with(
      {
        estSurSousEtape: false,
        contenuEtapeCourante: quandRempliContitionSousEtape(
          etatEtapes,
          donnees,
        ),
      },
      descendSousEtape(etatEtapes, donnees),
    )
    .with(
      { etapeSuivantExiste: true },
      incrementeEtatEtape(etatEtapes, donnees),
    )
    .otherwise(() => etatEtapes);
export const fabriqueEtatEtapeSuivant: FabriqueSuccesseurEtatEtape = (
  etatEtapeCourant,
  nouvellesDonnees,
) => {
  const etatEtapeSuivantSansCondition = fabriqueEtatEtapeSuivantSansCondition(
    etatEtapeCourant,
    nouvellesDonnees,
  );
  if (
    ignoreEtapeSuivante(etatEtapeCourant)(
      etatEtapeSuivantSansCondition,
      nouvellesDonnees,
    )
  ) {
    return fabriqueEtatEtapeSuivant(
      etatEtapeSuivantSansCondition,
      nouvellesDonnees,
    );
  }
  return etatEtapeSuivantSansCondition;
};
export const fabriqueEtatEtapePrecedent: FabriqueSuccesseurEtatEtape = (
  etatEtapes,
  donnees,
) =>
  match(etatEtapes)
    .with({ estSurEtapeInitiale: true }, () => etatEtapes)
    .with(
      { estSurSousEtape: true },
      remonteEtatEtapePrincipal(etatEtapes, donnees),
    )
    .otherwise(decrementeEtatEtape(etatEtapes, donnees));
