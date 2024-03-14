import { isMatching, match, P } from "ts-pattern";
import {
  et,
  non,
  ou,
} from "../../../../../../utils/services/predicats.operations";
import {
  certains,
  tous,
} from "../../../../../../utils/services/sets.operations";
import { Activite } from "../../Activite.definitions";
import { ValeursActivitesInfrastructureNumeriqueSansBesoinLocalisation } from "../../Activite.valeurs";
import {
  resultatIncertainAutrePaysUE,
  resultatNonRegule,
} from "../../Regulation.constantes";
import { resultatEstDefinitif } from "./EtatRegulation.constantes";
import {
  EtatEvaluationEnSuspens,
  EtatRegulation,
} from "./EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationDefinitif,
  fabriqueResultatEvaluationDefinitifCarSecteur,
  propageDonneesEvaluees,
  propageResultatIncertainEnSuspens,
} from "./EtatRegulation.fabriques";
import { ReponseEtatInformationsSecteur } from "./ReponseEtat.definitions";
import {
  auMoinsUneActiviteEstDans,
  auMoinsUneActiviteListee,
  contientActivitesInfrastructureNumeriqueEligiblesPetitEntite,
  contientDesActivitesInfrastructureNumeriqueEssentielles,
  estInformationSecteurAvecActivitesEssentielles,
  estInformationSecteurImportantAvecBesoinLocalisation,
  estInformationSecteurSecteurAutre,
  estInformationSecteurSousSecteurAutre,
  estInformationsPourSecteur,
  estInformationsSecteurEligibleSansBesoinLocalisation,
  estSecteurAnnexe1,
  estSecteurAvecActivitesEssentiellesBienLocalisees,
  estSecteurBienLocaliseGrand,
  estSecteurBienLocaliseHorsFrance,
  estSecteurBienLocaliseUE,
} from "./ReponseInformationsSecteur.predicats";
import { TypeEntite as TE } from "../../Regulation.definitions";

const certainsSontInfrastructureNumeriqueAvecActivite = (
  activiteCherchee: Activite,
) =>
  certains(
    isMatching({
      secteurActivite: "infrastructureNumerique",
      activites: P.when(
        certains<Activite>((a) => a === activiteCherchee) as (
          a: Set<Activite>,
        ) => a is Set<Activite>,
      ),
    }),
  );
export const evalueRegulationEtatReponseInformationsSecteurEnSuspensPetit = (
  reponse: EtatEvaluationEnSuspens & ReponseEtatInformationsSecteur,
): EtatRegulation =>
  match(reponse.InformationsSecteur.secteurs)
    .when(
      certainsSontInfrastructureNumeriqueAvecActivite(
        "prestataireServiceConfianceQualifie",
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteEssentielle,
        ),
    )
    .when(
      certainsSontInfrastructureNumeriqueAvecActivite(
        "prestataireServiceConfianceNonQualifie",
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteImportante,
        ),
    )
    .when(tous(estSecteurAvecActivitesEssentiellesBienLocalisees), () =>
      fabriqueResultatEvaluationDefinitifCarSecteur(
        reponse,
        TE.EntiteEssentielle,
      ),
    )
    .when(
      certains(
        et(
          estInformationSecteurAvecActivitesEssentielles,
          estSecteurBienLocaliseUE,
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatIncertainAutrePaysUE,
        ),
    )
    .when(
      certains(
        et(
          estInformationSecteurAvecActivitesEssentielles,
          contientActivitesInfrastructureNumeriqueEligiblesPetitEntite,
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteEssentielle,
        ),
    )
    .when(tous(estSecteurBienLocaliseHorsFrance), () =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatNonRegule,
      ),
    )
    .when(tous(estInformationSecteurAvecActivitesEssentielles), () =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatNonRegule,
      ),
    )
    .otherwise(() =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatNonRegule,
      ),
    );

