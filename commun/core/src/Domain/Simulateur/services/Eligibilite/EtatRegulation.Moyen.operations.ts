import { match } from "ts-pattern";
import { certains } from "../../../../../../utils/services/sets.operations";
import { et, non, ou } from "../../../../../../utils/services/commun.predicats";
import { ValeursActivitesInfrastructureNumeriqueSansBesoinLocalisation } from "../../Activite.valeurs";
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
import {
  auMoinsUneActiviteEstDans,
  auMoinsUneActiviteListee,
  certainsSontInfrastructureNumeriqueAvecActivite,
  contientValeurLocalisationFournitureServicesNumeriques,
  estEtablissementPrincipalFrance,
  estInformationSecteurSousSecteurAutre,
  estInformationsPourSecteur,
  estInformationsSecteurEligibleSansBesoinLocalisation,
} from "./ReponseInformationsSecteur.predicats";

export const evalueRegulationEtatReponseInformationsSecteurEnSuspensMoyen = (
  reponse: EtatEvaluationEnSuspens & ReponseEtatInformationsSecteur<"Moyen">,
): EtatRegulation =>
  match(reponse.InformationsSecteur.secteurs)
    .when(
      et(
        certainsSontInfrastructureNumeriqueAvecActivite(
          "fournisseurReseauxCommunicationElectroniquesPublics",
          "fournisseurServiceCommunicationElectroniquesPublics",
        ),
        certains(
          contientValeurLocalisationFournitureServicesNumeriques("france"),
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteEssentielle,
        ),
    )
    .when(
      et(
        certainsSontInfrastructureNumeriqueAvecActivite(
          "fournisseurReseauxCommunicationElectroniquesPublics",
          "fournisseurServiceCommunicationElectroniquesPublics",
        ),
        certains(
          contientValeurLocalisationFournitureServicesNumeriques("autre"),
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
        ou(
          certainsSontInfrastructureNumeriqueAvecActivite(
            "fournisseurServicesDNS",
            "registresNomsDomainesPremierNiveau",
            "fournisseurServicesInformatiqueNuage",
            "fournisseurServiceCentresDonnees",
            "fournisseurReseauxDiffusionContenu",
          ),
          certains(estInformationsPourSecteur("gestionServicesTic")),
          certains(estInformationsPourSecteur("fournisseursNumeriques")),
        ),
        certains(estEtablissementPrincipalFrance<"Moyen">),
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
          "fournisseurServicesDNS",
          "registresNomsDomainesPremierNiveau",
          "fournisseurServicesInformatiqueNuage",
          "fournisseurServiceCentresDonnees",
          "fournisseurReseauxDiffusionContenu",
        ),
        certains(estInformationsPourSecteur("gestionServicesTic")),
        certains(estInformationsPourSecteur("fournisseursNumeriques")),
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
        "fournisseurPointEchangeInternet",
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
    // .when(
    //   certains(
    //     et(
    //       estInformationSecteurImportantAvecBesoinLocalisation,
    //       // estSecteurBienLocaliseGrand,
    //     ),
    //   ),
    //   () =>
    //     fabriqueResultatEvaluationDefinitifCarSecteur(
    //       reponse,
    //       TE.EntiteImportante,
    //     ),
    // )
    // .when(
    //   certains(
    //     et(
    //       estInformationSecteurImportantAvecBesoinLocalisation,
    //       // estSecteurBienLocaliseUE,
    //     ),
    //   ),
    //   () =>
    //     fabriqueResultatEvaluationDefinitif(
    //       "InformationsSecteur",
    //       resultatIncertainAutrePaysUE,
    //     ),
    // )
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
