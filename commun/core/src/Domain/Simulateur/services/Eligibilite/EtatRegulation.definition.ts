import { match } from "ts-pattern";
import { Tag } from "../../../../../../utils/types/Tag";
import { resultatReguleOSE } from "../../fabriques/Regulation.fabrique";
import { resultatIncertain } from "../../Regulation.constantes";
import { ResultatRegulationEntite } from "../../Regulation.definitions";
import {
  DonneesCompletesEvaluees,
  UnionReponseEtatNonVide,
} from "./Reponse.definitions";

export type EtatEvaluation = {
  etapeEvaluee: DonneesCompletesEvaluees | "NonEvalue";
};

export type ResultatEvaluationRegulationDefinitif = Tag<
  "Definitif",
  "ResultatEvaluationRegulation"
> &
  EtatEvaluation &
  ResultatRegulationEntite;

type ResultatEvaluationRegulationAvecReponses = EtatEvaluation &
  UnionReponseEtatNonVide;
export type ResultatEvaluationRegulationEnSuspens = Tag<
  "EnSuspens",
  "ResultatEvaluationRegulation"
> &
  ResultatRegulationEntite &
  ResultatEvaluationRegulationAvecReponses;

export type ResultatEvaluationRegulationInconnu = Tag<
  "Inconnu",
  "ResultatEvaluationRegulation"
> &
  ResultatEvaluationRegulationAvecReponses;

export type ResultatEvaluationRegulation =
  | ResultatEvaluationRegulationDefinitif
  | ResultatEvaluationRegulationEnSuspens
  | ResultatEvaluationRegulationInconnu;

const fabriqueResultatEvaluationEnSuspens = (
  etapeEvaluee: DonneesCompletesEvaluees,
  resulat: ResultatRegulationEntite,
  reponse: UnionReponseEtatNonVide,
): ResultatEvaluationRegulationEnSuspens => ({
  ...resulat,
  ...reponse,
  ResultatEvaluationRegulation: "EnSuspens",
  etapeEvaluee,
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
  (reponse: ResultatEvaluationRegulationAvecReponses) =>
  (): ResultatEvaluationRegulationEnSuspens =>
    fabriqueResultatEvaluationEnSuspens(
      "DesignationOperateurServicesEssentiels",
      resultatIncertain,
      reponse,
    );

const propageDonneesEvaluees =
  (etape: DonneesCompletesEvaluees) =>
  (reponse: ResultatEvaluationRegulation) => ({
    ...reponse,
    etapeEvaluee: etape,
  });

export type OperationEvalueEtape = (
  reponse: ResultatEvaluationRegulation,
) => ResultatEvaluationRegulation;

export const evalueRegulationEtatReponseOse = (
  reponse: ResultatEvaluationRegulation,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        ResultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("DesignationOperateurServicesEssentiels"),
    )
    .with(
      {
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "oui",
        },
      },
      fabriqueResultatEvaluationReguleOse,
    )
    .with(
      {
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "non",
        },
      },
      fabriqueResultatEnSuspensOse(
        reponse as ResultatEvaluationRegulationAvecReponses,
      ),
    )
    .otherwise(
      fabriqueResultatEnSuspensOse(
        reponse as ResultatEvaluationRegulationAvecReponses,
      ),
    );
export const evalueRegulationEtatReponseLocalisation = (
  reponse: ResultatEvaluationRegulation,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        ResultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("AppartenancePaysUnionEuropeenne"),
    )
    .otherwise(
      (): ResultatEvaluationRegulationEnSuspens =>
        fabriqueResultatEvaluationEnSuspens(
          "AppartenancePaysUnionEuropeenne",
          resultatIncertain,
          reponse as ResultatEvaluationRegulationEnSuspens,
        ),
    );
export const evalueRegulationEtatReponseStructure = (
  reponse: ResultatEvaluationRegulation,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        ResultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("Structure"),
    )
    .otherwise(
      (): ResultatEvaluationRegulationEnSuspens =>
        fabriqueResultatEvaluationEnSuspens(
          "AppartenancePaysUnionEuropeenne",
          resultatIncertain,
          reponse as ResultatEvaluationRegulationEnSuspens,
        ),
    );
