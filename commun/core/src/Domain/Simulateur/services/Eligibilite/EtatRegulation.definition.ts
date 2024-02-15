import { Left, left, Right, right } from "fp-ts/lib/Either";
import { match } from "ts-pattern";
import { Tag } from "../../../../../../utils/types/Tag";
import { resultatReguleOSE } from "../../fabriques/Regulation.fabrique";
import { resultatIncertain } from "../../Regulation.constantes";
import {
  Regulation,
  RegulationEntite,
  ResultatRegulationEntite,
} from "../../Regulation.definitions";
import {
  DonneesCompletesEvaluees,
  DonneesEvaluees,
  ReponseEtatDesignationOperateurServicesEssentiels,
  ReponseLocalisation,
  TypeDonnees,
  UnionReponseEtat,
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

export type EtatEvaluation = {
  etapeEvaluee: DonneesCompletesEvaluees;
};

export type ResultatEvaluationRegulationDefinitif = Tag<
  "Definitif",
  "ResultatEvaluationRegulation"
> &
  EtatEvaluation &
  ResultatRegulationEntite;

export type ResultatEvaluationRegulationEnSuspens = Tag<
  "EnSuspens",
  "ResultatEvaluationRegulation"
> &
  EtatEvaluation &
  ResultatRegulationEntite &
  UnionReponseEtat;

export type ResultatEvaluationRegulationInconnu = Tag<
  "Inconnu",
  "ResultatEvaluationRegulation"
> &
  EtatEvaluation &
  UnionReponseEtat;

export type ResultatEvaluationRegulation =
  | ResultatEvaluationRegulationDefinitif
  | ResultatEvaluationRegulationEnSuspens
  | ResultatEvaluationRegulationInconnu;

const fabriqueResultatEvaluationEnSuspens = (
  etapeEvaluee: DonneesCompletesEvaluees,
  resulat: ResultatRegulationEntite,
  reponse: UnionReponseEtat,
): ResultatEvaluationRegulationEnSuspens => ({
  ResultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee,
  ...resulat,
  ...reponse,
});

const fabriqueResultatEvaluationDefinitif = (
  etapeEvaluee: DonneesCompletesEvaluees,
  resulat: ResultatRegulationEntite,
): ResultatEvaluationRegulationDefinitif => ({
  ResultatEvaluationRegulation: "Definitif",
  etapeEvaluee,
  ...resulat,
});

const fabriqueResultatEvaluationReguleOse =
  (): ResultatEvaluationRegulationDefinitif =>
    fabriqueResultatEvaluationDefinitif(
      "DesignationOperateurServicesEssentiels",
      resultatReguleOSE,
    );
const fabriqueResultatEnSuspensOse =
  (reponse: ReponseEtatDesignationOperateurServicesEssentiels) =>
  (): ResultatEvaluationRegulationEnSuspens =>
    fabriqueResultatEvaluationEnSuspens(
      "DesignationOperateurServicesEssentiels",
      resultatIncertain,
      reponse,
    );

export const evalueRegulationEtatReponseOse = (
  reponse: ReponseEtatDesignationOperateurServicesEssentiels,
): ResultatEvaluationRegulation =>
  match(reponse.DesignationOperateurServicesEssentiels)
    .with(
      {
        designationOperateurServicesEssentiels: "oui",
      },
      fabriqueResultatEvaluationReguleOse,
    )
    .otherwise(fabriqueResultatEnSuspensOse(reponse));
