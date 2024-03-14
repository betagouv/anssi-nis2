import { flow } from "fp-ts/lib/function";
import {
  estActiviteAutre,
  estActiviteListee,
  estActiviteListeeSansBesoinLocalisation,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import { transformeSecteurSimple_SecteurPeutEtreComposite } from "../../../src/Domain/Simulateur/SousSecteurActivite.operations";
import { Arbitraire as A } from "../../utilitaires/Arbitraires.operations";
import {
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur,
  fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe,
  fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe,
} from "../../utilitaires/EnsActivites.arbitraires.fabriques";
import { fabriqueArb_EnsInformationsSecteurPossible } from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import {
  arbSecteurActivite_InfrastructureNumerique,
  arbSecteurAvecSousSecteurListes,
  arbSecteurImportantAvecBesoinLocalisation,
} from "./SecteurActivite.arbitraires";

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
// export const arbInformationsSecteur_AvecActivitesEssentielles_Petite =
//   A.enchaine(
//     fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre<
//       "Petit",
//       SecteurAvecBesoinLocalisationRepresentant,
//       ActiviteInfranumLocalEtabLot1
//     >(estActiviteInfrastructureNumeriqueEligiblesPetitEntite)(
//       arbLocalisationRepresentant_ToujoursFrance,
//     ),
//   )(arbSecteurActivite_InfrastructureNumerique);

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique"
 *      et
 * activite dans :
 *  - "registresNomsDomainesPremierNiveau",
 *  - "fournisseurServicesDNS",
 */
// export const arbInformationsSecteur_AvecActivitesEssentielles_LocaliseesFrance_Petite =
//   A.enchaine(
//     fabriqueArb_EnsActivites_PourSecteurLocalisableEnUe_PourFiltre<
//       "Petit",
//       SecteurAvecBesoinLocalisationRepresentant,
//       ActiviteInfranumLocalEtabLot1
//     >(estActiviteInfrastructureNumeriqueAvecBesoinLocalisation)(
//       arbLocalisationRepresentant_ToujoursFrance,
//     ),
//   )(arbSecteurActivite_InfrastructureNumerique);

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
// export const arbInformationsSecteur_LocaliseesFrance_Grande_EI = A.enchaine(
//   fabriqueArb_EnsActivites_PourSecteurLocalisable_Liste_GE(
//     arbLocalisationRepresentant_ToujoursFrance,
//   ),
// )(arbSecteurImportantAvecBesoinLocalisation);

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
// export const arbInformationsSecteur_LocaliseesAutre_Grande_EI = A.enchaine(
//   fabriqueArb_EnsActivites_PourSecteurLocalisable_Liste_GE(
//     arbLocalisationRepresentant_ToujoursAutre,
//   ),
// )(arbSecteurImportantAvecBesoinLocalisation);
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
// export const arbInformationsSecteur_LocaliseesFrance_Grande_Infranum_EE =
//   A.enchaine(
//     fabriqueArb_EnsActivites_InfranumAvecBesoinLocalisation(
//       arbLocalisationRepresentant_ToujoursFrance,
//     ),
//   )(arbSecteurActivite_InfrastructureNumerique);
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
// export const arbInformationsSecteur_LocaliseesAutrePaysUE_Grande_Infranum_EE =
//   A.enchaine(
//     fabriqueArb_EnsActivites_InfranumAvecBesoinLocalisation(
//       arbLocalisationRepresentant_ToujoursAutre,
//     ),
//   )(arbSecteurActivite_InfrastructureNumerique);
export const arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE =
  A.enchaine(fabriqueArb_EnsActivites_PourSecteurEILocalisable_HorsUe)(
    arbSecteurImportantAvecBesoinLocalisation,
  );

// export const arbInformationsSecteur_Infranum_LocaliseesAutrePaysUE_PE =
//   fabriqueArb_EnsActivites_Infranum_Localisees(
//     arbSecteurActivite_InfrastructureNumerique,
//   )(arbLocalisationRepresentant_ToujoursAutre);

// export const arbInformationsSecteur_Infranum_LocaliseesHorsUE_PE =
//   fabriqueArb_EnsActivites_Infranum_Localisees(
//     arbSecteurActivite_InfrastructureNumerique,
//   )(arbLocalisationRepresentant_ToujoursHorsUE);

export const arbInformationsSecteur_Infranum_PE_ActivitesAvecBesoinLocalisation_LocaliseesHorsUE =
  A.enchaine(fabriqueArb_EnsActivites_PourSecteurInfraNumLocalisable_HorsUe)(
    arbSecteurActivite_InfrastructureNumerique,
  );
export const arbInformationsSecteurComposite = A.enchaine(
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteListee),
)(arbSecteurAvecSousSecteurListes);
export const arbInformationsSecteurCompositeActivitesAutres = A.enchaine(
  fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(estActiviteAutre),
)(arbSecteurAvecSousSecteurListes);

export const arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI =
  fabriqueArb_EnsInformationsSecteurPossible(
    A.enchaine(
      flow(
        transformeSecteurSimple_SecteurPeutEtreComposite,
        fabriqueArb_EnsActivites_AvecFiltre_PourSecteur(
          estActiviteListeeSansBesoinLocalisation,
        ),
      ),
    )(arbSecteurActivite_InfrastructureNumerique),
  );
