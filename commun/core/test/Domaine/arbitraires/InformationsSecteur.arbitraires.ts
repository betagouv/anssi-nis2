import { et } from "../../../../utils/services/predicats.operations";
import { ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau } from "../../../src/Domain/Simulateur/Activite.definitions";
import { SecteurAvecBesoinLocalisationRepresentant } from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  estActiviteAutre,
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteInfrastructureNumeriqueSansBesoinLocalisation,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { Arbitraire as A } from "../../utilitaires/Arbitraires.operations";
import {
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur,
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple,
  fabriqueArb_EnsActivites_Infranum_Localisees,
  fabriqueArb_EnsActivites_InfranumAvecBesoinLocalisation,
  fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe,
  fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe,
  fabriqueArb_EnsActivites_PourSecteurLocalisable_Liste_GE,
  fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre,
} from "../../utilitaires/EnsActivites.arbitraires.fabriques";
import { fabriqueArb_EnsInformationsSecteurPossible } from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbSecteurActivite_InfrastructureNumerique,
  arbSecteurAvecSousSecteurListes,
  arbSecteurImportantAvecBesoinLocalisation,
} from "./SecteurActivite.arbitraires";
import {
  arbLocalisationRepresentant_ToujoursAutre,
  arbLocalisationRepresentant_ToujoursFrance,
  arbLocalisationRepresentant_ToujoursHorsUE,
} from "./ValeursChampsSimulateur.arbitraire";

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique"
 *      et
 * activite dans :
 *  - "fournisseurReseauxCommunicationElectroniquesPublics",
 *  - "fournisseurServiceCommunicationElectroniquesPublics",
 *  - "prestataireServiceConfiance",
 */
export const arbInformationsSecteur_AvecActivitesEssentielles_Petite =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre<
      "Petit",
      SecteurAvecBesoinLocalisationRepresentant,
      ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau
    >(estActiviteInfrastructureNumeriqueEligiblesPetitEntite)(
      arbLocalisationRepresentant_ToujoursFrance,
    ),
  );

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique"
 *      et
 * activite dans :
 *  - "registresNomsDomainesPremierNiveau",
 *  - "fournisseurServicesDNS",
 */
export const arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre<
      "Petit",
      SecteurAvecBesoinLocalisationRepresentant,
      ActiviteInfrastructureNumeriqueDNSRegistreDomainePermierNiveau
    >(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation)(
      arbLocalisationRepresentant_ToujoursFrance,
    ),
  );

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
export const arbInformationsSecteur_LocaliseesFrance_Grande_EI = A.enchaine(
  fabriqueArb_EnsActivites_PourSecteurLocalisable_Liste_GE(
    arbLocalisationRepresentant_ToujoursFrance,
  ),
)(arbSecteurImportantAvecBesoinLocalisation);

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
export const arbInformationsSecteur_LocaliseesAutre_Grande_EI = A.enchaine(
  fabriqueArb_EnsActivites_PourSecteurLocalisable_Liste_GE(
    arbLocalisationRepresentant_ToujoursAutre,
  ),
)(arbSecteurImportantAvecBesoinLocalisation);
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
export const arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE =
  A.enchaine(
    fabriqueArb_EnsActivites_InfranumAvecBesoinLocalisation(
      arbLocalisationRepresentant_ToujoursFrance,
    ),
  )(arbSecteurActivite_InfrastructureNumerique);
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
export const arbInformationsSecteur_LocaliseesAutrePaysUE_Grande_Infranum_EE =
  A.enchaine(
    fabriqueArb_EnsActivites_InfranumAvecBesoinLocalisation(
      arbLocalisationRepresentant_ToujoursAutre,
    ),
  )(arbSecteurActivite_InfrastructureNumerique);
export const arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe,
  );

export const arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE =
  fabriqueArb_EnsActivites_Infranum_Localisees(
    arbSecteurActivite_InfrastructureNumerique,
  )(arbLocalisationRepresentant_ToujoursAutre);

export const arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE =
  fabriqueArb_EnsActivites_Infranum_Localisees(
    arbSecteurActivite_InfrastructureNumerique,
  )(arbLocalisationRepresentant_ToujoursHorsUE);

export const arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE =
  arbSecteurActivite_InfrastructureNumerique.chain(
    fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe,
  );
export const arbInformationsSecteurComposite =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteListee),
  );
export const arbInformationsSecteurCompositeActivitesAutres =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteAutre),
  );
export const arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI =
  fabriqueArb_EnsInformationsSecteurPossible(
    arbSecteurActivite_InfrastructureNumerique.chain(
      fabriqueArb_EnsActivites_AvecFiltre_PourSecteurSimple(
        et(
          estActiviteListee,
          estActiviteInfrastructureNumeriqueSansBesoinLocalisation,
        ),
      ),
    ),
  );
