import {
  ConstantesEtatEtape,
  EtatEtapes,
} from "../../../Services/Simulateur/EtatEtapes.ts";
import { DonneesFormulaireSimulateur } from "../DonneesFormulaire.ts";
import { fabriqueEtatEtape } from "../fabriques/EtatEtape.fabrique.ts";
import { match, P } from "ts-pattern";

type ConstruitSuccesseur = (
  etatEtapeCourant: EtatEtapes,
  indiceEtape: number,
  indiceSousEtape: number,
  donneesFormulaire: DonneesFormulaireSimulateur,
) => EtatEtapes;
type FabriqueSuccesseurEtatEtape = (
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur,
) => EtatEtapes;
type FabriqueChangementEtatEtape = (
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur,
) => () => EtatEtapes;
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
const fabriqueAvanceEtape: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant + 1,
      0,
      donnees,
    );
const fabriqueReculeEtape: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant - 1,
      0,
      donnees,
    );
const fabriqueReculeEtapeParente: FabriqueChangementEtatEtape =
  (etatEtapes, donnees) => () =>
    construitEtatEtapeSuccesseur(
      etatEtapes,
      etatEtapes.indiceCourant,
      ConstantesEtatEtape.indiceSousEtapeInitial,
      donnees,
    );
const fabriqueAvanceSousEtape: FabriqueChangementEtatEtape =
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
) => P.when(() => etatEtapes.remplitContitionSousEtape(donnees));
const fabriqueEtatEtapeSuivantSansCondition = (
  etatEtapes: EtatEtapes,
  donnees: DonneesFormulaireSimulateur,
) => {
  return match<EtatEtapes>(etatEtapes)
    .with(
      {
        estSurSousEtape: false,
        remplitContitionSousEtape: quandRempliContitionSousEtape(
          etatEtapes,
          donnees,
        ),
      },
      fabriqueAvanceSousEtape(etatEtapes, donnees),
    )
    .with(
      { etapeSuivantExiste: true },
      fabriqueAvanceEtape(etatEtapes, donnees),
    )
    .otherwise(() => etatEtapes);
};
export const fabriqueEtatEtapeSuivant: FabriqueSuccesseurEtatEtape = (
  etatEtapes,
  nouvellesDonnees,
) => {
  const etatEtapeSuivantSansCondition = fabriqueEtatEtapeSuivantSansCondition(
    etatEtapes,
    nouvellesDonnees,
  );
  if (
    etatEtapes.ignoreEtapeSuivante(
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
      fabriqueReculeEtapeParente(etatEtapes, donnees),
    )
    .otherwise(fabriqueReculeEtape(etatEtapes, donnees));
