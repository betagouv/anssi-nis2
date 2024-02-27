import { fc } from "@fast-check/vitest";
import {
  SecteurAvecBesoinLocalisationRepresentant,
  SecteurImportantsAvecBesoinLocalisation,
  SecteursAvecSousSecteurs,
} from "../../../src/Domain/Simulateur/SecteurActivite.definitions";
import {
  ValeursSecteurAvecActivitesEssentielles,
  ValeursSecteursImportantsAvecBesoinLocalisation,
} from "../../../src/Domain/Simulateur/SecteurActivite.valeurs";
import { SousSecteurActivite } from "../../../src/Domain/Simulateur/SousSecteurActivite.definitions";
import {
  ActivitesLocalisablesGrand,
  ActivitesLocalisablesPetit,
} from "../../../src/Domain/Simulateur/Activite.definitions";
import {
  estSecteurListe,
  estSecteurNeNecessitantPasLocalisationRepresentant,
  estSecteurNeNecessitantPasLocalisationRepresentantPetiteEntite,
} from "../../../src/Domain/Simulateur/services/SecteurActivite/SecteurActivite.predicats";
import { estSousSecteurListe } from "../../../src/Domain/Simulateur/services/SousSecteurActivite/SousSecteurActivite.predicats";
import {
  estActiviteAutre,
  estActiviteInfrastructureNumeriqueAvecBesoinLocalisation,
  estActiviteInfrastructureNumeriqueEligiblesPetitEntite,
  estActiviteInfrastructureNumeriqueSansBesoinLocalisation,
  estActiviteListee,
} from "../../../src/Domain/Simulateur/services/Activite/Activite.predicats";
import {
  listeTuplesSecteursSousSecteurs,
  ValeursSecteursSansSousSecteur,
} from "../../../src/Domain/Simulateur/SecteurActivite.constantes";
import {
  fabriqueArbEnsembleActivitesPourSecteur,
  fabriqueArbEnsembleActivitesPourSecteurAvecFiltre,
  fabriqueArbitraireEnsembleActivitesPourSecteurComposite,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUeGrand,
  fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableHorsUe,
} from "./ResultatEvaluationRegulation.arbitraire.fabrique";
import { arbLocalisationRepresentant_JamaisFrance } from "./ResultatEvaluationRegulation.bases.arbitraire";

export const arbSecteurListesSansSousSecteurNiLocaGrand = fc.constantFrom(
  ...ValeursSecteursSansSousSecteur.filter(estSecteurListe).filter(
    estSecteurNeNecessitantPasLocalisationRepresentant,
  ),
);

export const arbSecteurInfrascructureNumerique = fc.constantFrom(
  ...ValeursSecteurAvecActivitesEssentielles,
);
export const arbSecteurImportantsLocalisablesGrandeEntite =
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
  arbSecteurImportantsLocalisablesGrandeEntite.chain(
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
export const arbInformationsSecteurLocaliseesHorsFranceGrand =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableEnUe(
      arbLocalisationRepresentant_JamaisFrance,
      fabriqueArbEnsembleActivitesPourSecteur<
        SecteurAvecBesoinLocalisationRepresentant,
        ActivitesLocalisablesPetit
      >,
    ),
  );
export const arbInformationsSecteur_AvecActiviteEssentiellesPE_AvecBesoinLocalisation_LocaliseesHorsUE =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableHorsUe,
  );
export const arbInformationsSecteurLocaliseesHorsUEGrand =
  arbSecteurInfrascructureNumerique.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurLocalisableHorsUe,
  );
export const arbInformationsSecteurComposite =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite(estActiviteListee),
  );
export const arbInformationsSecteurCompositeActivitesAutres =
  arbSecteurAvecSousSecteurListes.chain(
    fabriqueArbitraireEnsembleActivitesPourSecteurComposite(estActiviteAutre),
  );
