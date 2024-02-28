import { flow } from "fp-ts/lib/function";
import { match, P } from "ts-pattern";
import { et, ou } from "../../../../../../utils/services/predicats.operations";
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
import { EtatEvaluationActives } from "./EtatEvaluation.definitions";
import {
  ResultatEvaluationRegulation,
  ResultatEvaluationRegulationDefinitif,
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
  auMoinsUneActiviteListee,
  contientActivitesInfrastructureNumeriqueEligiblesPetitEntite,
  contientActivitesListees,
  contientDesActivitesEssentielles,
  estInformationSecteurAvecActivitesEssentielles,
  estInformationSecteurAvecBesoinLocalisation,
  estInformationSecteurSecteurAutre,
  estInformationSecteurSousSecteurAutre,
  estInformationsSecteurEligibleSansBesoinLocalisation,
  estSecteurBienLocaliseGrand,
  estSecteurBienLocaliseHorsFrance,
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
          designationOperateurServicesEssentiels: "non",
        },
      },
      fabriqueResultatEnSuspensOse(reponse),
    )
    .with(
      {
        DesignationOperateurServicesEssentiels: {
          designationOperateurServicesEssentiels: "nsp",
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "DesignationOperateurServicesEssentiels",
          resultatIncertain,
        ),
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
    .otherwise(() =>
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
    .with(
      {
        _resultatEvaluationRegulation: "EnSuspens",
        Structure: { typeStructure: "publique" },
      },
      () => fabriqueResultatEvaluationDefinitif("Structure", resultatIncertain),
    )
    .otherwise(() =>
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

export const evalueRegulationEtatReponseInformationsSecteurEnSuspensPetit = (
  reponse: ResultatEvaluationRegulationEnSuspens,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
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
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationSecteurAvecActivitesEssentielles,
                contientActivitesInfrastructureNumeriqueEligiblesPetitEntite,
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
        InformationsSecteur: {
          secteurs: P.when(tous(estSecteurBienLocaliseHorsFrance)),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            tous(estInformationSecteurAvecActivitesEssentielles),
          ),
        },
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
    .otherwise(() =>
      fabriqueResultatEvaluationEnSuspens(
        "InformationsSecteur",
        resultatIncertain,
        reponse,
      ),
    );
export const evalueRegulationEtatReponseInformationsSecteurEnSuspensGrand = (
  reponse: ResultatEvaluationRegulationEnSuspens,
): ResultatEvaluationRegulation =>
  match(reponse)
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationSecteurAvecActivitesEssentielles,
                contientDesActivitesEssentielles,
                estSecteurBienLocaliseGrand,
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
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationSecteurAvecActivitesEssentielles,
                contientActivitesListees,
                estSecteurBienLocaliseGrand,
              ),
            ),
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
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationSecteurAvecBesoinLocalisation,
                estSecteurBienLocaliseGrand,
              ),
            ),
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
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsSecteurEligibleSansBesoinLocalisation,
                auMoinsUneActiviteListee,
              ),
            ),
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
        _resultatEvaluationRegulation: "EnSuspens",
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatNonRegule,
        ),
    )
    .otherwise(() =>
      fabriqueResultatEvaluationEnSuspens(
        "InformationsSecteur",
        resultatIncertain,
        reponse,
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
      },
      evalueRegulationEtatReponseInformationsSecteurEnSuspensPetit,
    )
    .with(
      {
        Structure: {
          _categorieTaille: "Grand",
        },
      },
      evalueRegulationEtatReponseInformationsSecteurEnSuspensGrand,
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
    .otherwise(() =>
      fabriqueResultatEvaluationEnSuspens(
        "InformationsSecteur",
        resultatIncertain,
        reponse,
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
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            tous(
              ou(
                estInformationSecteurSecteurAutre,
                estInformationSecteurSousSecteurAutre,
              ),
            ),
          ),
        },
      },
      () =>
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
    .otherwise(() =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatIncertain,
      ),
    );

export const evalueEtatRegulation: (
  reponse: ResultatEvaluationRegulation,
) => ResultatEvaluationRegulationDefinitif = flow(
  evalueRegulationEtatReponseOse,
  evalueRegulationEtatReponseLocalisation,
  evalueRegulationEtatReponseStructure,
  evalueRegulationEtatReponseInformationsSecteur,
) as (
  reponse: ResultatEvaluationRegulation,
) => ResultatEvaluationRegulationDefinitif;
