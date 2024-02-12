import {
  Either,
  isLeft,
  isRight,
  Left,
  left,
  Right,
  right,
} from "fp-ts/lib/Either";
import { match } from "ts-pattern";
import { Regulation, RegulationEntite } from "../../Regulation.definitions";
import {
  DonneesCompletesEvaluees,
  DonneesEvaluees,
  ReponseLocalisation,
  TypeDonnees,
} from "./Reponse.definitions";

export type ResultatDefinitif = {
  _tag: "ResultatDefinitif";
  resultat: RegulationEntite;
};

const reponseLocalisation: ReponseLocalisation = {
  appartenancePaysUnionEuropeenne: "france",
};

type EtatReponseEnCours<
  E extends DonneesCompletesEvaluees,
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
  E extends DonneesCompletesEvaluees,
  S extends DonneesEvaluees = DonneesEvaluees,
> = EtatReponseEnCours<E, S> | EtatReponseFin;

export type EtatReponseEnCoursProps<E extends DonneesCompletesEvaluees> = {
  donnees: TypeDonnees<E>;
  etat: E;
};
export type Cons = <E extends DonneesCompletesEvaluees>(
  props: EtatReponseEnCoursProps<E>,
  suivant: EtatReponseEnCours<DonneesCompletesEvaluees> | EtatReponseFin,
) => EtatReponseEnCours<E>;
export const fin = () => ({ etat: "Fin" as const });
export const cons: Cons = <E extends DonneesCompletesEvaluees>(
  {
    donnees,
    etat,
  }: {
    donnees: TypeDonnees<E>;
    etat: E;
  },
  suivant: EtatReponseEnCours<DonneesCompletesEvaluees> | EtatReponseFin,
) =>
  ({
    etat,
    donnees: donnees,
    suivant,
  }) as EtatReponseEnCours<E>;

type DonneesEvaluation<E extends DonneesCompletesEvaluees> = {
  _tag: "DonneesEvaluation";
  resultat: E;
  donnees: TypeDonnees<E>;
};

export const fabriqueDonneesEvaluation = <E extends DonneesCompletesEvaluees>(
  resultat: E,
  donnees: TypeDonnees<E>,
): DonneesEvaluation<E> => ({
  _tag: "DonneesEvaluation",
  resultat,
  donnees,
});

export type AiguillageDonneesReponses<Depuis extends DonneesEvaluees> =
  Depuis extends DonneesCompletesEvaluees
    ? Either<DonneesEvaluation<Depuis>, ResultatDefinitif>
    : Either<EtatReponseFin, ResultatDefinitif>;

export type QualificationDonneesReponses<
  Depuis extends DonneesCompletesEvaluees,
> = Left<DonneesEvaluation<Depuis>>;

export type QualificationResultatDefinitif = Right<ResultatDefinitif>;

export const fabriqueAiguillageDonneesEvaluation = <
  E extends DonneesCompletesEvaluees,
>(
  resultat: E,
  donnees: TypeDonnees<E>,
): QualificationDonneesReponses<E> =>
  left(
    fabriqueDonneesEvaluation(resultat, donnees),
  ) as QualificationDonneesReponses<E>;

type OperationTraitementReponse<
  Depuis extends DonneesCompletesEvaluees,
  Vers extends DonneesEvaluees,
> = (
  donneesReponses: AiguillageDonneesReponses<Depuis>,
) => AiguillageDonneesReponses<Vers>;

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

export const definitivementRegule = () =>
  right({
    _tag: "ResultatDefinitif",
    resultat: Regulation.Regule,
  }) as QualificationResultatDefinitif;

export const qualifieDesignationOse = (
  donneesReponses: QualificationDonneesReponses<"DesignationOperateurServicesEssentiels">,
) =>
  match(donneesReponses.left.donnees)
    .with(
      { designationOperateurServicesEssentiels: "oui" },
      definitivementRegule,
    )
    .otherwise(() =>
      left(
        fabriqueDonneesEvaluation(
          "AppartenancePaysUnionEuropeenne",
          reponseLocalisation, // TODO : donnees suivantes
        ),
      ),
    );

export const aguillageQualifieDesignationOse: OperationTraitementReponse<
  "DesignationOperateurServicesEssentiels",
  "AppartenancePaysUnionEuropeenne"
> = (donneesReponses) => {
  return match(donneesReponses)
    .when(isLeft, qualifieDesignationOse)
    .when(isRight, definitivementRegule)
    .exhaustive();
};
