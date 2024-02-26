import { match, P } from "ts-pattern";
import {
  certains,
  tous,
} from "../../../../../../utils/services/sets.operations";
import { fabriqueRegule } from "../../fabriques/Regulation.fabrique";
import {
  resultatIncertain,
  resultatNonRegule,
} from "../../Regulation.constantes";
import { TypeEntite } from "../../Regulation.definitions";
import { estActiviteInfrastructureNumeriqueAvecBesoinLocalisation } from "../Activite/Activite.predicats";
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
import { InformationSecteurLocalisable } from "./Reponse.definitions";
import { propReponseEtat } from "./Reponse.operations";
import {
  auMoinsUneActiviteListee,
  contientEnsembleAutresSecteurs,
  contientEnsembleSecteursNonEligiblesPetit,
  contientEnsembleSecteursRepresentantsLocalisesHorsFrancePetit,
  estInformationSecteurAvecActivitesEssentiellesGrand,
  estInformationsSecteurEligible,
  estSecteurBienLocaliseGrand,
  estSecteurBienLocalisePetit,
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

const fabriqueResultatEvaluationDefinitifCarSecteur = (
  reponse: ResultatEvaluationRegulationEnSuspens,
  typeEntite: TypeEntite,
) =>
  fabriqueResultatEvaluationDefinitif(
    "InformationsSecteur",
    fabriqueRegule(
      {
        ...propReponseEtat(reponse)("Structure"),
        ...propReponseEtat(reponse)("InformationsSecteur"),
      },
      typeEntite,
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
        InformationsSecteur: {
          secteurs: P.when(tous(estSecteurBienLocalisePetit)),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteEssentielle",
        ),
    )
    .with(
      {
        Structure: {
          _categorieTaille: "Grand",
        },
        InformationsSecteur: {
          secteurs: P.intersection(
            P.when(tous(estSecteurBienLocaliseGrand)),
            P.when(tous(estInformationSecteurAvecActivitesEssentiellesGrand)),
            P.when(
              tous((s) =>
                tous(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation)(
                  (s as InformationSecteurLocalisable<"Grand">).activites,
                ),
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteEssentielle",
        ),
    )
    .with(
      {
        Structure: {
          _categorieTaille: "Grand",
        },
        InformationsSecteur: {
          secteurs: P.when(tous(estSecteurBienLocaliseGrand)),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteImportante",
        ),
    )

    .with(
      {
        Structure: {
          _categorieTaille: "Grand",
        },
        InformationsSecteur: {
          secteurs: P.intersection(
            P.when(tous(estInformationsSecteurEligible)),
            P.when(certains(auMoinsUneActiviteListee)),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteImportante",
        ),
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
