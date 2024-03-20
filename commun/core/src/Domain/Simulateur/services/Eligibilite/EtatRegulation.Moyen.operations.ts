import { match } from "ts-pattern";
import { certains } from "../../../../../../utils/services/sets.operations";
import { et, non, ou } from "../../../../../../utils/services/commun.predicats";
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
          "fournisseurServicesDNS",
          "registresNomsDomainesPremierNiveau",
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
      et(
        ou(
          certainsSontInfrastructureNumeriqueAvecActivite(
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
          TE.EntiteImportante,
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
    .when(
      certainsSontInfrastructureNumeriqueAvecActivite(
        "fournisseurServicesEnregristrementNomDomaine",
      ),
      () =>
        fabriqueResultatEvaluationDefinitifCarSecteur(
          reponse,
          TE.EnregistrementUniquement,
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
    .otherwise(() =>
      fabriqueResultatEvaluationDefinitif(
        "InformationsSecteur",
        resultatNonRegule,
      ),
    );
