import { match } from "ts-pattern";
import { et } from "../../../../../../utils/services/predicats.operations";
import {
  certains,
  tous,
} from "../../../../../../utils/services/sets.operations";
import {
  resultatIncertainAutrePaysUE,
  resultatNonRegule,
} from "../../Regulation.constantes";
import { TypeEntite as TE } from "../../Regulation.definitions";
import {
  EtatEvaluationEnSuspens,
  EtatRegulation,
} from "./EtatRegulation.definitions";
import {
  fabriqueResultatEvaluationDefinitif,
  fabriqueResultatEvaluationDefinitifCarSecteur,
} from "./EtatRegulation.fabriques";
import { ReponseEtatInformationsSecteur } from "./ReponseEtat.definitions";
import {
  certainsSontInfrastructureNumeriqueAvecActivite,
  contientActivitesInfrastructureNumeriqueEligiblesPetitEntite,
  estInformationSecteurAvecActivitesEssentielles,
  estSecteurAvecActivitesEssentiellesBienLocalisees,
  estSecteurBienLocaliseHorsFrance,
  estSecteurBienLocaliseUE,
} from "./ReponseInformationsSecteur.predicats";

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
