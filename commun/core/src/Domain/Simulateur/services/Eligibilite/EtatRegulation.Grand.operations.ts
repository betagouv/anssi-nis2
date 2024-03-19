import { match } from "ts-pattern";
import { certains } from "../../../../../../utils/services/sets.operations";
import { et, non, ou } from "../../../../../../utils/services/commun.predicats";
import {
  resultatIncertainAutrePaysUE,
  resultatNonRegule,
} from "../../Regulation.constantes";
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
  auMoinsUneActiviteListee,
  certainsSontInfrastructureNumeriqueAvecActivite,
  contientValeurLocalisationFournitureServicesNumeriques,
  estEtablissementPrincipalFrance,
  estInformationSecteurImportantAvecBesoinLocalisation,
  estInformationSecteurSousSecteurAutre,
  estInformationsPourSecteur,
  estInformationsSecteurEligibleSansBesoinLocalisation,
  estSecteurAnnexe1,
} from "./ReponseInformationsSecteur.predicats";
import { TypeEntite as TE } from "../../Regulation.definitions";

export const evalueRegulationEtatReponseInformationsSecteurEnSuspensGrand = (
  reponse: EtatEvaluationEnSuspens & ReponseEtatInformationsSecteur<"Grand">,
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
        certains(estEtablissementPrincipalFrance<"Grand">),
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
      ou(
        certainsSontInfrastructureNumeriqueAvecActivite(
          "prestataireServiceConfianceQualifie",
        ),
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
          TE.EntiteEssentielle,
        ),
    )
    .when(
      certains(
        et(
          estInformationSecteurImportantAvecBesoinLocalisation,
          // estSecteurBienLocaliseGrand,
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
          // estSecteurBienLocaliseUE,
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
          estSecteurAnnexe1,
          non(estInformationSecteurSousSecteurAutre),
          auMoinsUneActiviteListee,
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
          estInformationsSecteurEligibleSansBesoinLocalisation,
          non(estInformationSecteurSousSecteurAutre),
          auMoinsUneActiviteListee,
        ),
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EntiteImportante,
        ),
    )
    .otherwise(() =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatNonRegule,
      ),
    );
