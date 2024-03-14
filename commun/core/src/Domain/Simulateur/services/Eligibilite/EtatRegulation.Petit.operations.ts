import { match } from "ts-pattern";
import { prop } from "../../../../../../utils/services/objects.operations";
import { et, ou } from "../../../../../../utils/services/predicats.operations";
import {
  certains,
  tous,
} from "../../../../../../utils/services/sets.operations";
import { AppartenancePaysUnionEuropeenne } from "../../ChampsSimulateur.definitions";
import { resultatNonRegule } from "../../Regulation.constantes";
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
import { RepInfoSecteur } from "./ReponseInformationsSecteur.definitions";
import {
  certainsSontInfrastructureNumeriqueAvecActivite,
  estEtablissementPrincipalFrance,
  estInformationSecteurAvecActivitesEssentielles,
} from "./ReponseInformationsSecteur.predicats";
import { flow } from "fp-ts/lib/function";

export const evalueRegulationEtatReponseInformationsSecteurEnSuspensPetit = (
  reponse: EtatEvaluationEnSuspens & ReponseEtatInformationsSecteur<"Petit">,
): EtatRegulation =>
  match(reponse.InformationsSecteur.secteurs)
    .when(
      et(
        certainsSontInfrastructureNumeriqueAvecActivite(
          "fournisseurReseauxCommunicationElectroniquesPublics",
          "fournisseurServiceCommunicationElectroniquesPublics",
        ),
        certains(
          flow(
            prop("localisationFournitureServicesNumeriques"),
            (loc: Set<AppartenancePaysUnionEuropeenne>) => loc.has("france"),
          ) as (element: RepInfoSecteur<"Petit">) => boolean,
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteImportante,
        ),
    )
    .when(
      et(
        certainsSontInfrastructureNumeriqueAvecActivite(
          "fournisseurReseauxCommunicationElectroniquesPublics",
          "fournisseurServiceCommunicationElectroniquesPublics",
        ),
        certains(
          flow(
            prop("localisationFournitureServicesNumeriques"),
            (loc: Set<AppartenancePaysUnionEuropeenne>) => loc.has("autre"),
          ) as (element: RepInfoSecteur<"Petit">) => boolean,
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.AutreEtatMembreUE,
        ),
    )
    .when(
      et(
        certainsSontInfrastructureNumeriqueAvecActivite(
          "fournisseurServicesDNS",
          "registresNomsDomainesPremierNiveau",
        ),
        certains<RepInfoSecteur<"Petit">>(estEtablissementPrincipalFrance),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteEssentielle,
        ),
    )
    .when(
      et(
        ou(
          certainsSontInfrastructureNumeriqueAvecActivite(
            "fournisseurServicesDNS",
            "registresNomsDomainesPremierNiveau",
          ),
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.AutreEtatMembreUE,
        ),
    )
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
    // .when(tous(estSecteurAvecActivitesEssentiellesBienLocalisees), () =>
    //   fabriqueResultatEvaluationDefinitifCarSecteur(
    //     reponse,
    //     TE.EntiteEssentielle,
    //   ),
    // )
    // .when(
    //   certains(
    //     et(
    //       estInformationSecteurAvecActivitesEssentielles<"Petit">,
    //       estSecteurBienLocaliseUE,
    //     ),
    //   ),
    //   () =>
    //     fabriqueResultatEvaluationDefinitif(
    //       "InformationsSecteur",
    //       resultatIncertainAutrePaysUE,
    //     ),
    // )
    // .when(
    //   certains(
    //     et(
    //       estInformationSecteurAvecActivitesEssentielles,
    //       contientActivitesInfrastructureNumeriqueEligiblesPetitEntite,
    //     ),
    //   ),
    //   () =>
    //     fabriqueResultatEvaluationDefinitifCarSecteur(
    //       reponse,
    //       TE.EntiteEssentielle,
    //     ),
    // )
    // .when(tous(estSecteurBienLocaliseHorsFrance), () =>
    //   fabriqueResultatEvaluationDefinitif(
    //     "InformationsSecteur",
    //     resultatNonRegule,
    //   ),
    // )
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
