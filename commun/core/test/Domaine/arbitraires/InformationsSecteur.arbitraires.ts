import { fc } from "@fast-check/vitest";
import { et } from "../../../../utils/services/predicats.operations";
import {
  ActivitesLocalisablesGrand,
  ActivitesLocalisablesPetit,
} from "../../../src/Domain/Simulateur/Activite.definitions";
import {
  listeTuplesSecteursSousSecteurs,
  ValeursSecteursSansSousSecteur,
} from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import {
  SecteurAvecBesoinLocalisationRepresentant,
  SecteurImportantsAvecBesoinLocalisation,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  ValeursSecteurAvecActivitesEssentielles,
  ValeursSecteursImportantsAvecBesoinLocalisation,
} from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import {
  estActiviteAutre,
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteInfrastructureNumeriqueSansBesoinLocalisation,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  estSecteurListe,
  estSecteurNeNecessitantPasLocalisationRepresentant,
  estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite,
} from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import { SousSecteurActivite } from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  fabriqueArbEnsembleActivitesPourSecteur,
  fabriqueArbEnsembleActivitesPourSecteurAvecFiltre,
  fabriqueArbitraireEnsembleActivitesPourSecteur,
  fabriqueArbitraireEnsembleActivitesPourSecteurComposite,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand,
  fabriqueArbitraireEnsembleActivitesPourSecteurInfraNumLocalisable_HorsUe,
  fabriqueArbitrairesEnsembleInformationsSecteurs,
  fabriqueArbitraireEnsembleActivitesPourSecteurEILocalisable_HorsUe,
} from "../../utilitaires/ResultatEvaluationRegulation.arbitraire.fabrique";
import { arbLocalisationRepresentant_JamaisFrance } from "./ResultatEvaluationRegulation.bases.arbitraire";

export const arbSecteurListesSansSousSecteurNiLocaGrand = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
    estSecteurNeNecessitantPasLocalisationRepresentant,
  ),
);

export const arbSecteurInfrascructureNumerique = fc.constantFrom(
  ...ValeursSecteurAvecActivitesEssentielles,
);
export const arbSecteurImportantAvecBesoinLocalisation =
  fc.constantFrom<SecteurImportantsAvecBesoinLocalisation>(
    ...ValeursSecteursImportantsAvecBesoinLocalisation,
  );
export const arbSecteurNonEligiblesPetiteEntite = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
    estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite,
  ),
);
export const arbSecteurAvecSousSecteurListes = fc.constantFrom<
  [SecteursAvecSousSecteurs, SousSecteurActivite]
>(
  ...listeTuplesSecteursSousSecteurs.filter(([, sousSecteur]) =>
    estSousSecteurListe(sousSecteur),
  ),
);
export const arbLocalisationRepresentant_ToujoursFrance = fc.constant(
  "france" as const,
);
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
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_ToujoursFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
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
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_ToujoursFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    ),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "gestionServicesTic" | "fournisseursNumeriques"
 */
export const arbInformationsSecteurLocaliseesFranceGrandeEI =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      arbLocalisationRepresentant_ToujoursFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(estActiviteListee)<
        SecteurAvecBesoinLocalisationRepresentant,
        ActivitesLocalisablesGrand
      >,
    ),
  );
/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique"
 *      et
 * activite dans :
 *  - "fournisseurPointEchangeInternet",
 *  - "fournisseurServicesInformatiqueNuage",
 *  - "fournisseurServiceCentresDonnees",
 *  - "fournisseurReseauxDiffusionContenu",
 *  - "prestataireServiceConfiance",
 */
export const arbInformationsSecteurLocaliseesFranceGrandeInfranumEI =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      arbLocalisationRepresentant_ToujoursFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        (activite) =>
          estActiviteInfrastructureNumeriqueSansBesoinLocalisation(activite) &&
          estActiviteListee(activite),
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesGrand>,
    ),
  );

/**
 * InformationSecteurLocalisableGrandeEntite
 *    telles que
 * secteur dans "infrastructureNumerique" et activite registre ou fournisseur DNS
 */
export const arbInformationsSecteurLocaliseesFranceGrandeInfranumEE =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand(
      arbLocalisationRepresentant_ToujoursFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesGrand>,
    ),
  );

export const arbInformationsSecteurLocaliseesHorsFrancePetite =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_JamaisFrance,
      fabriqueArbEnsembleActivitesPourSecteurAvecFiltre(
        estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
      )<SecteurAvecBesoinLocalisationRepresentant, ActivitesLocalisablesPetit>,
    ),
  );
export const arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsFrance =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_JamaisFrance,
      fabriqueArbEnsembleActivitesPourSecteur,
    ),
  );
export const arbInformationsSecteur_AvecBesoinLoca_GrandEI_LocaliseesHorsUE =
  arbSecteurImportantAvecBesoinLocalisation.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurEILocalisable_HorsUe,
  );
export const arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurInfraNumLocalisable_HorsUe,
  );
export const arbInformationsSecteurComposite =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite(estActiviteListee),
  );
export const arbInformationsSecteurCompositeActivitesAutres =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite(estActiviteAutre),
  );
export const arbInformationsSecteur_Infranum_ActivitesSansBesoinLoca_GrandeEI =
  fabriqueArbitrairesEnsembleInformationsSecteurs(
    arbSecteurInfrascructureNumerique.chain(
      fabriqueArbitraireEnsembleActivitesPourSecteur(
        et(
          estActiviteListee,
          estActiviteInfrastructureNumeriqueSansBesoinLocalisation,
        ),
      ),
    ),
  );
