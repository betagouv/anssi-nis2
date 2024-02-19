import { P, match } from "ts-pattern";
import { ens } from "../../../../../../utils/services/sets.operations";
import {
  resultatIncertain,
  resultatNonRegule,
} from "../../Regulation.constantes";
import {
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationAvecReponses,
  ResultatEvaluationRegulationEnSuspens,
} from "./EtatRegulation.definition";
import {
  fabriqueResultatEnSuspensOse,
  fabriqueResultatEvaluationDefinitif,
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationReguleOse,
} from "./EtatRegulation.fabriques";
import {
  DonneesCompletesEvaluees,
  InformationSecteurPossibleGrand,
  InformationSecteurPossiblePetit,
  ReponseEtatInformationsSecteur,
} from "./Reponse.definitions";

const propageDonneesEvaluees =
  (etape: DonneesCompletesEvaluees) =>
  (reponse: ResultatEvaluationRegulation) => ({
    ...reponse,
    etapeEvaluee: etape,
  });
export const evalueRegulationEtatReponseOse = (
  reponse: ResultatEvaluationRegulation,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
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
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("AppartenancePaysUnionEuropeenne"),
    )
    .with(
      {
        AppartenancePaysUnionEuropeenne: {
          appartenancePaysUnionEuropeenne: P.not("france"),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "AppartenancePaysUnionEuropeenne",
          resultatIncertain,
        ),
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
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("Structure"),
    )
    .otherwise(
      (): ResultatEvaluationRegulationEnSuspens =>
        fabriqueResultatEvaluationEnSuspens(
          "Structure",
          resultatIncertain,
          reponse as ResultatEvaluationRegulationEnSuspens,
        ),
    );

const eqSet = <T>(xs: Set<T>, ys: Set<T>) =>
  xs.size === ys.size && [...xs].every((x) => ys.has(x));
export const ensembleAutreSecteur: Set<
  InformationSecteurPossiblePetit | InformationSecteurPossibleGrand
> = ens({
  secteurActivite: "autreSecteurActivite",
});
export const estEnsembleAutresSecteurs = (
  e: Set<InformationSecteurPossiblePetit | InformationSecteurPossibleGrand>,
) => eqSet(e, ensembleAutreSecteur);

export const estReponseEtatInformationsSecteur = (
  resultat: ResultatEvaluationRegulation | ReponseEtatInformationsSecteur,
): resultat is ReponseEtatInformationsSecteur =>
  "_tag" in resultat && resultat._tag === "InformationsSecteur";

export const contientEnsembleAutresSecteurs = (
  info: ResultatEvaluationRegulation,
) =>
  estReponseEtatInformationsSecteur(info) &&
  [...info.InformationsSecteur.secteurs].every(
    (sec) => sec.secteurActivite === "autreSecteurActivite",
  );

export const evalueRegulationEtatReponseInformationsSecteur = (
  reponse: ResultatEvaluationRegulation,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        _resultatEvaluationRegulation: "Definitif",
      },
      propageDonneesEvaluees("InformationsSecteur"),
    )
    .when(contientEnsembleAutresSecteurs, () =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatNonRegule,
      ),
    )
    .otherwise(
      (): ResultatEvaluationRegulationEnSuspens =>
        fabriqueResultatEvaluationEnSuspens(
          "InformationsSecteur",
          resultatIncertain,
          reponse as ResultatEvaluationRegulationEnSuspens,
        ),
    );
