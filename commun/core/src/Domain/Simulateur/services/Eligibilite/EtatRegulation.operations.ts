import { match, P } from "ts-pattern";
import { VVV } from "../../../utilitaires/debug";
import { fabriqueRegule } from "../../fabriques/Regulation.fabrique";
import {
  resultatIncertain,
  resultatNonRegule,
} from "../../Regulation.constantes";
import { EtatEvaluationActives } from "./EtatEvaluation.definitions";
import {
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationEnSuspens,
} from "./EtatRegulation.definitions";
import {
  fabriqueResultatEnSuspensOse,
  fabriqueResultatEvaluationDefinitif,
  fabriqueResultatEvaluationEnSuspens,
  fabriqueResultatEvaluationReguleOse,
} from "./EtatRegulation.fabriques";
import { propReponseEtat } from "./Reponse.operations";
import {
  contientEnsembleAutresSecteurs,
  contientEnsembleSecteursEtActiviteListeesListesSansRepresantGrand,
  contientEnsembleSecteursNonEligiblesGrand,
  contientEnsembleSecteursNonEligiblesPetit,
  contientEnsembleSecteursRepresentantsLocalisesFranceGrand,
  contientEnsembleSecteursRepresentantsLocalisesFrancePetit,
  contientEnsembleSecteursRepresentantsLocalisesHorsFrancePetit,
} from "./Reponse.predicats";

const propageDonneesEvaluees =
  (etape: EtatEvaluationActives) =>
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
          designationOperateurServicesEssentiels: P.union("non", "nsp"),
        },
      },
      fabriqueResultatEnSuspensOse(reponse),
    )
    .otherwise(fabriqueResultatEnSuspensOse(reponse));
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

export const evalueRegulationEtatReponseInformationsSecteurEnSuspens = (
  reponse: ResultatEvaluationRegulationEnSuspens,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        Structure: {
          _categorieTaille: "Petit",
        },
        InformationsSecteur: P.when(
          contientEnsembleSecteursRepresentantsLocalisesFrancePetit,
        ),
      },
      (reponse) => {
        VVV("Cas 1");
        return fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          fabriqueRegule(
            {
              ...propReponseEtat(reponse)("Structure"),
              ...propReponseEtat(reponse)("InformationsSecteur"),
            },
            "EntiteEssentielle",
          ),
        );
      },
    )
    .with(
      {
        Structure: {
          _categorieTaille: "Grand",
        },
        InformationsSecteur: P.intersection(
          P.when(contientEnsembleSecteursRepresentantsLocalisesFranceGrand),
          P.when(contientEnsembleSecteursNonEligiblesGrand),
        ),
      },
      (reponse) => {
        VVV("Cas 2");

        return fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          fabriqueRegule(
            {
              ...propReponseEtat(reponse)("Structure"),
              ...propReponseEtat(reponse)("InformationsSecteur"),
            },
            "EntiteEssentielle",
          ),
        );
      },
    )
    .with(
      {
        Structure: {
          _categorieTaille: "Grand",
        },
        InformationsSecteur: P.when(
          contientEnsembleSecteursRepresentantsLocalisesFranceGrand,
        ),
      },
      (reponse) => {
        VVV("Cas 3");

        return fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          fabriqueRegule(
            {
              ...propReponseEtat(reponse)("Structure"),
              ...propReponseEtat(reponse)("InformationsSecteur"),
            },
            "EntiteImportante",
          ),
        );
      },
    )

    .with(
      {
        Structure: {
          _categorieTaille: "Grand",
        },
        InformationsSecteur: P.when(
          contientEnsembleSecteursEtActiviteListeesListesSansRepresantGrand,
        ),
      },
      (reponse) => {
        VVV("Cas 4");
        return fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          fabriqueRegule(
            {
              ...propReponseEtat(reponse)("Structure"),
              ...propReponseEtat(reponse)("InformationsSecteur"),
            },
            "EntiteImportante",
          ),
        );
      },
    )
    .with(
      {
        Structure: {
          _categorieTaille: "Petit",
        },
        InformationsSecteur: P.when(
          contientEnsembleSecteursRepresentantsLocalisesHorsFrancePetit,
        ),
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .with(
      {
        InformationsSecteur: P.when(contientEnsembleSecteursNonEligiblesPetit),
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .with(
      {
        _resultatEvaluationRegulation: "EnSuspens",
      },
      () =>
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
    .with(
      {
        _tag: "InformationsSecteur",
        decision: "Incertain",
        _resultatEvaluationRegulation: "EnSuspens",
      },
      evalueRegulationEtatReponseInformationsSecteurEnSuspens,
    )

    .otherwise(
      (): ResultatEvaluationRegulationEnSuspens =>
        fabriqueResultatEvaluationEnSuspens(
          "InformationsSecteur",
          resultatIncertain,
          reponse as ResultatEvaluationRegulationEnSuspens,
        ),
    );