export const evalueRegulationEtatReponseInformationsSecteurEnSuspensMoyen = (
  reponse: EtatEvaluationEnSuspens,
): EtatRegulation =>
  match(reponse)
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsPourSecteur("infrastructureNumerique"),
                contientDesActivitesInfrastructureNumeriqueEssentielles,
                estSecteurBienLocaliseGrand,
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteEssentielle,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsPourSecteur("infrastructureNumerique"),
                contientDesActivitesInfrastructureNumeriqueEssentielles,
                estSecteurBienLocaliseUE,
              ),
            ),
          ),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatIncertainAutrePaysUE,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsPourSecteur("infrastructureNumerique"),
                auMoinsUneActiviteEstDans(
                  ValeursActivitesInfrastructureNumeriqueSansBesoinLocalisation,
                ),
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteImportante,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationSecteurImportantAvecBesoinLocalisation,
                estSecteurBienLocaliseGrand,
              ),
            ),
          ),
        },
      },
      (reponse) =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteImportante,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationSecteurImportantAvecBesoinLocalisation,
                estSecteurBienLocaliseUE,
              ),
            ),
          ),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatIncertainAutrePaysUE,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsSecteurEligibleSansBesoinLocalisation,
                non(estInformationSecteurSousSecteurAutre),
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
    .otherwise(propageResultatIncertainEnSuspens("InformationsSecteur"));
export const evalueRegulationEtatReponseInformationsSecteurEnSuspensGrand = (
  reponse: EtatEvaluationEnSuspens,
): EtatRegulation =>
  match(reponse)
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsPourSecteur("infrastructureNumerique"),
                contientDesActivitesInfrastructureNumeriqueEssentielles,
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
                estInformationsPourSecteur("infrastructureNumerique"),
                contientDesActivitesInfrastructureNumeriqueEssentielles,
                estSecteurBienLocaliseUE,
              ),
            ),
          ),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatIncertainAutrePaysUE,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsPourSecteur("infrastructureNumerique"),
                auMoinsUneActiviteEstDans(
                  ValeursActivitesInfrastructureNumeriqueSansBesoinLocalisation,
                ),
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
                estInformationSecteurImportantAvecBesoinLocalisation,
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
                estInformationSecteurImportantAvecBesoinLocalisation,
                estSecteurBienLocaliseUE,
              ),
            ),
          ),
        },
      },
      () =>
        fabriqueResultatEvaluationDefinitif(
          "InformationsSecteur",
          resultatIncertainAutrePaysUE,
        ),
    )
    .with(
      {
        InformationsSecteur: {
          secteurs: P.when(
            certains(
              et(
                estInformationsSecteurEligibleSansBesoinLocalisation,
                estSecteurAnnexe1,
                non(estInformationSecteurSousSecteurAutre),
                auMoinsUneActiviteListee,
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
                estInformationsSecteurEligibleSansBesoinLocalisation,
                non(estInformationSecteurSousSecteurAutre),
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
    .otherwise(propageResultatIncertainEnSuspens("InformationsSecteur"));

export const evalueRegulationEtatReponseInformationsSecteurEnSuspens = (
  reponse: EtatEvaluationEnSuspens & ReponseEtatInformationsSecteur,
): EtatRegulation =>
  match(reponse.Structure._categorieTaille)
    .with("Petit", () =>
      evalueRegulationEtatReponseInformationsSecteurEnSuspensPetit(reponse),
    )
    .with("Moyen", () =>
      evalueRegulationEtatReponseInformationsSecteurEnSuspensMoyen(reponse),
    )
    .with("Grand", () =>
      evalueRegulationEtatReponseInformationsSecteurEnSuspensGrand(reponse),
    )
    .exhaustive();

export const evalueRegulationEtatReponseInformationsSecteur = (
  reponse: EtatRegulation,
): EtatRegulation =>
  match(reponse)
    .with(resultatEstDefinitif, propageDonneesEvaluees("InformationsSecteur"))
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
        decision: "Incertain",
        _resultatEvaluationRegulation: "EnSuspens",
      },
      (reponse) =>
        evalueRegulationEtatReponseInformationsSecteurEnSuspens(
          reponse as EtatEvaluationEnSuspens & ReponseEtatInformationsSecteur,
        ),
    )
    .otherwise(propageResultatIncertainEnSuspens("InformationsSecteur"));
