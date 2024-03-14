import { match } from "ts-pattern";
import {
  et,
  non,
  ou,
} from "../../../../../../utils/services/predicats.operations";
import { certains } from "../../../../../../utils/services/sets.operations";
import { ValeursActivitesInfrastructureNumeriqueSansBesoinLocalisation } from "../../Activite.valeurs";
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
  auMoinsUneActiviteEstDans,
  auMoinsUneActiviteListee,
  certainsSontInfrastructureNumeriqueAvecActivite,
  contientDesActivitesInfrastructureNumeriqueEssentielles,
  estInformationSecteurImportantAvecBesoinLocalisation,
  estInformationSecteurSousSecteurAutre,
  estInformationsPourSecteur,
  estInformationsSecteurEligibleSansBesoinLocalisation,
  estSecteurBienLocaliseGrand,
  estSecteurBienLocaliseUE,
} from "./ReponseInformationsSecteur.predicats";

export const evalueRegulationEtatReponseInformationsSecteurEnSuspensMoyen = (
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
      ou(
        certainsSontInfrastructureNumeriqueAvecActivite(
          "prestataireServiceConfianceNonQualifie",
        ),
        certainsSontInfrastructureNumeriqueAvecActivite(
          "fournisseurPointEchangeInternet",
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteImportante,
        ),
    )
    .when(
      certains(
        et(
          estInformationsPourSecteur("infrastructureNumerique"),
          contientDesActivitesInfrastructureNumeriqueEssentielles,
          estSecteurBienLocaliseGrand,
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteEssentielle,
        ),
    )
    .when(
      certains(
        et(
          estInformationsPourSecteur("infrastructureNumerique"),
          contientDesActivitesInfrastructureNumeriqueEssentielles,
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
          estInformationsPourSecteur("infrastructureNumerique"),
          auMoinsUneActiviteEstDans(
            ValeursActivitesInfrastructureNumeriqueSansBesoinLocalisation,
          ),
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteImportante,
        ),
    )
    .when(
      certains(
        et(
          estInformationSecteurImportantAvecBesoinLocalisation,
          estSecteurBienLocaliseGrand,
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteImportante,
        ),
    )
    .when(
      certains(
        et(
          estInformationSecteurImportantAvecBesoinLocalisation,
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
          estInformationsSecteurEligibleSansBesoinLocalisation,
          non(estInformationSecteurSousSecteurAutre),
          auMoinsUneActiviteListee,
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          "EntiteImportante",
        ),
    )
    .otherwise(() =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatNonRegule,
      ),
    );
