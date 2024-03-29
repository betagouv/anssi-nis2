import { match } from "ts-pattern";
import { certains } from "../../../../../../utils/services/sets.operations";
import { et, non, ou } from "../../../../../../utils/services/commun.predicats";
import { resultatNonRegule } from "../../Regulation.constantes";
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
  estInformationsSecteurAvecActivitesListeesPourSecteur,
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
        ou(
          certainsSontInfrastructureNumeriqueAvecActivite(
            "fournisseurServicesDNS",
            "registresNomsDomainesPremierNiveau",
            "fournisseurServicesInformatiqueNuage",
            "fournisseurServiceCentresDonnees",
            "fournisseurReseauxDiffusionContenu",
          ),
          certains(
            estInformationsSecteurAvecActivitesListeesPourSecteur(
              "gestionServicesTic",
            ),
          ),
          certains(
            estInformationsSecteurAvecActivitesListeesPourSecteur(
              "fournisseursNumeriques",
            ),
          ),
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
      certainsSontInfrastructureNumeriqueAvecActivite(
        "prestataireServiceConfianceQualifie",
        "prestataireServiceConfianceNonQualifie",
        "fournisseurPointEchangeInternet",
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
        certains(
          estInformationsSecteurAvecActivitesListeesPourSecteur(
            "gestionServicesTic",
          ),
        ),
        certains(
          estInformationsSecteurAvecActivitesListeesPourSecteur(
            "fournisseursNumeriques",
          ),
        ),
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
