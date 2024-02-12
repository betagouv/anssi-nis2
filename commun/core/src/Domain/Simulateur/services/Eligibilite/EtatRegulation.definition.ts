import { Either, isLeft, isRight, left, Right, right } from "fp-ts/lib/Either";
import { match } from "ts-pattern";
import { Regulation, RegulationEntite } from "../../Regulation.definitions";
import {
  DonneesEvaluees,
  ReponseDesigneOSE,
  ReponseLocalisation,
  TypeDonnees,
} from "./Reponse.definitions";

type ResultatDefinitif = {
  _tag: "ResultatDefinitif";
  resultat: RegulationEntite;
};

const reponseOseOui: ReponseDesigneOSE = {
  designeOperateurServiceEssentiel: "non",
};

const reponseLocalisation: ReponseLocalisation = {
  appartenancePaysUnionEuropeenne: "france",
};

type EtatReponseEnCours<
  E extends DonneesEvaluees,
  S extends DonneesEvaluees = DonneesEvaluees,
> = {
  etat: E;
  donnees: TypeDonnees<E>;
  suivant: EtatReponses<E, S>;
};
type EtatReponseFin = {
  etat: "Fin";
};
export type EtatReponses<
  E extends DonneesEvaluees,
  S extends DonneesEvaluees = DonneesEvaluees,
> = EtatReponseEnCours<E, S> | EtatReponseFin;

type Cons = <E extends DonneesEvaluees>(
  props: {
    donnees: TypeDonnees<E>;
    etat: E;
  },
  suivant: EtatReponseEnCours<DonneesEvaluees> | EtatReponseFin,
) => EtatReponseEnCours<E>;
export const fin = () => ({ etat: "Fin" as const });
export const cons: Cons = <E extends DonneesEvaluees>(
  {
    donnees,
    etat,
  }: {
    donnees: TypeDonnees<E>;
    etat: E;
  },
  suivant: EtatReponseEnCours<DonneesEvaluees> | EtatReponseFin,
) =>
  ({
    etat,
    donnees: donnees,
    suivant,
  }) as EtatReponseEnCours<E>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const suiteLogique = cons(
  { donnees: reponseOseOui, etat: "DesignationOperateurServiceEssentiel" },
  cons(
    { donnees: reponseLocalisation, etat: "AppartenancePaysUnionEuropeenne" },
    fin(),
  ),
);

type DonneesEvaluation<E extends DonneesEvaluees> = {
  _tag: "DonneesEvaluation";
  resultat: E;
  donnees: TypeDonnees<E>;
};

const fabriqueDonneesEvaluation = <E extends DonneesEvaluees>(
  resultat: E,
  donnees: TypeDonnees<E>,
): DonneesEvaluation<E> => ({
  _tag: "DonneesEvaluation",
  resultat,
  donnees,
});

type OperationTraitementReponse<
  Depuis extends DonneesEvaluees,
  Vers extends DonneesEvaluees,
> = (
  donneesReponses: Either<ResultatDefinitif, DonneesEvaluation<Depuis>>,
) => Either<ResultatDefinitif, DonneesEvaluation<Vers>>;

export type OperationQualifieLocalisation = OperationTraitementReponse<
  "AppartenancePaysUnionEuropeenne",
  "Structure"
>;
export type OperationQualifieDefinitionStructure = OperationTraitementReponse<
  "Structure",
  "SecteurActiviteComplet"
>;
export type OperationQualifieInformationsSecteur = OperationTraitementReponse<
  "SecteurActiviteComplet",
  "Fin"
>;

const definitivementRegule = () =>
  left<ResultatDefinitif>({
    _tag: "ResultatDefinitif",
    resultat: Regulation.Regule,
  });

const qualifieDesignationOse = (
  donneesReponses: Right<
    DonneesEvaluation<"DesignationOperateurServiceEssentiel">
  >,
) =>
  match(donneesReponses.right.donnees)
    .with({ designeOperateurServiceEssentiel: "oui" }, definitivementRegule)
    .otherwise(() =>
      right(
        fabriqueDonneesEvaluation(
          "AppartenancePaysUnionEuropeenne",
          reponseLocalisation, // TODO : donnees suivantes
        ),
      ),
    );

export const aguillageQualifieDesignationOse: OperationTraitementReponse<
  "DesignationOperateurServiceEssentiel",
  "AppartenancePaysUnionEuropeenne"
> = (donneesReponses) => {
  return match(donneesReponses)
    .when(isLeft, definitivementRegule)
    .when(isRight, qualifieDesignationOse)
    .exhaustive();
};
